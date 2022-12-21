const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')

const packetSize = 14

function allDiff(chars) {
    return new Set(chars.split('')).size == chars.length
}

let index = packetSize
while (index < data.length && !allDiff(data.slice(index-packetSize, index))) {
    index =  index + 1
}

console.log(`At ${index} are ${data.slice(index-packetSize, index)}`)