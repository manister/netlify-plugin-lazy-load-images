"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isAbsoluteUrl = function (url) {
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(url);
};
exports.default = isAbsoluteUrl;
