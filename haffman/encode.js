import {Counter} from "./counter.js";
import {TreeClass} from "./tree.js";
import fs from "fs";

export function encode(inputFile, outputFile, symbolsCodesFile) {
    let inputWithEsc = addEscapeToInput(inputFile), frequencyDict = new Counter(inputWithEsc),
        tree = new TreeClass(frequencyDict), encoded = getEverySymbolEncoded(inputWithEsc, tree)

    encoded += "0".repeat(8 - encoded.length % 8)
    writeCodesInAFile(frequencyDict, symbolsCodesFile, tree)
    fs.open(outputFile, "w", x => fs.writeFileSync(outputFile, /*encoded*/transformIntoHexFormat(encoded)))
    console.log(frequencyDict)
}

function addEscapeToInput(inputFile) {
    let input = fs.readFileSync(inputFile)
    let toEncode = []
    for (let i = 0; i <= input.length; i++) {
        if (i === input.length) {
            toEncode[i] = 27
            break
        }
        toEncode[i] = input[i]
    }

    return Buffer.from(toEncode);
}

function getEverySymbolEncoded(inputInfo, tree) {
    let encoded = ""
    for (let i = 0; i < inputInfo.length; i++) {
        encoded += tree.findLeafCode(inputInfo[i])
    }
    return encoded;
}

function transformIntoHexFormat(toEncode) {
    let inHex = ""
    for (let i = 0; i < toEncode.length; i += 4) {
        let temp = ""
        for (let j = i; j < 4 + i; j++) {
            temp += toEncode[j]
        }
        inHex += parseInt(temp, 2).toString(16)
    }
    return inHex
}

function writeCodesInAFile(inputInfo, symbolsCodesFile, tree) {
    fs.open(symbolsCodesFile, "w", err => {
    })
    for (let i in inputInfo) {
        fs.appendFileSync(symbolsCodesFile, `"${i}" : ${tree.findLeafCode(i)}\n`)
    }
}


