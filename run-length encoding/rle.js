//import fs from "fs"
//const fs1=require("fs").promises
// node .\rle.js --escape -e in.* out.*
// node .\rle.js --jump -d in.* out.*
// node .\rle.js -h
import {encodeEsc, decodeEsc} from "./escape.js"
import {encodeJmp, decodeJmp} from "./jump.js"
import fs from "fs";

function rle() {
    const [taskType, funcType, inputPath, outputPath] = process.argv.slice(2), esc = 35;
    if (taskType === "-h") {
        showDoc()
        process.exit()
    }
    if (taskType === "--esc") {
        if (funcType === "-e") {
            fs.open(outputPath, "w", err => {
                fs.writeFileSync(outputPath, encodeEsc(fs.readFileSync(inputPath), esc));
            })
        }
        if (funcType === "-d") {
            fs.open(outputPath, "w", err => {
                fs.writeFileSync(outputPath, decodeEsc(fs.readFileSync(inputPath), esc));
            })
        }
    }
    if (taskType === "--jump") {
        if (funcType === "-e") {
            fs.open(outputPath, "w", err => {
                fs.writeFileSync(outputPath, encodeJmp(fs.readFileSync(inputPath)));
            })
        }
        if (funcType === "-d") {
            fs.open(outputPath, "w", err => {
                fs.writeFileSync(outputPath, decodeJmp(fs.readFileSync(inputPath)));
            })
        }
    } else if (taskType !== "--esc" && taskType !== "--jump" && taskType !== "-h") {
        console.log("You mistyped what to do.")
    }

    function showDoc() {
        const welcome = `I welcome you to the program of rle-encoding,
where you can encode and/or decode your files!\n`, howTo = `
        
To use escape/jump encoding type: "node rle.js --escape/--jump" 
then specify if you want to encode or decode with: "-e/-d" accordingly 
and, lastly, tell the code where to take the needed file from 
and the name for the file to store the result with: "in.* out.*"\n`, ex = `\nSo, for example, you want to encode with jump 
files in.png and put the result in out.png. You type:
node rle.js --jump -e in.png\n`
        console.log(welcome + "=".repeat(welcome.length / 2) + howTo + "=".repeat(howTo.length / 4) + ex + "=".repeat(ex.length / 2))
    }
}

rle();