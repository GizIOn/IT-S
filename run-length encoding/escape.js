"use strict"

export function encodeEsc(input, esc) {
    let output = [], count = 1
    if (input.length < 1) return input
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++
            if (count === 259 && input[i] !== esc) {
                output.push(esc, count - 4, input[i])
                count = 0
            } else if (input[i] === esc && count === 256) {
                output.push(esc, count - 1, input[i])
                count = 0
            }
            continue
        }
        if (count >= 4 && input[i] !== esc) {
            output.push(esc, count - 4, input[i])
        } else if (input[i] === esc && count>0) {
            output.push(esc, count-1, input[i])
        } else {
            for (let j = 0; j < count; j++)
                output.push(input[i])
        }
        count = 1

    }

    return Buffer.from(output)
}

export function decodeEsc(input, esc) {
    let output = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] === esc && input[i + 2] === esc) {
            const toRepeat = input[i + 1] + 1
            for (let j = 0; j < toRepeat; j++) output.push(input[i + 2])
            i += 2
        } else if (input[i] === esc && input[i + 2] !== esc) {
            const toRepeat = input[i + 1] + 4
            for (let j = 0; j < toRepeat; j++) output.push(input[i + 2])
            i += 2
        } else {
            output.push(input[i])
        }
    }

    return Buffer.from(output)
}