const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

let seeds: number[] = [];

const mapRegEx = /(\w+-to-\w+)\smap:/i;

const maps: Array<Array<Array<number>>> = [];

let index = 0;
while(index < lines.length) {
    let line = lines[index];

    if (line.startsWith('seeds: ')) {
        seeds = line.split(':')[1].trim().split(' ').map(nStr => +nStr);
    }

    if (mapRegEx.test(line)) {
        const mapResult: Array<Array<number>> = [];
        index++;
        line = lines[index];
        while (line !== '' && index < lines.length) {
            const [dStart, sStart, len] = line.trim().split(' ').map(nStr => +nStr);
            mapResult.push([sStart, dStart, len]);
            index++;
            line = lines[index];
        }
        maps.push(mapResult);
    } else {
        index++;
    }
}

const findMapping = (num: number, values: Array<Array<number>>) => {
    const mapping = values.find(([sStart, _dStart, len]) => {
        return (num >= sStart && num < sStart + len);
    });

    return mapping ? mapping[1] + (num - mapping[0]) : num;
};

const locations = seeds.map(seed => {
    return maps.reduce((nextVal, map) => {
        return findMapping(nextVal, map);
    }, seed);
});

const minLocation = locations.reduce((r, v) => {
    return Math.min(r, v);
}, locations[0]);

console.log(minLocation);
