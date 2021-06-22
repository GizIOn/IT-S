export function searchInAutomata(template, textToSearchIn, templateHash, currentHash, automata) {
    let [abc, states, subLen] = automata
    let foundIndexes = []
    let comparisonCount = 0
    let currentState = 0
    for (let i = 0; i < textToSearchIn.length; i++) {
        let currentElement = textToSearchIn[i];
        if (abc.has(currentElement)) {
            currentState = states[currentState][states[-1].indexOf(currentElement)]
        } else {
            currentState = 0
        }
        if (currentState === states.length - 1) {
            foundIndexes.push(i + 1 - subLen)
        }
    }

    return [foundIndexes, comparisonCount, undefined];
}


export function getAutomaton(substring) {
    let abc = new Set(substring)
    let states = []
    let subLen = substring.length
    states[-1] = new Array(abc.size)

    let state = 0
    getAbcInTable(abc, states);
    getTableNoValues(subLen, states);
    getTableOfValues(subLen, substring, state, abc, states);
    return [abc, states, subLen];
}

function getAbcInTable(abc, states) {
    let state = 0
    for (let abcElement of abc) {
        states[-1][state] = abcElement
        state++
    }
}

function getTableNoValues(subLen, states) {
    for (let i = 0; i < subLen + 1; i++) {
        states.push([])
    }
}

function getTableOfValues(subLen, substring, state, abc, states) {
    for (let i = 0; i < subLen; i++) {
        let currentPrefix = substring.slice(0, i)
        state = 0
        for (let abcElement of abc) {
            states[i][state] = getValueInTable(currentPrefix + abcElement, substring)
            state++
        }
        if (i + i >= subLen) {
            state = 0
            for (let abcEl of abc) {
                states[subLen][state] = getValueInTable(substring + abcEl, substring)
                state++
            }
        }
        console.log(currentPrefix)
    }

    function getValueInTable(str, substr) {
        let stateNumber = 0
        for (let i = 1; i < Math.min(str.length, substr.length) + 1; i++) {
            let subStr = str.slice(str.length - i)
            let subSubstr = substr.slice(0, i)
            if (subStr === subSubstr) stateNumber = i
        }

        return stateNumber
    }
}