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
            [rn - 1, rn, rn + 1].forEach(rn1 => {
                [cn - 1, cn, cn + 1].forEach(cn1 => {
                    if (isValidPos(rn1, cn1) && isDigit(charGrid[rn1][cn1])) {
                        let digitStr = '';
                        let digitCnL = cn1;
                        while (digitCnL >= 0 && isDigit(charGrid[rn1][digitCnL])) {
                            digitStr = charGrid[rn1][digitCnL] + digitStr;
                            digitCnL--;
                        }
                        let digitCnR = cn1 + 1;
                        while (digitCnR < charGrid[rn1].length && isDigit(charGrid[rn1][digitCnR])) {
                            digitStr += charGrid[rn1][digitCnR];
                            digitCnR++;
                        }

                        const index = `${rn1},${digitCnL + 1},${digitStr}`;

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

console.log(totalGearRatio);
console.log(total);
