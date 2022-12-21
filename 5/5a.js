const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

const stacks = []
for (let i  = 0; i < 9; i++) stacks.push([])

for (let i = 0; i < 8; i++) {
    const line = lines.shift().split('')
    for (let s  = 0; s < 9; s++) {
        if (line[s*4+1] !== ' ') {
            stacks[s].push(line[s*4+1])
        }
    }
}
lines.shift()
lines.shift()

function process(instruction) {
    const temp = []
    for(let i = 0; i < instruction[1]; i++) {
        temp.unshift(stacks[+instruction[2]-1].shift())
    }
    temp.forEach(x => stacks[+instruction[3]-1].unshift(x))
}

let line = lines.shift()
const instruction = line.match(/move (\d+) from (\d+) to (\d+)/)
console.log(`Before: ${stacks[instruction[2]-1]} vs ${stacks[instruction[3]-1]}`)
console.log(`In: ${line} is ${instruction[1]} from ${instruction[2]} to ${instruction[3]}`)
process(instruction)
console.log(`After: ${stacks[instruction[2]-1]} vs ${stacks[instruction[3]-1]}`)

lines.forEach(line => {
    const instruction = line.match(/move (\d+) from (\d+) to (\d+)/)
    process(instruction)
})

for (let i  = 0; i < 9; i++) console.log(`Stack ${i}: ${stacks[i]}`)

console.log(stacks.map(s => s[0]).join(''))
