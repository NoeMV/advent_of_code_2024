const fs = require('node:fs');

let total = 0;

try {
    const data = fs.readFileSync('./input2.txt', 'utf8');

    data.split(/\r?\n/).forEach(line =>  {
        const levels = line.split(/\s/).reduce((acc, curr) => {
            if (curr.length) acc.push(Number(curr));
            return acc;
        }, []);

        let isSafe = true;
        let increasing = levels[0] - levels[levels.length-1] < 0;
        for (let i = 1 ; i < levels.length ; i++) {
            if (isValidIncreasing(levels[i-1], levels[i]) && increasing) continue;
            if (isValidDecreasing(levels[i-1], levels[i]) && !increasing) continue;

            isSafe = false;
            break;
        }

        if (isSafe) total++;
    });

    console.log(total);
} catch (err) {
    console.error(err);
}

function isValidDecreasing(previous, current) {
    return previous > current && Math.abs(previous - current) < 4;
}

function isValidIncreasing(previous, current, next) {
    return previous < current && Math.abs(previous - current) < 4;
}