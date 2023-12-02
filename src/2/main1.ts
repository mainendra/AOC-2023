const input = await Deno.readTextFile("input.txt");

let sumOfIds = 0;

const cubes: Record<string, number> = {
    'red': 12,
    'green': 13,
    'blue': 14,
};

input.split('\n').forEach(line => {
    if (line.trim() === '') return;

    const [gameIdStr, games] = line.split(':');

    const id = +gameIdStr.substring(5); // Always starts with `Game `

    let isValid = true;

    games.split(';').forEach(game => {
        game.split(',').forEach(cube => {
            const [countStr, colorStr] = cube.trim().split(' ');

            if (cubes[colorStr.toLocaleLowerCase()] < +countStr) {
                isValid = false;
            }
        });
    });

    if (isValid) {
        sumOfIds += id;
    }
});

console.log(sumOfIds);
