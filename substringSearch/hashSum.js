export function hashSumReady(template, textToSearchIn, templateHash, currentHash) {
    let foundIndexes = []
    let comparisonCount = 0
    let collisionCount = 0
    let templateLen=template.length

    for (let i = 0; i < textToSearchIn.length; i++) {
        if (templateHash !== currentHash) {
            currentHash =currentHash- textToSearchIn[i]+textToSearchIn[templateLen + i]
            continue;
        }
        let equal = equals(template, textToSearchIn, i);
        comparisonCount += equal.comparisonCount;
        if (!equal.isEqual) {
            collisionCount++
            currentHash =currentHash- textToSearchIn[i]+textToSearchIn[templateLen + i]
            continue;
        }
        foundIndexes.push(i)
        currentHash =currentHash- textToSearchIn[i]+textToSearchIn[templateLen + i]
    }

    return [foundIndexes, comparisonCount, collisionCount];
}

function equals(substr, string, i) {
    let output = {
        isEqual: false,
        comparisonCount: 0
    }
    for (let j = i, k=0; j < substr.length + i; j++, k++) {
        if (string[j] !== substr[k]) return output;
        output.comparisonCount++
    }
    output.isEqual = true;
    return output;
}

export function hashSum(template, textToSearchIn) {
    const templateHash = countHash(template);
    const templateLen = template.length;
    let currentHash = countHash(textToSearchIn.subarray(0, templateLen))

    return [templateHash, currentHash];

    function countHash(whatToCount) {
        let output = 0
        for (let i = 0; i < whatToCount.length; i++) {
            output += whatToCount[i]
        }

        return output;
    }
}