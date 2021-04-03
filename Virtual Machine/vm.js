const fs = require('fs');

function main() {
    const func = process.argv[2], isGreater = 150, isEqual = 151, functions = {
        250: "ext",
        251: "prt",
        252: "read",
        253: "put",
        254: "pin",
        255: "cmp",
        256: "multiply",
        257: "jmpLess",
        258: "jmpEqual",
        259: "jmpGreater",
        260: "decrease",
        261: "div%",
        262: "module",
        263: "jmp",
        299: "unexpectedCommand",
    };

    if (func==="-h") {
        showDoc()
        process.exit()
    }


    function showDoc() {
        let doc = `*** ABOUT ***
This is a program you can use as a factorial and biggest common divider counter
*************
        
        
   
*** HOW TO USE PROGRAM ***
Type in the terminal console: node .\\vm.js factorial.txt 5 to count 5!
Type in the terminal console: node .\\vm.js biggestCommonDivider.txt 15 25 to get bCD of numbers 15 and 25
**************************



*** USABLE FUNCTIONS ***
"ext #" takes integers -1 (for errors), 0 (if ok) as arguments.
"prt #" prints #th element in memory
"read #" takes number from input and remembers it at #th index
"put # $" puts $ at #th index 
"pin @somePin" pin needed to use in the future
"multiply # $ &" takes result of multiplying #th element and $th element, and remembers it in &th index 
"cmp # $" compares element at #th index and $th index and remembers result
"jmpLess @somePin" if the result of comparing was "Less', jumps to @somePin 
"jmpEqual @somePin" if the result of comparing was "Equal', jumps to @somePin
"jmpGreater @somePin" if the result of comparing was "Greater', jumps to @somePin
"decrease # $" decreases #th element by $
"div% # $ &" remembers remainder of the division #th element by $th element
"module # $" remembers positive version of #th element at $th index
"jmp @somePin" jump to @somePin
************************`;
        console.log(doc)
    }

    let code = fs.readFileSync(func).toString().split('\r\n'),
        toWork = true, ip = 0, factor = 3;

    if (code === null || code==="" || code.length===1) {
        console.log("File is empty")
        process.exit()
    }

    makeFunctionsNumbers()
    const pins = fillInPins()

    while (toWork) {
        ip %= 200
        let command = code[ip].split(" ")
        switch (parseInt(command[0])) {
            case 250:
                exit(command, ip)
                toWork=false
                break
            case 251:
                console.log(code[command[1]])
                ip++
                continue
            case 252:
                code[command[1]]=process.argv[factor]
                ip++; factor++
                continue
            case 253:
                code[command[1]]=command[2]
                ip++
                continue
            case 254:
                ip++
                continue
            case 255:
                compare(command)
                ip++
                continue
            case 256:
                code[command[2]]=(code[command[2]]*code[command[1]]).toString()
                ip++
                continue
            case 257:
                if (code[isGreater]==="0" && code[isEqual]!=="1"){
                    ip=pins[command[1]]
                }
                else ip++
                break
            case 258:
                if (code[isEqual]==='1'){
                    ip=pins[command[1]]
                }
                else ip++
                break
            case 259:
                if (code[isGreater]==="1"){
                    ip=pins[command[1]]
                }
                else ip++
                break
            case 260:
                code[command[1]]=(code[command[1]]-command[2]).toString()
                ip++
                continue
            case 261:
                code[command[1]]=(code[command[1]]%code[command[2]]).toString()
                ip++
                continue
            case 262:
                code[command[2]]=(code[command[1]]*(-1)).toString()
                ip++
                break
            case 263:
                ip=pins[command[1]]
                continue
            case 299:
                exit(command, ip)
                toWork=false
                break
            default:
                toWork = false
                ip++
                break

        }
    }

    function makeFunctionsNumbers(){
        let m=0, rememberedPins=[]

        for (let i=0; i<code.length; i++){
            let command=code[i].split(' ')
            rememberPins(command);
            code[i]=getKeyByValue(functions, command[0])
            for (let j=1; j<command.length; j++)
                code[i]+=' ' + command[j]
        }

        function getKeyByValue(ob, command){
            for (let key in ob) {
                if(ob[key] === command)
                    return key
            }
            return "299"
        }

        function rememberPins(command) {
            if (command[1].startsWith("@") && rememberedPins.indexOf(command[1]) === -1) {
                rememberedPins[m++] = command[1]
            }
            if (rememberedPins.indexOf(command[1]) !== -1) {
                command[1] = (rememberedPins.indexOf(command[1]) + 300).toString();
            }
        }
    }

    function fillInPins() {
        let pins={}
        for (let i = 0; i < code.length; i++) {
            let command = code[i].split(" ")
            if (command[0] === "254") {
                pins[command[1]] = i;
            }
        }
        return pins
    }

    function compare(command){
        const isGreater=150, isEqual=151
        if (parseInt(code[command[1]])>parseInt(code[command[2]])){
            code[isGreater]="1"
            code[isEqual]="0"
        }
        else if (parseInt(code[command[1]])<parseInt(code[command[2]])){
            code[isGreater]="0"
            code[isEqual]="0"
        }
        else {
            code[isGreater] = "0"
            code[isEqual] = "1"
        }

    }

    function exit(command, ip){
        if (command[1] === "0") {
            console.log("Success")
        } else if (command[1] === "-1") {
            console.log("-1")
        } else if (command[0] === "299")
            console.log(`SyntaxError at index ${ip+1}`)
        ip++
    }
}

main()