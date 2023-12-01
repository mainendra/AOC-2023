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
    'eno': 1,
    'owt': 2,
    'eerht': 3,
    'ruof': 4,
    'evif': 5,
    'xis': 6,
    'neves': 7,
    'thgie': 8,
    'enin': 9,
};

const regEx = /(one|two|three|four|five|six|seven|eight|nine|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|\d)/i;
const getNumber = (numStr: string) => digitMap[numStr.toLocaleLowerCase()] || numStr;

input.split('\n').forEach(line => {
    const match1 = line.match(regEx);
    const match2 = line.split('').reverse().join('').match(regEx);
    if (match1 && match2) {
        const num = +(`${getNumber(match1[0])}${getNumber(match2[0])}`);
        total += num;
    }
});

console.log(total);
