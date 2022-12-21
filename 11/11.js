const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const WORRY_LEVEL_DIVIDER = BigInt(1)
const ROUNDS = 10000

const monkeys = []
while (lines.length > 0) {
  const monkey = readMonkey()
  monkey.idx = monkeys.length
  monkeys.push(monkey)
}

console.log("At start: ")
monkeys.forEach(m => dumpMonkey(m))

for(let r = 0; r < ROUNDS; r++ ) {
  monkeys.forEach(m => processMonkey(m))
  console.log(`------ End Round ${r+1}`)
  if ( r % 20 === 0 ) {
    monkeys.forEach(m => dumpMonkey(m))
  }
}

monkeys.forEach(m => dumpMonkey(m))

monkeys.sort((a,b)=> b.score - a.score)
//console.log(`------ Sorted`)
//monkeys.forEach(m => dumpMonkey(m))
console.log(`Monkey Business level: ${monkeys[0].score * monkeys[1].score}`)

function processMonkey(m) {
  while (m.items.length > 0) 
    processItem(m, m.items.shift())
}

function processItem(m, v) {
  m.score++
  let i = v
  let x = (m.opVal === 'old' ? v : BigInt(m.opVal))
  if ( m.op === '+')
    i = i + x
  else
    i = i * x
  //i = i / WORRY_LEVEL_DIVIDER
  if (i % m.div === BigInt(0)) {
    //console.log(`${m.idx}: ${v} became ${i} and throw to ${m.onTrue}`)
    monkeys[m.onTrue].items.push(i)
  } else {
    //console.log(`${m.idx}: ${v} became ${i} and altthrow to ${m.onFalse}`)
    monkeys[m.onFalse].items.push(i)
  }
}

function readMonkey() {
  lines.shift()
  const monkey = {}
  monkey.items = lines.shift().split(':')[1].slice(1).split(',').map(i=> BigInt(i.trim()))
  let line = lines.shift()
  monkey.op = line.split(' ')[6]
  monkey.opVal = line.split(' ')[7]
  monkey.div = BigInt(lines.shift().split(' ')[5])
  monkey.onTrue = +lines.shift().trim().split(' ')[5]
  monkey.onFalse = +lines.shift().trim().split(' ')[5]
  monkey.score = 0
  line = lines.shift()
  return monkey
}

function dumpMonkey(m) {
//  console.log(`Monkey ${m.idx} (${m.score}) has items ${m.items.join(', ')}, will ${m.op} by ${m.opVal}, worryDrop of ${m.div}, throw to ${m.onTrue}/${m.onFalse}`)
// console.log(`Monkey ${m.idx} (${m.score}) has items ${m.items.join(', ')}`)
  console.log(`Monkey ${m.idx} (${m.score}) has ${m.items.length} items`)
}