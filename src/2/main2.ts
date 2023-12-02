const input = await Deno.readTextFile("input.txt");

let sumOfPower = 0;

input.split('\n').forEach(line => {
    if (line.trim() === '') return;

    const games = line.split(':')[1];

    const cubes: Record<string, number> = {};

    games.split(';').forEach(game => {
        game.split(',').forEach(cube => {
            const [countStr, colorStr] = cube.trim().split(' ');

            const colorKey = colorStr.toLowerCase();

            if (!cubes[colorKey] || cubes[colorKey] < +countStr) {
                cubes[colorKey] = +countStr;
            }
        });
    });

    sumOfPower += Object.values(cubes).reduce((power, count) => power * count, 1);
});

console.log(sumOfPower);
