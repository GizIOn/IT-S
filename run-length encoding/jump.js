"use strict"

export function encodeJmp(input) {
    let output = []
    for (let i = 0; i < input.length; i++) {
        let first = input[i], second = input[i + 1], third = input[i + 2], arr = [], count = 0
        if (first === second && second === third) {
            for (let j = i; j < input.length && input[j] === input[j + 1]; j++) {
                arr.push(input[j])
                count++
                i++
                if (count === 129) break
            }
            output.push(count + 125 + 1, input[i])
        } else {
            for (let j = i; j < input.length && !(input[j] === input[j + 1] && input[j + 1] === input[j + 2]); j++) {
                count++;
                arr.push(input[j]);
                i++;
                if (count === 127) {
                    break
                }
            }
            output.push(count - 1);
            pushArrElemToOutput(arr)
            i--;
        }
    }
    return Buffer.from(output)

    function pushArrElemToOutput(arr) {
        for (let j = 0; j < arr.length; j++) {
            output.push(arr[j])
        }
    }
}

export function decodeJmp(input) {
    if (input.length < 2) return input
    let output = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] + 1 < 128) {
            let j = 0
            let notRep = input[i] + 1;
            for (; j < notRep; j++) {
                output.push(input[i + j + 1])
            }
            i += j;
        } else {
            let repeated = input[i] - 125;
            for (let j = 0; j < repeated; j++) {
                output.push(input[i + 1])
            }
            i++;
        }
    }

    return Buffer.from(output)
}
