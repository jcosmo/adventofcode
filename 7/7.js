const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/)
const directories = {}
const path = []

do {
    const line = lines.shift()
    processInstruction(line)
} while(lines.length > 0)

const totalSize = directories['/']
const unusedSpace = 70000000 - totalSize
let smallestDeletion = totalSize

let smallDirsSum = 0
Object.keys(directories).sort().forEach( d => {
    //console.log(`Directory ${d} has size ${directories[d]}`)
    if (directories[d] <= 100000) {
        smallDirsSum += directories[d]
    }
    if (unusedSpace + directories[d] >= 30000000 && directories[d] < smallestDeletion ) {
        smallestDeletion = directories[d]
    }
})

console.log(`Total usage: ${totalSize}`)
console.log(`size of dirs less than 100k: ${smallDirsSum}`)
console.log(`Smallest deletion is: ${smallestDeletion}`)



function processInstruction(line) {
    const match = line.match(/^\$ (cd|ls)(.*)$/)
    if ( null === match ) {
        //console.log(`Ignoring ${line}`)
    }
    else {
        switch( match[1] ){
            case 'cd':
                const destination = match[2].substring(1)
                if ( destination === '..') {
                    path.pop()
                } else {
                    path.push(destination)
                    directories[path.join('/')] = 0
                }                    
                // console.log(`Directory is now ${path.join('/')}`)
                break;

            case 'ls':
                const size = processLs()
                // console.log(`Step: Directory ${path.join('/')} has size ${size}`)
                for( let i = 0; i < path.length; i++) {
                    const parent = path.slice(0, i+1).join('/')
                    directories[parent] += size 
                    // console.log(`PostStep: Directory ${parent} has size ${directories[parent]}`)
                }
                break;

            default:
                console.log(`Unhandled instruction! ${line}`)
                break;
        }
    }
}

function processLs() {
    let size = 0
    do {
        const line = lines.shift()
        if (line[0] === '$')
        {
            lines.unshift(line)
            return size
        }
        const parts = line.split(' ')
        if (parts[0] !== 'dir') {
            size += +parts[0]
        }
    } while(lines.length > 0)
    return size
}