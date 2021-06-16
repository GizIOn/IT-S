"use strict"

let dictOfExceptions = {
    ["-0"]: "10000000000000000000000000000000",
    ["0"]: "00000000000000000000000000000000",
    [-Infinity]: "11111111100000000000000000000000",
    [Infinity]: "01111111100000000000000000000000",
    [NaN]: "01111111100000000000000000000001",
    "10000000000000000000000000000000": ["-0"],
    "00000000000000000000000000000000": ["0"],
    "11111111100000000000000000000000": [-Infinity],
    "01111111100000000000000000000000": [Infinity],
    "01111111100000000000000000000001": [NaN]
}

console.log(main())

function main() {
    let decToFloatStr = "--d2f";
    let floatToDecStr = "--f2d";
    let [convertType, number] = process.argv.slice(2);

    switch (convertType) {
        case decToFloatStr:
            return decToFloat(number);
        case floatToDecStr:
            return floatToDec(number);
        default:
            showHelp()
            break;
    }
}

function decToFloat(number = "") {
    let absOfNumber = Math.abs(Number(number)),
        numberInDec = Number(number);
    if (number in dictOfExceptions) return toHex(dictOfExceptions[number]);
    if (numberInDec in dictOfExceptions) return toHex(dictOfExceptions[numberInDec]);

    const sign = number > 0 ? "0" : "1";
    let numberInBin = absOfNumber.toString(2),
        extent = Math.floor(Math.log10(absOfNumber) / Math.log10(2)),
        mantissa = getMantissa(numberInBin),
        bigNumber = catchExceptional(sign, extent, mantissa);

    let floatNumber = getFloatNumber(sign, extent, mantissa);
    return bigNumber === undefined
        ? toHex(convertToString(floatNumber))
        : toHex(bigNumber);


    function catchExceptional(sign, extent, mantissa) {
        if (extent > 127 && sign === "1") return dictOfExceptions[-Infinity];
        if (extent > 127 && sign === "0") return dictOfExceptions[Infinity];
        if (extent > 127 && myIsNaN(mantissa)) return dictOfExceptions[NaN];


        function myIsNaN(mantissa) {
            for (let i in mantissa) {
                if (i === "1") return true;
            }
            return false;
        }
    }

    function toHex(number = "") {
        let output = "0x"
        for (let i = 0; i < number.length; i += 4) {
            let temp = ""
            for (let j = i; j < 4 + i; j++) {
                temp += number[j]
            }
            output += parseInt(temp, 2).toString(16)
        }

        return output;
    }

    function convertToString(floatNumber) {
        let output = ""
        for (let item of floatNumber) {
            output += item
        }

        return output;
    }

    function getFloatNumber(sign, extent, mantissa) {
        const left = true, right = false;
        let exponentInBin = (127 + (extent < -126 ? -127 : extent)).toString(2);
        exponentInBin = getOfNeededLen(exponentInBin, 8, left)
        mantissa = getOfNeededLen(mantissa, 23, right)

        let floatNumber = roundFloat((sign + exponentInBin + mantissa).split(""));

        return convertToString(floatNumber);

        function roundFloat(floatNumber = "") {
            let output = floatNumber;
            if (output.length > 31 && output[32] === "1") {
                for (let i = 31; i > 0; i--) {
                    if (output[i] === "1") {
                        output[i] = "0"
                    } else {
                        output[i] = "1"
                        break;
                    }
                }
            }
            return output.toString().split(",").join("").substring(0, 32);
        }
    }

    function getMantissa(whereToLook) {
        let mantissa = "",
            parts = whereToLook.split("."),
            wholePart = parts[0],
            fractionPart = parts[1];
        if (wholePart.length === 1 && wholePart[0] === "0" && whereToLook.length > 1) {
            let indexOfOne = fractionPart.indexOf("1") + 1;
            mantissa = indexOfOne > 126
                ? whereToLook.substring(128, whereToLook.length)
                : mantissa = fractionPart.substring(indexOfOne);
        } else {
            for (let i = 1; i < whereToLook.length; i++) {
                if (whereToLook[i] !== ".") {
                    mantissa += whereToLook[i];
                }
            }
        }

        return mantissa;
    }
}

function getOfNeededLen(toEnlarge = "", timesToEnlarge = 0, leftSideQuestionMark = false) {
    let output = toEnlarge;
    while (output.length < timesToEnlarge) {
        if (leftSideQuestionMark) {
            output = "0" + output;
        } else if (!leftSideQuestionMark) output += "0"
    }

    return output;
}

function floatToDec(machineNum) {
    let float = toBin(machineNum),
        sign = float[0] !== "0" ? -1 : 1,
        extent = float.substring(1, 9),
        mantissa = float.substring(9, 32);
    if (extent.valueOf() === "11111111") {
        return Number(mantissa) === 0 ? sign * Infinity : NaN;
    }

    let binToDec = binToDecConvert(mantissa);
    let mantToOut = extent.valueOf() === "00000000" ? 0 + binToDec : 1 + binToDec;
    let ext = Number(extent) === 0 ? -126 : parseInt(extent, 2) - 127;
    return sign * mantToOut * Math.pow(2, ext);

    function binToDecConvert(mantissa) {
        let output = 0;
        for (let i = 1; i < mantissa.length + 1; i++) {
            output += Math.pow(2, -i) * mantissa[i - 1];
        }

        return Math.round(output * 1e25) / 1e25
    }

    function toBin(machineNum) {
        let toConvert = machineNum.substring(2);
        let output = "";
        for (let i = 0; i < toConvert.length; i++) {
            let t = parseInt(toConvert[i], 16).toString(2)
            t = getOfNeededLen(t, 4, true)
            output += t;
        }
        return output;
    }
}

function showHelp() {
    console.log("Hi!\n" +
        "This is a program for you to convert your decimal number into a float-number\n" +
        "To do this you have to type:\n" +
        "node float.js [--d2f/--f2d] [number]\n" +
        "number follows the rules:\n" +
        "if you d2f it should be decimal\n" +
        "else it should be in hex")
}