export function rabinKarp(template, textToSearchIn, templateHash, currentHash) {
    let foundIndexes = []
    let comparisonCount = 0
    let collisionCount = 0
    let templateLen = template.length;
    let currentSub = textToSearchIn.slice(0, templateLen)
    for (let i = 0; i + templateLen - 1 < textToSearchIn.length; i++) { // i+templateLen -1 is new
        if (i > 0) {
            currentSub = textToSearchIn.slice(i, i + templateLen)
            currentHash = countHash(currentSub)
        }
        if (templateHash !== currentHash) continue;
        let j
        for (j = 0; j < templateLen; j++) {
            comparisonCount++
            if (textToSearchIn[i + j] !== template[j]) {
                collisionCount++
                break
            }
        }
        if (j === templateLen) foundIndexes.push(i)
    }

    return [foundIndexes, comparisonCount, collisionCount];
}

export function rabinKarpHash(template, textToSearchIn) {
    const templateHash = countHash(template);
    const templateLen = template.length;
    let currentHash = countHash(textToSearchIn.subarray(0, templateLen))

    return [templateHash, currentHash];
}

function countHash(string) {
    let prime = 999007
    let hash = 0
    let length = string.length;
    for (let i = 0; i < length; i++) {
        hash <<= 1
        hash += string[i]
        hash %= prime
    }

    return hash
}