const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

const pieceValue = {
    X: 1,
    Y: 2,
    Z: 3,
}   

const draws = {
    A: 'X',
    B: 'Y',
    C: 'Z',
}   

const wins = {
    A: 'Y',
    B: 'Z',
    C: 'X',
}   

const loses = {
    A: 'Z',
    B: 'X',
    C: 'Y',
}   

let score =
    lines.map(line => { 
        const them = line[0]
        const result = line[2]

        let me = undefined
        let roundValue = 0
        if ( result === 'Y' ) {
            roundValue = 3
            me = draws[them]
        } else if ( result === 'Z')  {
            roundValue = 6
            me = wins[them]
        } else {
            me = loses[them]
        }

        const roundScore = roundValue + pieceValue[me]
        console.log("Line: " + line + " scored " + roundValue + " plus " + pieceValue[me] + " == " + roundScore)
        return roundScore
    }
    ).reduce((a, v) => a + v, 0)

console.log(score)