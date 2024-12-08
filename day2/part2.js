const fs = require('node:fs');

let total = 0;

try {
    const data = fs.readFileSync('./input2.txt', 'utf8');

    data.split(/\r?\n/).forEach(line =>  {
        const unsafeLevels = line.split(/\s/).reduce((acc, curr) => {
            if (curr.length) acc.push(Number(curr));
            return acc;
        }, []);

        let dampIndex = -1;
        let dampIncreasing = unsafeLevels[0] - unsafeLevels[unsafeLevels.length-1] < 0;
        // 46, 44, 41, 39, 38, 40, 33
        // 40, 38, 39, 41, 44, 46
        for (let i = 1 ; i < unsafeLevels.length ; i++) {
            if (isValidIncreasing(unsafeLevels[i-1], unsafeLevels[i]) && dampIncreasing) continue;
            if (isValidDecreasing(unsafeLevels[i-1], unsafeLevels[i]) && !dampIncreasing) continue;

            if (dampIncreasing){
                if (unsafeLevels[i-1] - unsafeLevels[i] > 0) dampIndex = i - 1;
                else dampIndex;
            } else {
                if (unsafeLevels[i-1] - unsafeLevels[i] < 0) dampIndex = i;
                else dampIndex;
            }
            break;
        }

        dampIndex = dampIndex <= 0 ? 0 : dampIndex;

        const levels = [...unsafeLevels.slice(0, dampIndex), ...unsafeLevels.slice(dampIndex + 1)];
        
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