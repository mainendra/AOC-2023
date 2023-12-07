const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

const resultMap: Record<string, ([string[], number])[]> = {
    5: [],
    4: [],
    'F': [],
    3: [],
    2: [],
    1: [],
    'H': []
};

lines.forEach(line => {
    const  cardsAmount = line.split(' ').map(v => v.trim());
    const cards = cardsAmount[0].split('');
    const amount = +cardsAmount[1];

    const groups = Object.groupBy(cards, (card) => card);
    const values = Object.values(groups);
    const maxVal = Math.max(...values.map(items => items.length));

    switch(true) {
        case maxVal === 5:
            resultMap[5].push([cards, amount]);
            break;
        case maxVal === 4:
            resultMap[4].push([cards, amount]);
            break;
        case maxVal === 3 && values.length === 2:
            resultMap['F'].push([cards, amount]);
            break;
        case maxVal === 3 && values.length === 3:
            resultMap[3].push([cards, amount]);
            break;
        case maxVal === 2 && values.length === 3:
            resultMap[2].push([cards, amount]);
            break;
        case maxVal === 2 && values.length === 4:
            resultMap[1].push([cards, amount]);
            break;
        default:
            resultMap['H'].push([cards, amount]);
            break;
    }
});

const cardsRank: Record<string, number> = {
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    "T": 9,
    "J": 10,
    "Q": 11,
    "K": 12,
    "A": 13
};
function cardCompare(c1: string[], c2: string[]) {
    for (let i = 0; i < c1.length; i++) {
        if (cardsRank[c1[i]] > cardsRank[c2[i]]) {
            return 1;
        }
        if (cardsRank[c1[i]] < cardsRank[c2[i]]) {
            return -1;
        }
    };
    return 0;
}

let mult = 0;
const order = ['H', 1, 2, 3, 'F', 4, 5];
const total = order.reduce((s: number, key) => {
    resultMap[key].sort((a, b) => cardCompare(a[0], b[0]));
    return s + resultMap[key].reduce((r, c) => {
        mult++;
        return r + (mult * c[1]);
    }, 0);
}, 0);

console.log(total);
