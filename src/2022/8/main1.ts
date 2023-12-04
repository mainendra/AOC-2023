const input = await Deno.readTextFile("input.txt");
const grid = input.trim().split('\n').map(line => line.split('').map(val => +val));

const visibleTrees = new Set();

function isEdge(row: number, col: number) {
    return col === 0 || row === 0 || col === (grid[row].length - 1) || row === (grid.length - 1);
}

function getScenicScore(row: number, col: number) {
    const treeHeight = grid[row][col];
    let score = 1;

    let distance = 0;
    for (let i = row - 1; i >= 0; i--) {
        distance++;
        if (grid[i][col] >= treeHeight) {
            break;
        }
    }

    score *= row === 0 ? 1 : distance;

    distance = 0;
    for (let i = row + 1; i < grid.length; i++) {
        distance++;
        if (grid[i][col] >= treeHeight) {
            break;
        }
    }

    score *= row === grid.length - 1 ? 1 : distance;

    distance = 0;
    for (let i = col - 1; i >= 0; i--) {
        distance++;
        if (grid[row][i] >= treeHeight) {
            break;
        }
    }

    score *= col === 0 ? 1 : distance;

    distance = 0;
    for (let i = col + 1; i < grid[row].length; i++) {
        distance++;
        if (grid[row][i] >= treeHeight) {
            break;
        }
    }

    score *= col === grid[row].length - 1 ? 1 : distance;

    return score;
}

function isVisible(row: number, col: number) {
    const treeHeight = grid[row][col];
    let isVisible = true;

    for (let i = row - 1; i >= 0; i--) {
        if (grid[i][col] >= treeHeight) {
            isVisible = false;
            break;
        }
    }

    if (isVisible) {
        return true;
    }

    isVisible = true;
    for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][col] >= treeHeight) {
            isVisible = false;
            break;
        }
    }

    if (isVisible) {
        return true;
    }

    isVisible = true;
    for (let i = col - 1; i >= 0; i--) {
        if (grid[row][i] >= treeHeight) {
            isVisible = false;
            break;
        }
    }

    if (isVisible) {
        return true;
    }

    isVisible = true;
    for (let i = col + 1; i < grid[row].length; i++) {
        if (grid[row][i] >= treeHeight) {
            isVisible = false;
            break;
        }
    }

    return isVisible;
}

let highestScenicScore = 0;

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        const treeHeight = grid[row][col];

        if (isEdge(row, col) || isVisible(row, col)) {
            visibleTrees.add(`${row},${col},${treeHeight}`);
        }

        const scenicScore = getScenicScore(row, col);
        highestScenicScore = Math.max(highestScenicScore, scenicScore);
    }
}

console.log(visibleTrees.size);
console.log(highestScenicScore);
