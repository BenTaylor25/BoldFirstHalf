var p = document.getElementById('text-p');
var btn = document.querySelector('button');
var subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerHTML);
}
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
});
function bfh(str) {
    var lst = [];
    for (var _i = 0, _a = removeDoubleNewlines(str.split('\n')); _i < _a.length; _i++) {
        var line = _a[_i];
        var bfh_1 = bfhLine(line);
        lst.push(bfh_1);
    }
    return lst.join('<br />');
}
function bfhLine(str) {
    var lst = str.split(' ');
    for (var i = 0; i < lst.length; i++) {
        var strLen = lst[i].length;
        var firstHalf = lst[i].substring(0, strLen / 2);
        var secondHalf = lst[i].substring(strLen / 2);
        if (strLen > 0) {
            lst[i] = "<b>".concat(firstHalf, "</b>").concat(secondHalf);
        }
    }
    return lst.join(' ');
}
// Crude but effective.
function removeDoubleNewlines(lines) {
    var fixedLines = [];
    for (var i = 0; i < lines.length; i++) {
        fixedLines.push(lines[i]);
        if (lines[i] === '' && i < lines.length - 1 && lines[i + 1] === '') {
            i++;
        }
    }
    return fixedLines;
}
