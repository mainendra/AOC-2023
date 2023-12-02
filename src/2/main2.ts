const input = await Deno.readTextFile("input.txt");

let sumOfPower = 0;

input.split('\n').forEach(line => {
    if (line.trim() === '') return;

    const games = line.split(':')[1];

    const cubes: Record<string, number> = {
        'red': 0,
        'green': 0,
        'blue': 0,
    };


    games.split(';').forEach(game => {
        game.split(',').forEach(cube => {
            const [countStr, colorStr] = cube.trim().split(' ');

            if (cubes[colorStr.toLocaleLowerCase()] < +countStr) {
                cubes[colorStr.toLocaleLowerCase()] = +countStr;
            }
        });
    });

    let gamePower = 1;
    if (cubes.red) {
        gamePower *= cubes.red;
    }
    if (cubes.green) {
        gamePower *= cubes.green;
    }
    if (cubes.blue) {
        gamePower *= cubes.blue;
    }

    sumOfPower += gamePower;
});

console.log(sumOfPower);
