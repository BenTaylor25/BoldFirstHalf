
const p = document.getElementById('text-p');
const btn = document.querySelector('button');

const subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerText);
}

const makeBFH = () => {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
};

btn?.addEventListener('click', makeBFH);

// not working
// p?.addEventListener('keyup', makeBFH);


function bfh(str: string): string {
    str = processNewlines(str);
    return str.replace(/(?<!<)(\b\w+)/g, processWord); // Convert newlines to <br> tags
}

function processWord(word: string): string {
    const firstHalf = word.substring(0, word.length / 2);
    const secondHalf = word.substring(word.length / 2);
    return `<strong>${firstHalf}</strong>${secondHalf}`;
}

function processNewlines(str: string): string {
    str = str.replace(/\n/g, '<br />'); // Convert newlines to <br> tags
    return str;
}
