const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const time = +(lines[0].split(':')?.[1].trim().match(/\d+/gi)?.join('') ?? '0');
const winDist = +(lines[1].split(':')?.[1].trim().match(/\d+/gi)?.join('') ?? '0');

let count = 0;

for (let i = 1; i < time; i++) {
    const newDist = i * (time - i);
    if (newDist >= winDist) {
        count++;
    }
}

console.log(count);
