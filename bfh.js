var p = document.getElementById('text-p');
var btn = document.querySelector('button');
var subheading = document.getElementById('subheading');
if (subheading) {
    subheading.innerHTML = bfh(subheading.innerText);
}
var makeBFH = function () {
    if (p) {
        p.innerHTML = bfh(p.innerText);
    }
};
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', makeBFH);
// not working
// p?.addEventListener('keyup', makeBFH);
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
