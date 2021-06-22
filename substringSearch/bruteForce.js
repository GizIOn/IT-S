export function bruteForce(template, textToSearchIn) {
    const subLen = template.length;
    const len = textToSearchIn.length;
    let comparisonCount=0, foundIndexes=[]

    for (let i = 0; i <= len - subLen; ++i) {
        let matched = true;
        for (let j = 0; j < subLen; ++j) {
            if (textToSearchIn[i + j] !== template[j]) {
                comparisonCount++;
                matched = false; //breakpoint
            }
        }
        if (matched) {
            foundIndexes.push(i)
        }
    }
    return [foundIndexes, comparisonCount, undefined];
}