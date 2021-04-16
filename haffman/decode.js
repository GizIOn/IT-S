import fs from "fs"

export function decode(inputFile, outputFile, symbolsCodesFile) {
    let inputInHex = fs.readFileSync(inputFile, "utf-8"), inputInBinary = "", output = [], symbolsCodes = {}
    inputInBinary = transformInputIntoBinary(inputInHex, inputInBinary);

    symbolsCodes = parseSymbolsCodes(symbolsCodesFile)
    for (let i = 0,symbol=""; i < inputInBinary.length; i++) {
        symbol+=inputInBinary[i]
        if (symbolsCodes[symbol]!==undefined && symbolsCodes[symbol]!=="27") {
            output.push(parseInt(symbolsCodes[symbol]))
            symbol=""
        }
        if (symbolsCodes[symbol]==="27") break
    }
    fs.open(outputFile, "w", x => fs.writeFileSync(outputFile, Buffer.from(output)))
}

function transformInputIntoBinary(inputInHex) {
    let inputInBinary = ""
    for (let i = 0; i < inputInHex.length; i++) {
        let inputInBin = parseInt(inputInHex[i], 16).toString(2);
        for (let i = inputInBin.length; i < 4; i++)
            inputInBin = "0" + inputInBin
        inputInBinary += inputInBin
    }
    return inputInBinary;
}

function parseSymbolsCodes(symbolsCodesFile) {
    let symbolsCodes = {}, input = fs.readFileSync(symbolsCodesFile, "utf-8")
        .split("\n")

    for (let i = 0; i < input.length - 1; i++) {
        let currentPair = input[i].split(" : ")
        symbolsCodes[currentPair[1]] = getSymbolWithoutQuotes(currentPair[0])
    }

    return symbolsCodes

    function getSymbolWithoutQuotes(currentSymbol) {
        return currentSymbol.replace("\"", "").replace("\"", "");
    }
}