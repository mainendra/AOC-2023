const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const sum = lines.reduce((s, line) => {
    let values = line.split(' ').map(str => +str);
    const lastValues = [values[0]];
    while (values.some(v => v !== 0)) {
        const result = [];
        for (let i = 1; i < values.length; i++) {
            result.push(values[i] - values[i - 1]);
        }
        values = result;

        lastValues.unshift(values[0]);
    }

    return s + lastValues.reduce((r, v) => {
        return v - r;
    }, 0);
}, 0);

console.log(sum);
