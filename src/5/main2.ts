const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const seeds: Array<Array<number>> = [];

const mapRegEx = /(\w+-to-\w+)\smap:/i;

const mapsGroup: Array<Array<Array<number>>> = [];

let index = 0;
while(index < lines.length) {
    let line = lines[index];

    if (line.startsWith('seeds: ')) {
        const seedsRage = line.split(':')[1].trim().split(' ').map(nStr => +nStr);
        for (let i = 0; i < seedsRage.length; i += 2) {
            seeds.push([seedsRage[i], seedsRage[i] + seedsRage[i + 1]]);
        }
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
        mapsGroup.push(mapResult);
    } else {
        index++;
    }
}

let nextSeeds = seeds;
mapsGroup.forEach(maps => {
    const tmpSeeds: number[][] = [];
    while(nextSeeds.length !== 0) {
        // @ts-ignore: null check above
        const [start, end] = nextSeeds.pop();
        const matched = maps.some(([sStart, dStart, len]) => {
            const oStart = Math.max(sStart, start);
            const oEnd = Math.min(sStart + len, end);

            if (oStart < oEnd) {
                tmpSeeds.push([dStart + (oStart - sStart), dStart + (oStart - sStart) + (oEnd - oStart)]);
                if (start < oStart) {
                    nextSeeds.push([start, oStart - 1]);
                }
                if (end > oEnd) {
                    nextSeeds.push([oEnd + 1, end]);
                }
                return true;
            }
            return false;
        });
        if (!matched) {
            tmpSeeds.push([start, end]);
        }
    }
    nextSeeds = tmpSeeds;
});

console.log(nextSeeds.sort((a, b) => a[0] - b[0])[0][0]);
