const input = await Deno.readTextFile("input.txt");

const result: number[] = [];
const lines = input.trim().split('\n');

lines.forEach(line => {
    const [eCardsSet, yCardsSet] = line.split(':')[1].split('|').map(cards => new Set([...cards.matchAll(/(\d+)/gi)].map(match => +(match[0] ?? '0'))));

    const winingCards = new Set();

    yCardsSet.forEach(card => {
        if (eCardsSet.has(card)) {
            winingCards.add(card);
        }
    });

    const points = winingCards.size > 0 ? Math.pow(2, winingCards.size - 1) : 0;

    result.push(points);
});

console.log(result.reduce((s, v) => s + v, 0));
