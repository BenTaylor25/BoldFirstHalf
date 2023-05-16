var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var p = document.getElementById('text-p');
var btn = document.querySelector('button');
var subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerText);
}
var sel = document.getSelection();
var makeBFH = function () {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
};
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', makeBFH);
function findNodeOffset(nodes, node) {
    var _a, _b, _c;
    console.log('findNodeOffset(', nodes, node, ')');
    var total = 0;
    for (var _i = 0, _d = nodes !== null && nodes !== void 0 ? nodes : []; _i < _d.length; _i++) {
        var childNode = _d[_i];
        if (childNode.nodeName === 'BR') {
            total += 1;
        }
        if (childNode === node || childNode === node.parentNode) {
            console.log('  =>', total);
            return total;
        }
        else {
            total += (_b = (_a = childNode.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }
    }
    // seems like if we get here we've got the parent <p> element
    return (_c = nodes === null || nodes === void 0 ? void 0 : nodes.length) !== null && _c !== void 0 ? _c : 0;
}
function findOffsetNode(nodes, offset) {
    var _a, _b;
    console.log('findOffsetNode(', nodes, offset, ')');
    var lengths = __spreadArray([], nodes !== null && nodes !== void 0 ? nodes : [], true).map(function (node) { var _a; return (_a = node.textContent) === null || _a === void 0 ? void 0 : _a.length; });
    var total2 = 0;
    console.log(' ...', lengths, lengths.map(function (len) { total2 += len; return total2 - len; }));
    var total = 0;
    for (var _i = 0, _c = nodes !== null && nodes !== void 0 ? nodes : []; _i < _c.length; _i++) {
        var childNode = _c[_i];
        var nodeLen = 0;
        if (childNode.nodeName === 'BR') {
            offset -= 1;
        }
        else {
            nodeLen = (_b = (_a = childNode.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }
        if (total < offset - nodeLen) {
            total += nodeLen;
        }
        else {
            console.log('  =>', childNode, offset - total);
            if (childNode.nodeName === 'STRONG') {
                return [childNode.firstChild, offset - total];
            }
            else {
                return [childNode, offset - total];
            }
        }
    }
    // if we fall off the end, make a new text node
    var node = document.createTextNode('');
    p === null || p === void 0 ? void 0 : p.appendChild(node);
    return [node, 0];
}
p === null || p === void 0 ? void 0 : p.addEventListener('keyup', function (event) {
    var node = sel === null || sel === void 0 ? void 0 : sel.anchorNode;
    var offset = findNodeOffset(p.childNodes, node) + (sel === null || sel === void 0 ? void 0 : sel.focusOffset);
    console.log();
    makeBFH();
    var _a = findOffsetNode(p.childNodes, offset), newNode = _a[0], newOffset = _a[1];
    sel === null || sel === void 0 ? void 0 : sel.collapse(newNode, newOffset);
});
function bfh(str) {
    str = processNewlines(str);
    return str.replace(/(?<!<)(\b\w+)/g, processWord); // Convert newlines to <br> tags
}
function processWord(word) {
    var firstHalf = word.substring(0, word.length / 2);
    var secondHalf = word.substring(word.length / 2);
    return "<strong>" + firstHalf + "</strong>" + secondHalf;
}
function processNewlines(str) {
    str = str.replace(/\n/g, '<br />'); // Convert newlines to <br> tags
    return str;
}
