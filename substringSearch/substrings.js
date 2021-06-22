import fs from "fs"
import {bruteForce} from "./bruteForce.js"
import {hashSum, hashSumReady} from "./hashSum.js"
import {rabinKarpHash} from "./rabinKarp.js"
import {rabinKarp} from "./rabinKarp.js"
import {searchInAutomata, getAutomaton} from "./automaton.js"

const [searcher, textFile, templateFile] = process.argv.slice(2);
const textToSearchIn = fs.readFileSync(textFile) ?? null;
const template = fs.readFileSync(templateFile) ?? null;
const timesToWarmUp = 1;

const searcherParsed = searcher.toLowerCase().slice(2);
switch (searcherParsed) {
    case "bf":
        measureTimeAndDisplayResult(timesToWarmUp, template, textToSearchIn, bruteForce)
        break;
    case "hs":
        const [templateHashHS, currentHashHS] = hashSum(template, textToSearchIn);
        measureTimeAndDisplayResult(timesToWarmUp, template, textToSearchIn, hashSumReady, templateHashHS, currentHashHS)
        break;
    case "hrk":
        const [templateHashHRK, currentHashHRK] = rabinKarpHash(template, textToSearchIn);
        measureTimeAndDisplayResult(timesToWarmUp, template, textToSearchIn, rabinKarp, templateHashHRK, currentHashHRK)
        break;
    case "atmt":
        const templateInUTF = fs.readFileSync(templateFile, "utf-8");
        const textToSearchInUTF = fs.readFileSync(textFile, "utf-8");
        const [abc, states, subLen] = getAutomaton(templateInUTF);
        measureTimeAndDisplayResult(timesToWarmUp, templateInUTF, textToSearchInUTF, searchInAutomata, undefined, undefined, [abc, states, subLen])
        break;
    default:
        showHelp();
}


function measureTimeAndDisplayResult(timesToWarmUp, template, textToSearchIn, func, templateHash, currentHash, automata) {
    benchmark(timesToWarmUp, template, textToSearchIn, func, templateHash, currentHash, automata)
    console.time("Time")
    let [foundIndexes, comparisonCount, collisionCount] = func(template, textToSearchIn, templateHash, currentHash, automata);
    console.timeEnd("Time")
    consoleLogResult(foundIndexes, comparisonCount, collisionCount) //end/timesToWarmUp)
}

function benchmark(times, template, textToSearchIn, funcToWarmUp, templateHash, currentHash, automata) {
    for (let i = 0; i < times; i++) {
        if (templateHash === undefined && currentHash === undefined && automata === undefined) {
            let [foundIndexes, comparisonCount, collisionCount] = funcToWarmUp(template, textToSearchIn)
            foundIndexes = 0
            comparisonCount = 0
            collisionCount = 0
        } else if (templateHash !== undefined && currentHash !== undefined && automata === undefined) {
            let [foundIndexes, comparisonCount, collisionCount] = funcToWarmUp(template, textToSearchIn, templateHash, currentHash)
            foundIndexes = 0
            comparisonCount = 0
            collisionCount = 0
        } else {
            let [foundIndexes, comparisonCount, collisionCount] = funcToWarmUp(template, textToSearchIn, templateHash, currentHash, automata)
            foundIndexes = 0
            comparisonCount = 0
            collisionCount = 0
        }
    }
}

function consoleLogResult(indexesFound, comparisonCount, collisionCount, time) {
    console.log(`Times compared: ${comparisonCount} 
Array of indexes found: ${indexesFound.slice(0, 10)}
Indexes count: ${indexesFound.length}
Collision count: ${collisionCount}`)
}

function showHelp() {
    console.log("Lol");
}