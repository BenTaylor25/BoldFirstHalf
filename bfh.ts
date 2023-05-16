
const p = document.getElementById('text-p');
const btn = document.querySelector('button');

const subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerHTML);
}

btn?.addEventListener('click', () => {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
});

function bfh(str: string): string {
    const lst: string[] = [];

    for (const line of removeDoubleNewlines(str.split('\n'))) {
        const bfh = bfhLine(line);

        lst.push(bfh);
    }

    return lst.join('<br />');
}

function bfhLine(str: string): string {
    const lst = str.split(' ');

    for (let i = 0; i < lst.length; i++) {
        const strLen = lst[i].length;
        const firstHalf = lst[i].substring(0, strLen/2);
        const secondHalf = lst[i].substring(strLen/2);

        if (strLen > 0) {
            lst[i] = `<b>${firstHalf}</b>${secondHalf}`;
        }
    }

    return lst.join(' ');
}


// Crude but effective.
function removeDoubleNewlines(lines: string[]): string[] {
    const fixedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        fixedLines.push(lines[i]);

        if (lines[i] === '' && i < lines.length-1 && lines[i+1] === '') {
            i++;
        }
    }

    return fixedLines;
}
