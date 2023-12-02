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

    const isInValid = games.split(';').some(game => {
        return game.split(',').some(cube => {
            const [countStr, colorStr] = cube.trim().split(' ');
            return (cubes[colorStr.toLocaleLowerCase()] < +countStr);
        });
    });

    if (!isInValid) {
        sumOfIds += id;
    }
});

console.log(sumOfIds);
