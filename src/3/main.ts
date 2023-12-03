const input = await Deno.readTextFile("input.txt");

const charGrid = input.split('\n').map(line => line.split(''));

let total = 0;
let totalGearRatio = 0;

const numbersSet = new Set();

const symbolRegEx = /[^\d\\.]/;
const digitRegEx = /\d/;

function isDigit(nStr: string) {
    return digitRegEx.test(nStr);
}

function isValidPos(rn: number, cn: number) {
    return rn >= 0 && rn < charGrid.length - 1 && cn >= 0 && cn < charGrid[rn].length;
}

for (let rn = 0; rn < charGrid.length; rn++) {
    const r = charGrid[rn];
    for (let cn = 0; cn < r.length; cn++) {
        const c = r[cn];
        if (symbolRegEx.test(c)) {
            const numbersInnerSet = new Set();
            let gearRatio = 1;
            [rn - 1, rn, rn + 1].forEach(digitRn => {
                [cn - 1, cn, cn + 1].forEach(digitCn => {
                    if (isValidPos(digitRn, digitCn) && isDigit(charGrid[digitRn][digitCn])) {
                        let digitStr = '';
                        let digitCnL = digitCn;
                        while (digitCnL >= 0 && isDigit(charGrid[digitRn][digitCnL])) {
                            digitStr = charGrid[digitRn][digitCnL] + digitStr;
                            digitCnL--;
                        }
                        let digitCnR = digitCn + 1;
                        while (digitCnR < charGrid[digitRn].length && isDigit(charGrid[digitRn][digitCnR])) {
                            digitStr += charGrid[digitRn][digitCnR];
                            digitCnR++;
                        }

                        const index = `${digitRn},${digitCnL + 1},${digitStr}`;

                        if (!numbersSet.has(index)) {
                            numbersSet.add(index);
                            total += +digitStr;
                        }

                        if (!numbersInnerSet.has(index) && c === '*') { // only adjacent to *
                            numbersInnerSet.add(index);
                            gearRatio *= +digitStr;
                        }
                    }
                });
            });

            if (numbersInnerSet.size === 2) {
                totalGearRatio += gearRatio;
            }
        }
    }
}

console.log(`Part 1: Total: ${total}`);
console.log(`Part 2: Total gear ratio: ${totalGearRatio}`);
