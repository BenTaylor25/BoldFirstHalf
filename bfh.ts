
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

    for (const line of str.split('\n')) {
        lst.push(bfhLine(line));

        console.log(`'${line}'`);
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
