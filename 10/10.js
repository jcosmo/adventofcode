const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

let cycle = 1
let x = 1
let strength = 0
const cmds = {}

lines.forEach(line => {
  if ( line === 'noop' )
  {
    noop()
  } else {
    addx(line.split(' ')[1])
  }
})

console.log(`Final x is ${x} after ${cycle} cycles`)
console.log(`Strength is ${strength}`)

function noop() {
  console.log(`Cycle ${cycle}, processed noop, x is ${x}`)
  checkStrength()
  cycle++
  console.log(`Processed noop, x is ${x} at end of cycle ${x}`)
}

function addx(val) {
  console.log(`Cycle ${cycle}, starting adding ${val} to ${x}`)
  checkStrength()
  cycle++
  console.log(`Cycle ${cycle}, working on adding ${val} to ${x}`)
  checkStrength()
  cycle++
  x += (+val)
  console.log(`Processed add ${val}, x is ${x} at end of cycle ${x}`)
}

function checkStrength() {
  if ((cycle-20)%40 == 0 ) {
    console.log(`Strength at ${cycle} with ${x} is ${cycle * x}`)
    strength += cycle * x
  }
}
