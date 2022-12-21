const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const aValue = 'a'.charCodeAt(0)
const AValue = 'A'.charCodeAt(0)

const sum = 
lines.map(l => {
    const left = l.substring(0, l.length/2)
    const right = l.substring(l.length/2)
    const duplicate = left.split('').filter(c => right.includes(c))[0]
    const ascii = duplicate.charCodeAt(0) 
    const value = ascii >= aValue ? ascii - aValue + 1 : ascii - AValue + 27
    return value
}).reduce((a,b) => a+b, 0)

console.log(`Total is ${sum}`)