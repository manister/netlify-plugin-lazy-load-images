"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveImagePath_1 = require("./resolveImagePath");
var isAbsoluteUrl_1 = require("./isAbsoluteUrl");
var transformImageUrl = function (imageUrl, dir, filePath) { return isAbsoluteUrl_1.default(imageUrl) ? imageUrl : resolveImagePath_1.default(dir, filePath, imageUrl); };
exports.default = transformImageUrl;
