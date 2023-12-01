const input = await Deno.readTextFile("input.txt");

let total = 0;
const digitMap: Record<string, number> = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
};

const getNumber = (numStr: string) => digitMap[numStr.toLocaleLowerCase()] || numStr;

input.split('\n').forEach(line => {
    const regEx = new RegExp('(?=(' + Object.keys(digitMap).join('|') + '|\\d))', 'gi');
    const match = [...line.matchAll(regEx)];
    if (match && match.length) {
        total += +(`${getNumber(match[0][1])}${getNumber(match[match.length - 1][1])}`);
    }
});

console.log(total);
