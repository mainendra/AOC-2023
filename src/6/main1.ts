const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const timeArr = lines[0].split(':')?.[1].trim().split(' ').map(timeStr => +(timeStr)).filter(time => !!time);
const distArr = lines[1].split(':')?.[1].trim().split(' ').map(timeStr => +(timeStr)).filter(dist => !!dist);

let total = 1;

timeArr.forEach((time, index) => {
    let count = 0;
    for (let i = 1; i < time; i++) {
        const winDist = distArr[index];
        const newDist = i * (time - i);
        if (newDist >= winDist) {
            count++;
        }
    }
    if (count > 0) {
        total *= count;
    }
});

console.log(total);
