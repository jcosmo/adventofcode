const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const grid = []
lines.forEach(line => {
  grid.push(line.split(''))
});


let visibleCount = 0
let maxScenic = 0
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if ( isVisible(row, col)) {
      visibleCount++;
    }
    const score = scenicScore(row, col) 
    if ( score > maxScenic ) {
      maxScenic = score
    }
  }
}
console.log(`Total visible trees ${visibleCount}`)
console.log(`Max scenic score ${maxScenic}`)

function scenicScore(row, col ) {
  if (row === 0 || col === 0 || row === grid.length-1 || col == grid[row].length -1) {
    return 0;
  }
  const h = +grid[row][col]

  // look to the left
  let x = col-1 
  let leftScore = 0
  while (x >= 0) {
    leftScore++;
    if (grid[row][x] >= h ) {  break}
    x--
  }
  x = col+1
  let rightScore = 0
  while (x < grid[row].length) {
    rightScore++;
    if (grid[row][x] >= h ) {  break}
    x++
  }
  x = row-1
  let upScore = 0
  while (x >= 0) {
    upScore++;
    if (grid[x][col] >= h ) { break}
    x--
  }
  x = row+1
  let downScore = 0
  while (x < grid.length) {
    downScore++
    if (grid[x][col] >= h ) { break}
    x++
  }
  return leftScore * rightScore * upScore * downScore
}

function isVisible(row, col) {
  if (row === 0 || col === 0 || row === grid.length-1 || col == grid[row].length -1) {
    return true;
  }
  const h = +grid[row][col]
  // check from the left
  let x = 0 
  blocked = 0
  while (x < col) {
    if (grid[row][x] >= h ) { blocked++; break}
    x++
  }
  x = col+1
  while (x < grid[row].length) {
    if (grid[row][x] >= h ) { blocked++; break}
    x++
  }
  x = 0
  while (x < row) {
    if (grid[x][col] >= h ) { blocked++; break}
    x++
  }
  x = row+1
  while (x < grid.length) {
    if (grid[x][col] >= h ) { blocked++; break}
    x++
  }
  return blocked < 4
}