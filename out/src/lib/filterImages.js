"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_html_parser_1 = require("node-html-parser");
var filterImages = function (images, selectorList) {
    //node-html-parser query selector doesn't understand comma seperated selectors
    var selectorArray = selectorList.split(',').map(function (str) { return str.trim(); });
    return images.filter(function (image) {
        var document = node_html_parser_1.default(''); //empty document
        document.appendChild(image);
        return selectorArray.every(function (selector) { return !document.querySelector(selector); });
    });
};
exports.default = filterImages;
