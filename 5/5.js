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


let line = lines.shift()
const instruction = line.match(/move (\d+) from (\d+) to (\d+)/)
console.log(`In: ${line} is ${instruction[1]} from ${instruction[2]} to ${instruction[3]}`)

console.log(`Before: ${stacks[1]} vs ${stacks[5]}`)
for(let i = 0; i < instruction[1]; i++) {
    stacks[+instruction[3]-1].unshift(stacks[+instruction[2]-1].shift())
}
console.log(`After: ${stacks[1]} vs ${stacks[5]}`)

lines.forEach(line => {
    const instruction = line.match(/move (\d+) from (\d+) to (\d+)/)
    for(let i = 0; i < instruction[1]; i++) {
        stacks[+instruction[3]-1].unshift(stacks[+instruction[2]-1].shift())
    }
    console.log(`In: ${line} is ${instruction[1]} from ${instruction[2]} to ${instruction[3]}`)
})

for (let i  = 0; i < 9; i++) console.log(`Stack ${i}: ${stacks[i]}`)

console.log(stacks.map(s => s[0]).join(''))
