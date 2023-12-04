const input = await Deno.readTextFile("input.txt");

const lines = input.trim().split('\n');

const totalCards: Record<number, number> = {};

lines.forEach((line, index) => {
    totalCards[index] ||= 1;
    const [eCardsSet, yCardsSet] = line.split(':')[1].split('|').map(cards => new Set([...cards.matchAll(/(\d+)/gi)].map(match => +(match[0] ?? '0'))));

    let totalWins = 0;
    yCardsSet.forEach(card => {
        if (eCardsSet.has(card)) {
            totalWins++;
        }
    });

    for (let i = index + 1; i < (index + 1 + totalWins); i++) {
        totalCards[i] ||= 1; // set default to 1
        totalCards[i] += totalCards[index];
    }
});

console.log(totalCards);
console.log(Object.values(totalCards).reduce((s, v) => s + v, 0));
