const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

let cycle = 1
let x = 1
const cmds = {}
let output = ""

lines.forEach(line => {
  if ( line === 'noop' )
  {
    noop()
  } else {
    addx(line.split(' ')[1])
  }
})

console.log(`Output is\n${output}`)

function noop() {
  checkStrength()
  cycle++
}

function addx(val) {
  checkStrength()
  cycle++
  checkStrength()
  cycle++
  x += (+val)
}

function checkStrength() {
  const posn = (cycle-1) % 40
  if ( posn >= (x-1) && posn <= (x+1) )
    output += "#"
  else
    output += "."

  if ( cycle % 40 === 0) {
    output += "\n"
  }
}