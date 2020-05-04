// ==UserScript==
// @name         Market Item Value Calculator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Lemons
// @match        *://krunker.io/social.html*
// @run-at       document-start
// @grant        none
// ==/UserScript==

var krValue = (
    300 / 0.99 +
    600 / 1.79 +
    2600 / 2.49 +
    7000 / 15.99 +
    20000 / 34.99 +
    60000 / 99.99
) / 6; // Average of all KR purchases

var fixedValue = +krValue.toFixed(2);

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            var c = node.children;
            if (c && c[2] && c[2].className === 'marketPrice') {
                var elem = c[2];
                var num = elem.innerText.replace(/[^0-9]/g, '');
                var value = (+(num / fixedValue).toFixed(2)).toLocaleString();
                node.attributes.style.value += ';height:252px';
                node.insertAdjacentHTML('beforeend', `<div style="margin-top:37px;" class="marketPrice">$${value}<span style="color:#fff"> USD</span></div>`);
            }
        });
    });
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
