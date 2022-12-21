const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

const pieceValue = {
    X: 1,
    Y: 2,
    Z: 3,
}   

const draws = {
    X: 'A',
    Y: 'B',
    Z: 'C',
}   

const wins = {
    X: 'C',
    Y: 'A',
    Z: 'B',
}   

let score =
    lines.map(line => { 
        const them = line[0]
        const me = line[2]
        const roundValue = (draws[me] === them) ? 3 : (wins[me] === them ? 6 : 0)
        const roundScore = roundValue + pieceValue[me]
        console.log("Line: " + line + " scored " + roundValue + " plus " + pieceValue[me] + " == " + roundScore)
        return roundScore
    }
    ).reduce((a, v) => a + v, 0)

console.log(score)