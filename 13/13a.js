const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

const packets = [[[2]], [[6]]]
while(lines.length > 0) {
  packets.push(JSON.parse(lines.shift()))
  packets.push(JSON.parse(lines.shift()))
  lines.shift()
}

packets.sort((a,b) => compare(a,b))
const strings = packets.map(p => JSON.stringify(p))

console.log(`Decoder key = ${find(strings, [[2]]) * find(strings, [[6]])}`)

function find(strings, match) {
  return strings.indexOf(JSON.stringify(match))+1
}

function compare(l, r) {
  if (typeof l === 'number') {
    if (typeof r === 'number') {
      debug(`Result based on ${l} vs ${r}`)
      return l -r
    }
    return compare([l], r)
  } else if (typeof r === 'number') {
    return compare(l, [r])
  }

  for (let i = 0; i < l.length; i++) {
    if (i >= r.length ) {
      debug(`Not sorted as l longer than r`)
      return 1
    }
    const b = compare(l[i], r[i])
    if (b !== 0) {
      return b;
    }
  }
  debug(`Sorted based on length of ${l.length} vs ${r.length}`)
  return l.length - r.length
}

function debug(m) {
  //console.log(m)
}