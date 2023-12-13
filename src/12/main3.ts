const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

let cache: Record<string, number> = {};

function count(configs: string, nums: number[]) {
    if (configs.length === 0) {
        if (nums.length === 0) {
            return 1;
        }
        return 0;
    }

    if (nums.length === 0) {
        if (configs.includes('#')) {
            return 0;
        }
        return 1;
    }

    const key = configs + nums.join(',');
    if (cache[key]) {
        return cache[key];
    }

    let result = 0;

    if (['.', '?'].includes(configs[0])) {
        result += count(configs.slice(1), nums);
    }

    if (['#', '?'].includes(configs[0])) {
        if (nums[0] <= configs.length && !configs.slice(0, nums[0]).includes('.') && (nums[0] === configs.length || configs[nums[0]] !== '#')) {
            result += count(configs.slice(nums[0] + 1), nums.slice(1));
        }
    }

    cache[key] = result;

    return result;
}

let total = 0;;

lines.forEach((line) => {
    const configNum = line.split(' ');
    const configs = configNum[0];
    const nums = configNum[1].split(',').map(v => +v);

    // configs = configs + '?' + configs + '?' + configs + '?' + configs + '?' + configs;
    // nums = [...nums, ...nums, ...nums, ...nums, ...nums];

    cache = {};

    total += count(configs, nums);
});

console.log(total);
