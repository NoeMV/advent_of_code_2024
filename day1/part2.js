const fs = require('node:fs');

const firstList = [];
const secondList = [];
let score = 0;

try {
    const data = fs.readFileSync('./input1.txt', 'utf8');

    data.split(/\r?\n/).forEach(line =>  {
        const directions = line.split(/\s/).filter(x => x.length);
        firstList.push(Number(directions[0]));
        secondList.push(Number(directions[1]));
    });
    
    for (let i = 0 ; i < firstList.length ; i++) {
        const similarities = secondList.filter(x => x == firstList[i]).length;

        score += (firstList[i] * similarities);
    }

    console.log(score);
} catch (err) {
    console.error(err);
}