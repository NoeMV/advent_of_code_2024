const fs = require('node:fs');

const firstList = [];
const secondList = [];
let totalDistances = 0;

try {
    const data = fs.readFileSync('./input1.txt', 'utf8');

    data.split(/\r?\n/).forEach(line =>  {
        const directions = line.split(/\s/).filter(x => x.length);
        firstList.push(Number(directions[0]));
        secondList.push(Number(directions[1]));
    });
    
    firstList.sort((a, b) => a - b);
    secondList.sort((a, b) => a - b);
    
    for (let i = 0 ; i < firstList.length ; i++) {
        const distance = firstList[i] - secondList[i];

        totalDistances += (distance < 0 ? distance * -1 : distance)
    }

    console.log(totalDistances);
} catch (err) {
    console.error(err);
}