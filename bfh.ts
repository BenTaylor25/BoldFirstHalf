
const p = document.getElementById('text-p');
const btn = document.querySelector('button');

const subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerHTML);
}

btn?.addEventListener('click', () => {
    if (p) {
        p.innerHTML = bfh(p?.innerHTML);
    }
});

function bfh(str: string): string {
    const lst = stripTags(str).split(' ');

    for (let i = 0; i < lst.length; i++) {
        const strLen = lst[i].length;
        const firstHalf = lst[i].substring(0, strLen/2);
        const secondHalf = lst[i].substring(strLen/2);

        lst[i] = `<b>${firstHalf}</b>${secondHalf}`;
    }

    return lst.join(' ');
}

function stripTags(str: string): string {
    let noTags: string[] = [];

    let accept = true;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char == '<') {
            accept = false;
        } 
        else if (char == '>') {
            accept = true;
        }
        else {
            if (accept) {
                noTags.push(char);
            }
        }
    }

    return noTags.join('');
}
