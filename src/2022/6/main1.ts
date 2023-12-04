const input = await Deno.readTextFile("input.txt");

const numberOfChars = 14; // part 1: 4, part 2: 14
const markerRegEx = new RegExp('(?=(.{14}))', 'gi');

input.split('\n').forEach(line => {
    if (line.trim() === '') return;

    ([...line.matchAll(markerRegEx)]).some((marker, index) => {
        if ((new Set(marker[1].split(''))).size === numberOfChars) {
            console.log(`${index + numberOfChars}: ${marker[1]}`);
            return true;
        }
        return false;
    });
});
