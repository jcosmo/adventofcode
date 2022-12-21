const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)

let numEnclosed = 0
let numOverlaps = 0

lines.forEach(line => { 
    const elf1 = line.split(',')[0]
    const elf2 = line.split(',')[1]
    const elf1L = +elf1.split('-')[0]
    const elf1R = +elf1.split('-')[1]
    const elf2L = +elf2.split('-')[0]
    const elf2R = +elf2.split('-')[1]
    if ((elf1L >= elf2L && elf1R <= elf2R) || (elf2L >= elf1L && elf2R <= elf1R) ) {
        numEnclosed++
    }
    if ((elf1L <= elf2R && elf1R >= elf2L) || (elf2L <= elf1R && elf2R >= elf1L) ) {
        numOverlaps++
    }
})
 
console.log(`Num with 100% overlap: ${numEnclosed}`)
console.log(`Num with any overlap: ${numOverlaps}`)
