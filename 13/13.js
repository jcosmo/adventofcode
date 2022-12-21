const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const pairs = []
while(lines.length > 0) {
  const left = JSON.parse(lines.shift())
  const right = JSON.parse(lines.shift())
  pairs.push([left, right])
  lines.shift()
}

let result = 0
for ( let i = 0; i < pairs.length; i++ ){
  if ( isOrdered(pairs[i])) {
    console.log(`Pair ${i+1} is ordered`)
    result += i+1
  }
}

console.log(`Total indexes: ${result}`)

function isOrdered(pair) {
  const l = pair[0]
  const r = pair[1]
  const x = compare(l, r)
  debug(`isOrdered ${l} vs ${r}: ${x}`)
  return x < 1
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