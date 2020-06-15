"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var resolveImagePath = function (rootDir, filePath, srcPath) {
    return path.join(rootDir, path.resolve(path.join('/', path.dirname(path.relative(rootDir, filePath))), srcPath));
};
exports.default = resolveImagePath;
