const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

let sLoc: number[] = [];

const grid = lines.reduce((r: string[][], line, lineNo) => {
    if (line.indexOf('S') >= 0) {
        sLoc = [line.indexOf('S'), lineNo];
    }
    r.push([...line.split('')]);
    return r;
}, []);

const locMap: Record<string, number[][]> = { // in directions
    '|': [[0, 1], [0, -1]],
    '-': [[1, 0], [-1, 0]],
    'L': [[0, 1], [-1, 0]],
    'J': [[0, 1], [1, 0]],
    '7': [[0, -1], [1, 0]],
    'F': [[-1, 0], [0, -1]]
}

function isValidPrevLoc(val: string, preDir: number[]) {
    return locMap[val].some(validLoc => {
        return validLoc[0] === preDir[0] && validLoc[1] === preDir[1];
    });
}

function getNextDir(preDir: number[], val: string) {
    return locMap[val]?.find(dir => {
        return dir[0] !== preDir[0] || dir[1] !== preDir[1];
    })?.map(val => val * -1) ?? [0, 0]; // out direction (multiply by -1)
}

// Find point in polygon using Ray casting algorithm
function getEnclosedTiles(positions: number[][]) {
    const pathPositionsSet = new Set(positions.map(pos => `${pos[0]},${pos[1]}`));
    let totalITiles = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const posStr = `${x},${y}`;
            if (pathPositionsSet.has(posStr)) continue;
            if (x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1) continue;

            let posX = x;
            let totalCrossing = 0;
            let halfCrossingJ = false;
            let halfCrossing7 = false;
            while (posX > 0) {
                posX--;
                const tmpPosStr = `${posX},${y}`;
                if (pathPositionsSet.has(tmpPosStr)) {
                    const char = grid[y][posX];
                    if (char === '|') {
                        totalCrossing++;
                    } else if (char === 'J') { // FJ path can cross
                        halfCrossingJ = true;
                    } else if (halfCrossingJ && char === 'F') {
                        totalCrossing++;
                        halfCrossingJ = false;
                    } else if (char === '7') { // L7 path can cross
                        halfCrossing7 = true;
                    } else if (halfCrossing7 && char === 'L') {
                        totalCrossing++;
                        halfCrossing7 = false;
                    } else if (char !== '-') { // ignore `-` horizintal path
                        halfCrossingJ = false;
                        halfCrossing7 = false;
                    }
                }
            }

            if (totalCrossing % 2 !== 0) {
                totalITiles++;
            }
        }
    }
    return totalITiles;
}

// const rowSize = grid[0].length;
// function printPositions(positions: number[][]) {
//     const group = Object.groupBy(positions, (position) => position[1]);
//     Object.entries(group).forEach(([k, v]) => {
//         group[+k] = v.sort((a, b) => a[0] - b[0]);
//     });
//     Object.keys(group).sort((a, b) => +a - +b).forEach((col: string) => {
//         const posList = new Set(group[+col].map(a => a[0]));
//         let rowStr = '';
//         for (let i = 0; i < rowSize; i++) {
//             rowStr += posList.has(i) ? grid[+col][i] : '.';
//         }
//         console.log(rowStr);
//     });
// }

// start from all four direction from starting point
const found = [[1, 0], [0, 1], [-1, 0], [0, -1]].some(dir => {
    const positions = [sLoc];
    let preDir = dir;
    let currPos = [sLoc[0] + preDir[0], sLoc[1] + preDir[1]];
    let currVal = grid[currPos[1]]?.[currPos[0]];
    let totalSteps = 1;
    while(currVal && currVal !== 'S' && currVal !== '.' && isValidPrevLoc(currVal, preDir)) {
        positions.push(currPos);
        totalSteps++;
        preDir = getNextDir(preDir, currVal);
        currPos = [currPos[0] + preDir[0], currPos[1] + preDir[1]];
        currVal = grid[currPos[1]]?.[currPos[0]];
    }

    // back to starting point
    if (currVal === 'S') {
        console.log(totalSteps);
        console.log(Math.floor(totalSteps / 2));
        // printPositions(positions);
        console.log(getEnclosedTiles(positions));
        return true;
    }

    return false;
});

console.log(found);
