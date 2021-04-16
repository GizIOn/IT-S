import fs from "fs"
import {encode} from "./encode.js";
import {decode} from "./decode.js";

let [func, inputFile, outputFile] = process.argv.splice(2), symbolsCodesFile = "symbols codes.txt"

switch (func) {
    case "-e":
        encode(inputFile, outputFile, symbolsCodesFile);
        break
    case "-d":
        decode(inputFile, outputFile, symbolsCodesFile)
        break
    case "-h":
        showDocumentation()
        process.kill(0, undefined);
        break
    default:
        console.log("You mistyped what to do.")
}

function showDocumentation() {
    console.log(`Welcome To Haffman Code Machine!
    
    
With this perfect device you can encode and decode your text using Haffman code.

To help you get started:
* open your console
* type in:
node haffman.js -e/-d inputFilePath outputFilePath
-e stands for encoding
-d stands for decoding`)
}