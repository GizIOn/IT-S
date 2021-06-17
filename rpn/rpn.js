let priorityDict = {
    "(": 0,
    ")": 1,
    "+": 2,
    "-": 2,
    "*": 3,
    "/": 3,
    "^": 4
}

main();

function main() {
    let input = process.argv.slice(2)
    if (input.length !== 1) {
        help();
    }
    let lastElem = input[0][input[0].length - 1]
    if (lastElem !== "(" && lastElem !== ")" && lastElem in priorityDict) {
        console.log(postfixToInfix(input))
    } else {
        console.log(infixToPostFix(input))
    }
}

export function postfixToInfix(input) {
    input = input.toString().split("")
    let stack = []
    for (let i = 0; i < input.length; i++) {
        let currentElement = input[i];
        if (!(currentElement in priorityDict)) {
            stack.push({name: currentElement, priority: 0})
            continue
        }
        let rightOperand = stack.pop()
        let leftOperand = stack.pop()
        if (rightOperand===undefined || leftOperand===undefined) throw "Missing operand"
        rightOperand = getBracesIfNeeded(rightOperand, currentElement);
        leftOperand = getBracesIfNeeded(leftOperand, currentElement)

        stack.push({
            name: leftOperand.name + currentElement + rightOperand.name,
            priority: priorityDict[currentElement]
        })
    }
    return stack.pop().name;

    function getBracesIfNeeded(operand, currentElement) {
        let output = operand;
        let bracesForOperand = checkIfBracesNeeded(output, currentElement)
        return bracesForOperand
            ? {name: "(" + output.name + ")", priority: currentElement.priority}
            : {name: output.name, priority: currentElement.priority};

        function checkIfBracesNeeded(operand, currentElement) {
            return operand.priority !== 0 && operand.priority < priorityDict[currentElement];
        }
    }

}

export function infixToPostFix(input) {
    input=input.toString().split("")
    let stack = []
    let output = ""
    let i = 0
    let currentElem = input[i];
    while (currentElem !== undefined) {
        currentElem = input[i]
        // if operation
        if (priorityDict[currentElem] !== undefined) {
            if (currentElem === ")") {
                let currentOperation = stack.pop();
                // pop until not met "("
                while (currentOperation !== "(") {
                    output += currentOperation;
                    currentOperation = stack.pop() // might be bug
                }
                i++
                continue
            }
            if (currentElem === "(") {
                stack.push("(")
                i++
                continue
            }
            if (stack.length === 0) {
                if (currentElem === ")") throw "Wrong braces sequence"
                stack.push(currentElem)
                i++
                continue
            } else if (stack.length !== 0) {
                // push if bigger priority
                if (priorityDict[currentElem] > priorityDict[stack[stack.length - 1]]) {
                    stack.push(currentElem)
                    i++
                    continue
                } else {
                    // pop to output until bigger priority
                    while (stack.length > 0 && priorityDict[stack[stack.length - 1]] >= priorityDict[currentElem]) {
                        let currentOperation = stack.pop();
                        if (currentOperation)
                        {
                            // TODO: missing operand, operation
                        }
                        output += currentOperation
                    }
                    stack.push(currentElem)
                    i++
                    continue
                }
            }
            i++
        } else if (currentElem !== undefined) {
            output += currentElem
            i++
        }
    }
    while (stack.length !== 0) {
        let pop = stack.pop();
        if (pop==="(" || pop===")") throw "Wrong braces sequence"
        output += pop !== "(" && pop !== ")" ? pop : ""
    }
    return output;
}


function help() {
    console.log("This is automatic converter from infix notation to\n" +
        "postfix notation and back.\n" +
        "To get things going just type:\n" +
        "node rpn.js [expression]\n" +
        "And to raise number to a power cover your expression in quotes \n" +
        "Good luck!")
    process.kill()
}