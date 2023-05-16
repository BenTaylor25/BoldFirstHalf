
const p = document.getElementById('text-p');
const btn = document.querySelector('button');

const subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerText);
}

const sel = document.getSelection();

const makeBFH = () => {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
};

btn?.addEventListener('click', makeBFH);

function findNodeOffset(nodes: NodeListOf<Node> | undefined, node: Node): number {
    console.log('findNodeOffset(', nodes, node, ')');
    let total = 0;
    for (const childNode of nodes ?? []) {
        if (childNode.nodeName === 'BR') {
            total += 1;
        }
        if (childNode === node || childNode === node.parentNode) {
            console.log('  =>', total);
            return total;
        } else {
            total += childNode.textContent?.length ?? 0;
        }
    }
    // seems like if we get here we've got the parent <p> element
    return nodes?.length ?? 0;
}

function findOffsetNode(nodes: NodeListOf<ChildNode> | undefined, offset: number): [Node, number] {
    console.log('findOffsetNode(', nodes, offset, ')');
    let lengths = [...nodes ?? []].map((node) => node.textContent?.length!);
    let total2 = 0;
    console.log(' ...', lengths, lengths.map((len) => {total2 += len; return total2 - len;}));
    let total = 0;
    for (const childNode of nodes ?? []) {
        let nodeLen = 0;
        if (childNode.nodeName === 'BR') {
            offset -= 1;
        } else {
            nodeLen = childNode.textContent?.length ?? 0;
        }
        if (total < offset - nodeLen) {
            total += nodeLen;
        } else {
            console.log('  =>', childNode, offset - total);
            if (childNode.nodeName === 'STRONG') {
                return [childNode.firstChild!, offset - total];
            } else {
                return [childNode, offset - total];
            }
        }
    }
    // if we fall off the end, make a new text node
    let node = document.createTextNode('');
    p?.appendChild(node);
    return [node, 0];
}

p?.addEventListener('keyup', (event) => {
    const node = sel?.anchorNode!;
    const offset = findNodeOffset(p!.childNodes, node) + sel?.focusOffset!;
    console.log();
    makeBFH();
    const [newNode, newOffset] = findOffsetNode(p!.childNodes, offset);
    sel?.collapse(newNode, newOffset);
});


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
