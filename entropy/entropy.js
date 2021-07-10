"use strict"

import fs from "fs"

const input = process.argv.slice(2),
    mes = fs
        .readFileSync(input.toString())
        .toString()
        .split(" ")
        .filter(str => str !== "")

let dic = {}
for (let i = 0; i < mes.length; i++) {
    for (let j = 0; j < mes[i].length; j++) {
        if (typeof dic[mes[i][j]] !== "undefined") {
            dic[mes[i][j]]++
        } else {
            dic[mes[i][j]] = 1
        }
    }
}
const alphabetPower = Object.keys(dic).length


let e2 = 0
let length = mes[0].length;
for (let i = 0; i < alphabetPower; i++) {
    let pi = Object.values(dic)[i] / length;
    e2 -= pi * Math.log2(pi)
}

let eAlphabet = 0
for (let i = 0; i < alphabetPower; i++) {
    let pi = Object.values(dic)[i] / length;
    eAlphabet -= pi * (Math.log(pi) / Math.log(alphabetPower))
}

if (alphabetPower === 0 || alphabetPower === 1) {
    e2 = 0, eAlphabet = 0
}

console.log("Entropy with degree base 2: " + e2 + ", with alphabetic power: " + eAlphabet)