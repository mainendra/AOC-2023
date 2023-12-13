const input = await Deno.readTextFile("input.txt");
const lines = input.trim().split('\n');

// e.g. .??..??...?##. 1,1,3

const cache: Record<string, number> = {};

function count(configs: string, nums: number[]) {
    const key = `${configs}-${nums}`;
    if (cache[key]) {
        return cache[key];
    }

    if (configs.length === 0) {
        return nums.length === 0 ? 1 : 0;
    }

    if (nums.length === 0) {
        if (configs.includes('#')) return 0;
        return 1;
    }

    let result = 0;

    if (['.', '?'].includes(configs[0])) {
        result += count(configs.slice(1), nums.slice());
    }

    if (['#', '?'].includes(configs[0])) {
        // if (nums[0] === 1) {
        //     if (configs.length === 1 || ['.', '?'].includes(configs[1])) {
        //         result += count(configs.slice(2), nums.slice(1));
        //     }
        // } else {
        //     result += count(configs.slice(1), [nums[0] - 1, ...nums.slice(1)]);
        // }
        // if (nums[0] <= configs.length && !configs.slice(0, nums[0]).includes('.') && (nums[0] === configs.length || configs[nums[0]] !== '#')) {
        // if nums[0] <= len(cfg) and "." not in cfg[:nums[0]] and (nums[0] == len(cfg) or cfg[nums[0]] != "#"):
        if (nums[0] <= configs.length && !configs.slice(0, nums[0]).includes('.') && (nums[0] === configs.length || configs[nums[0]] !== '#')) {
            result += count(configs.slice(nums[0] + 1), nums.slice(1));
        }
    }

    cache[key] = result;

    return result;
}

let total = 0;

lines.forEach(line => {
    const values = line.split(' ');
    const configs = values[0];
    const nums = values[1].split(',').map(v => +v);

    const result = count(`${configs}?${configs}?${configs}?${configs}?${configs}`, [...nums, ...nums, ...nums, ...nums, ...nums]);

    // console.log(line, result);

    total += result;
})

console.log(total);
