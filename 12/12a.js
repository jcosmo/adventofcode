const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const grid = []
lines.forEach(line => {
  grid.push(line.split(''))
});
const aCode = "a".charCodeAt(0)

const end = find('E')
const done = []
const paths = []
const allSols = []
let minPath = []

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] === 'a') {
      const result = findPath([{"r":r, "c":c}])
      if (result.length > 0 ) {
        if (minPath.length == 0 || result.length < minPath.length) {
          minPath = result
        }
        console.log(`Path from ${result[0].r}/${result[0].c} of length ${result.length}`)
        allSols.push(result)
      }
    }
  }
}

console.log(`Shortest path has length ${minPath.length}`)
dumpPath(minPath)


function findPath(start) {
  done.length = 0
  paths.length = 0
  paths.push(start)

  while( true ) {
    if (paths.length == 0) {
      return []
    }
    const path = paths.shift()
    if (expandPath(path)) {
      return path
    }
  }
}

function expandPath(p) {
  const x = p.slice(-1)[0]
  const h = height(x)
  return processStep(x, p, h, -1, 0) || 
    processStep(x, p, h, 1, 0) ||
    processStep(x, p, h, 0, -1) ||
    processStep(x, p, h, 0, 1)
}

function processStep(x, p, h, dr, dc) {
  const u = move(x, dr, dc)

  if ( u !== undefined ) {
    const h2  = height(u)
    if (h2 >= h - 3 && h2 <= h + 1 && !done.find(d => d === u.r*1000+u.c)) {
      const p2 = [...p]
      p2.push(u)
      done.push(u.r*1000+u.c)
      if ( u.r == end.r && u.c === end.c ) { 
        return true
      } else {
        paths.push(p2) 
      }
    }
  }
  return false
}

function height(posn) {
  const char = grid[posn.r][posn.c]
  if (char === 'S') return 1
  if (char === 'E') return 26
  return char.charCodeAt(0) - aCode +1
}

function move(posn, dr=0, dc=0) {
  const a = +posn.r + dr
  const b = +posn.c + dc
  if (a < 0 || a >= grid.length) return undefined
  if (b < 0 || b >= grid[a].length) return undefined
  return {"r": a, "c": b}
}

function find(char) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === char) {
        return {"r": r, "c": c}
      }
    }
  }
}

function dumpPaths(){
   paths.forEach(p => dumpPath(p))
}

function dumpPath(p) {
  console.log( `Path: ${p.map(s => `[${s.r},${s.c}]`).join(',')}`)
}

function dumpGrid() {
  console.log(`Grid: \n${grid.map(r=> r.join('')).join("\n")}`)  
}