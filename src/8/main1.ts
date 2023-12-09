const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const defaultDirections = lines[0].trim().split('');
const destRegEx = /(\w{3})\W+(\w{3})\W+(\w{3})/i;
const destMap = lines.slice(2).reduce((r: Record<string, Record<string, string>>, line) => {
    // line - RHQ = (QNL, HDC)
    const match = line.match(destRegEx);
    if (match) {
        r[match[1]] = {
            'L': match[2],
            'R': match[3]
        };
    }
    return r;
}, {});

const dest = 'ZZZ';
let curr  = 'AAA';

let index = 0;
let stepsCount = 0;
while (curr !== dest) {
    stepsCount++;

    const nextDirection = defaultDirections[index];
    curr = destMap[curr][nextDirection];

    index = (index === defaultDirections.length - 1) ? 0 : index + 1;
}

console.log(stepsCount);
