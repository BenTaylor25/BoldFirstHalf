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
    for (var _i = 0, _a = str.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        lst.push(bfhLine(line));
        console.log("'".concat(line, "'"));
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
