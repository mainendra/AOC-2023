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

const currNodes = Object.keys(destMap).filter(key => /\w{2}A/.test(key));

// Assuming it will loop after getting location that ends with z
const steps = currNodes.map(node => {
    let index = 0;
    let stepsCount = 0;
    let curr = node;
    while (!(/\w{2}Z/.test(curr))) {
        stepsCount++;
        const nextDirection = defaultDirections[index];
        curr = destMap[curr][nextDirection];

        index = (index === defaultDirections.length - 1) ? 0 : index + 1
    }
    return stepsCount;
});


function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number) {
    return (a * b) / gcd(a, b);
}

const result = steps.reduce((r, step) => {
    return r ? lcm(r, step) : step;
});

console.log(result);
