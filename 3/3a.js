const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const aValue = 'a'.charCodeAt(0)
const AValue = 'A'.charCodeAt(0)

let sum = 0
do {
    const l1 = lines.shift()
    const l2 = lines.shift()
    const l3 = lines.shift()
    const unique = l1.split('').filter(c => (l2.indexOf(c) >= 0 && l3.indexOf(c) >= 0))[0]
    const ascii = unique.charCodeAt(0) 
    const value = ascii >= aValue ? ascii - aValue + 1 : ascii - AValue + 27
    sum = sum + value
} while(lines.length > 0)

console.log(`Total is ${sum}`)