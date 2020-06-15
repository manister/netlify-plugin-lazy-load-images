"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_html_parser_1 = require("node-html-parser");
var fs = require("fs");
var filterImages_1 = require("./filterImages");
var manipulateImage_1 = require("./manipulateImage");
var lazyLoadClientScript_json_1 = require("../../client/lazyLoadClientScript.json");
var scriptToInject = node_html_parser_1.parse("<script type=\"text/javascript\">" + lazyLoadClientScript_json_1.script + "</script>", { script: true });
var parseHTML = function (html) { return node_html_parser_1.parse(html, {
    script: true,
    style: true,
    pre: true,
    comment: true
}); };
var transformFileData = function (_a) {
    var excludeElements = _a.excludeElements, dir = _a.dir, paletteSize = _a.paletteSize, replaceThreshold = _a.replaceThreshold;
    return function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
        var fileData, fileDataString, document, images, filteredImages, updates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileData = fs.readFileSync(filePath);
                    fileDataString = fileData.toString();
                    document = parseHTML(fileDataString);
                    images = document.querySelectorAll('img, source');
                    filteredImages = filterImages_1.default(images, excludeElements);
                    return [4 /*yield*/, Promise.all(__spreadArrays(filteredImages).map(function (image) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, manipulateImage_1.default(image, { dir: dir, filePath: filePath, paletteSize: paletteSize, replaceThreshold: replaceThreshold })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 1:
                    updates = _a.sent();
                    document.appendChild(scriptToInject);
                    return [2 /*return*/, {
                            updatedFileData: document.toString(),
                            updates: updates.flat()
                        }];
            }
        });
    }); };
};
exports.default = transformFileData;
