var p = document.getElementById('text-p');
var btn = document.querySelector('button');
var subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerHTML);
}
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
    if (p) {
        p.innerHTML = bfh(p === null || p === void 0 ? void 0 : p.innerHTML);
    }
});
function bfh(str) {
    var lst = stripTags(str).split(' ');
    for (var i = 0; i < lst.length; i++) {
        var strLen = lst[i].length;
        var firstHalf = lst[i].substring(0, strLen / 2);
        var secondHalf = lst[i].substring(strLen / 2);
        lst[i] = "<b>".concat(firstHalf, "</b>").concat(secondHalf);
    }
    return lst.join(' ');
}
function stripTags(str) {
    var noTags = [];
    var accept = true;
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
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
