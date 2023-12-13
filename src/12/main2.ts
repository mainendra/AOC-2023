const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

function countBinaryPermutationsWithOnes(length: number, x: number) {
  let count = 0;

  function countHelper(currentLength: number, remainingOnes: number) {
    if (currentLength === length) {
      if (remainingOnes === 0) {
        count++;
      }
      return;
    }

    // Try adding 0 and 1 to the current permutation
    countHelper(currentLength + 1, remainingOnes);

    if (remainingOnes > 0) {
      countHelper(currentLength + 1, remainingOnes - 1);
    }
  }

  countHelper(0, x);
  return count;
}

let totalValidArrangements = 0;

// lines.forEach(line => {
//     const sprintConditions = line.split(' ');
//     const sConditions = sprintConditions[0];
//     const dSprings = sprintConditions[1].split(',').map(s => +s);
//
//     const conditionRegEx = new RegExp(dSprings.map((s, i) => {
//         if (i === 0) {
//             return `\\.*([#\?]{${s}})`;
//         }
//
//         return `(.*)[\.\?](.*)([#\?]{${s}})`;
//     }).join('') + '\\.*', 'i');
//
//     console.log(conditionRegEx);
//
//     const match = sConditions.match(conditionRegEx)?.slice(1);
//     if (match) {
//         const result: string[] = [match[0] + match[1]];
//         for (let i = 3; i < match.length; i += 3) {
//             result.push(match[i] + (match[i + 1] ?? '') + (match[i + 2] ?? ''));
//         }
//
//         console.log(dSprings.join(' , '));
//         console.log(sConditions);
//         console.log(result.join(' , '));
//
//         let count = 1;
//
//         dSprings.forEach((d, i) => {
//             const totalHash = result[i].split('').filter(ch => ch === '#').length;
//             const totalQuestion = result[i].split('').filter(ch => ch === '?').length;
//
//             const totalPermutations = countBinaryPermutationsWithOnes(totalQuestion, (d - totalHash))
//
//             console.log(totalQuestion, (d - totalHash), totalPermutations);
//
//             count *= totalPermutations;
//         });
//
//         console.log(count);
//
//         totalValidArrangements += count;
//     }
//
// });

// lines.forEach(line => {
[lines[1]].forEach(line => {
    const sprintConditions = line.split(' ');
    const sConditions = sprintConditions[0];
    const dSprings = sprintConditions[1].split(',').map(s => +s);

    let nextIndex = 0;

    console.log('-------------------------', sConditions, dSprings.join(' , '));

    let count = 1;

    dSprings.forEach(d => {
        let damagedSprings = d;
        let foundDamagedSpring = false;
        let foundOperationalSpring = false;
        let subCondition = '';
        while(!foundDamagedSpring || !foundOperationalSpring) {
            const ch = sConditions[nextIndex];
            if (!foundDamagedSpring && (ch === '?' || ch === '#')) {
                damagedSprings--;
                foundDamagedSpring = damagedSprings === 0;
            } else if (foundDamagedSpring && !foundOperationalSpring && (ch === '?' || ch === '.')) {
                foundOperationalSpring = true;
            }

            if (nextIndex === sConditions.length - 1) {
                foundOperationalSpring = true;
            }

            subCondition += ch;

            nextIndex++;
        };

        console.log(subCondition);

        const totalHash = subCondition.split('').filter(ch => ch === '#').length;
        const totalQuestion = subCondition.split('').filter(ch => ch === '?').length;

        const totalPermutations = countBinaryPermutationsWithOnes(totalQuestion, (d - totalHash - (subCondition.endsWith('.') ? 0 : 1))) || 1;

        console.log(totalQuestion, (d - totalHash), totalPermutations);

        count *= totalPermutations;
    });

    console.log(count);

    totalValidArrangements += count;
});


console.log(totalValidArrangements);
