const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const grid = lines.map(line => line.split(''));
const points = grid.reduce((r: (string|number)[][], rowPoints, row) => {
    r.push(...rowPoints.map(((pt, col) => [col, row, pt])));
    return r;
}, []);
const emptyRows = new Set(Object.entries(Object.groupBy(points, (pt) => { return pt[1] })).reduce((r: number[], [k, v]: [string, (string|number)[][]]) => {
    if (v.every(p => p[2] === '.')) {
        r.push(+k);
    }
    return r;
}, []));
const emptyColms = new Set(Object.entries(Object.groupBy(points, (pt) => { return pt[0] })).reduce((r: number[], [k, v]: [string, (string|number)[][]]) => {
    if (v.every(p => p[2] === '.')) {
        r.push(+k);
    }
    return r;
}, []));

const galaxyPts: (string|number)[][] = [];
grid.forEach((items, rowNo) => {
    items.forEach((item, colNo) => {
        if (item === '#') {
            galaxyPts.push([colNo, rowNo, item])
        }
    });
});

// const multiplier = 2; // Part 1
const multiplier = 1000000; // Part 2
// const multiplier = 100; // example

function getEmptyColmsBetween(col1: number, col2: number) {
    const [start, end] = col1 > col2 ? [col2, col1] : [col1, col2];
    const totalEmpty = (new Array(end - start).fill(0)).filter((_, i) => emptyColms.has(start + i)).length;
    return (totalEmpty * multiplier) - totalEmpty; // count for empty colms
}
function getEmptyRowsBetween(row1: number, row2: number) {
    const [start, end] = row1 > row2 ? [row2, row1] : [row1, row2];
    const totalEmpty = (new Array(end - start).fill(0)).filter((_, i) => emptyRows.has(start + i)).length;
    return (totalEmpty * multiplier) - totalEmpty; // count for empty row
}

function distanceBetween(galaxy1: (string|number)[], galaxy2: (string|number)[]) {
    const colDiff = Math.abs(+galaxy1[0] - +galaxy2[0]);
    const rowDiff = Math.abs(+galaxy1[1] - +galaxy2[1]);
    // row and col diff includes empty row / colms
    return colDiff + rowDiff + getEmptyRowsBetween(+galaxy1[1], +galaxy2[1]) + getEmptyColmsBetween(+galaxy1[0], +galaxy2[0]);
}

let totalDistance = 0;

while(galaxyPts.length > 0) {
    const galaxy = galaxyPts.pop();
    if (galaxy) {
        galaxyPts.forEach(nextGalaxy => {
            totalDistance += distanceBetween(galaxy, nextGalaxy);
        });
    }
}

console.log(totalDistance);
