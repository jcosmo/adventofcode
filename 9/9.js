const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

const length = 10
const rope = []
for(let x = 0; x < length; x++) {
  rope.push([0,0])
}
const visited = {}
visited[tailP()] = 1

lines.forEach(line => {
  const dir = line.split(' ')[0]
  const dist = line.split(' ')[1]
  switch (dir) {
    case 'L': moveTimes(-1,0,dist); break
    case 'R': moveTimes(1,0,dist); break
    case 'U': moveTimes(0,1,dist); break
    case 'D': moveTimes(0,-1,dist); break
  }
  console.log(`Line: ${line}: ${dumpRope()}`)
});

console.log(`Visited ${Object.keys(visited).length}`)

function dumpRope() {
  return `Rope is ${rope.map(x => `${x[0]}/${x[1]}`).join(',')}`
}

function moveTimes(dX, dY, dist) {
  for (let x = 0; x < dist; x++) {
    const head = rope[0]
    head[0] += dX
    head[1] += dY
    for (let i = 1; i < rope.length; i++ ) {
      catchup(i)
    }
    visited[tailP()] = 1
  }
}

function catchup(x) {
  const head = rope[x-1]
  const tail = rope[x]
  if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1 ){
    if (tail[0] < head[0]) tail[0]++
    if (tail[0] > head[0]) tail[0]--
    if (tail[1] < head[1]) tail[1]++
    if (tail[1] > head[1]) tail[1]--
  }
}

function tailP() {
  const posn = rope.slice(-1)[0]
  return posn[0] * 1000 + posn[1]
}
