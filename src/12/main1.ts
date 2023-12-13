const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

function generateBinaryPermutations(length: number) {
  const permutations: ('.'|'#')[][] = [];

  function generateHelper(currentPermutation: ('.'|'#')[]) {
    if (currentPermutation.length === length) {
      permutations.push(currentPermutation.slice()); // Make a copy of the permutation
      return;
    }

    // Try adding 0 and 1 to the current permutation
    currentPermutation.push('.');
    generateHelper(currentPermutation);
    currentPermutation.pop();

    currentPermutation.push('#');
    generateHelper(currentPermutation);
    currentPermutation.pop();
  }

  generateHelper([]);
  return permutations;
}

let totalValidArrangements = 0;

lines.forEach(line => {
    const sprintConditions = line.split(' ');
    const sConditions = sprintConditions[0].split('');
    const dSprings = sprintConditions[1].split(',');

    const totalQuestions = sConditions.filter(v => v === '?').length;
    const conditionRegEx = new RegExp('\^' + dSprings.map((s, i) => {
        return s === ',' ? '' : `[\^#]*${i === 0 ? '' : '[.]'}[\^#]*[#]{${s}}`;
    }).join('') + '[\^#]*$', 'i')

    generateBinaryPermutations(totalQuestions).forEach(permutations => {
        let index = -1;
        const conditionStr = sConditions.map(v => {
            if (v === '?') {
                index++;
                return permutations[index];
            }
            return v;
        }).join('');

        if (conditionRegEx.test(conditionStr)) {
            totalValidArrangements++;
        }
    });
});

console.log(totalValidArrangements);
