const input = await Deno.readTextFile("input.txt");
const lines = input.split('\n');

interface dirType {
    name: string,
    size: number,
    children: dirType[]
}

const dirRegEx = /dir\s(.*)/i;
const fileRegEx = /(\d+)\s(.*)/i;
const cdNameRegEx = /\$\scd\s(.*)/i;

let index = 0;

let totalSize = 0;

interface miniDir {
    name: string,
    size: number
}
const dirs: miniDir[] = [];

function getContent() {
    const content: dirType = {
        name: '',
        size: 0,
        children: []
    };

    // first line cd and next line ls
    content.name = lines[index].match(cdNameRegEx)?.[1] ?? 'noname';
    index += 2;

    let totalChildren = 0;

    while(lines[index] && !cdNameRegEx.test(lines[index])) {
        if (dirRegEx.test(lines[index])) {
            totalChildren++;
        } else if (fileRegEx.test(lines[index])) {
            content.size += +(lines[index].match(fileRegEx)?.[1] ?? '0');
        }
        index++;
    }

    // ignore back navigation
    while(lines[index].trim() === '$ cd ..') {
        index++;
    }

    for (let i = 0; i < totalChildren; i++) {
        const chidContent = getContent();
        content.children.push(chidContent);
        content.size += chidContent.size;
    }

    if (content.size <= 100000) {
        totalSize += content.size;
    }

    dirs.push({ name: content.name, size: content.size });

    return content;
}
const fs = getContent();

console.log(JSON.stringify(fs, null, 2));

console.log(`Total size: ${totalSize}`);

dirs.sort((a, b) => (a.size - b.size));
console.log(dirs[0]);
console.log(dirs[dirs.length - 1]);
const minSize = (30000000 - 70000000 + fs.size);
console.log(dirs.find(dir => dir.size >= minSize));
