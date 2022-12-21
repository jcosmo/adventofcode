const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

let elf = 0
let max = 0
let current = 0
let maxElf = 0
const totals = []
// print all lines
lines.forEach(line => {
    if (line === '') {
        if (current > max) {
            max = current
            maxElf = elf
        }
        totals.push(1*current)
        elf = elf + 1
        current = 0
    }
    else {
        current = current + (+line)
    }
})

console.log("max is " + max + " with elf " + maxElf)
const sortedTotals = totals.sort((a,b) => b-a)
console.log("total of biggest 3 is " + (sortedTotals[0]+ sortedTotals[1]+ sortedTotals[2]))
console.log(sortedTotals)
