"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var imageUrlToPlaceholder_1 = require("./imageUrlToPlaceholder");
var transformImageUrl_1 = require("./transformImageUrl");
var srcset = require("srcset");
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var isAbsoluteUrl_1 = require("./isAbsoluteUrl");
var getRemoteFileSize = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var res, size;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default(url, { method: 'HEAD' })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.headers.get('content-length')];
            case 2:
                size = _a.sent();
                return [2 /*return*/, parseInt(size)];
        }
    });
}); };
var getFileSize = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                if (!isAbsoluteUrl_1.default(url)) return [3 /*break*/, 2];
                return [4 /*yield*/, getRemoteFileSize(url)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = fs.statSync(url).size;
                _b.label = 3;
            case 3: return [2 /*return*/, _a];
            case 4:
                e_1 = _b.sent();
                console.warn("Could't get file size for " + url);
                return [2 /*return*/, 0];
            case 5: return [2 /*return*/];
        }
    });
}); };
var manipulateImage = function (image, _a) {
    var dir = _a.dir, paletteSize = _a.paletteSize, filePath = _a.filePath, replaceThreshold = _a.replaceThreshold;
    return __awaiter(void 0, void 0, void 0, function () {
        var imgSrc, imgSrcset, transformedImgSrc, imgFileSize, _b, updatedSrc, _c, imgSrcsetParsed, imgSrscetParsedUrlsTransformed, updatedImgSrcsetParsed, _d, updatedImgSrcset, ret;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    imgSrc = image.getAttribute('src');
                    imgSrcset = image.getAttribute('srcset');
                    transformedImgSrc = imgSrc ? transformImageUrl_1.default(imgSrc, dir, filePath) : null;
                    if (!transformedImgSrc) return [3 /*break*/, 2];
                    return [4 /*yield*/, getFileSize(transformedImgSrc)];
                case 1:
                    _b = _e.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b = 0;
                    _e.label = 3;
                case 3:
                    imgFileSize = _b;
                    if (!(transformedImgSrc && imgFileSize > replaceThreshold)) return [3 /*break*/, 5];
                    return [4 /*yield*/, imageUrlToPlaceholder_1.default(transformedImgSrc, paletteSize)];
                case 4:
                    _c = _e.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _c = null;
                    _e.label = 6;
                case 6:
                    updatedSrc = _c;
                    if (updatedSrc) {
                        image.setAttribute('src', updatedSrc);
                        image.setAttribute('data-lazy-src', imgSrc);
                    }
                    imgSrcsetParsed = imgSrcset ? srcset.parse(imgSrcset) : [];
                    return [4 /*yield*/, Promise.all(imgSrcsetParsed.map(function (srcsetObj) { return __awaiter(void 0, void 0, void 0, function () {
                            var url, fileSize;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        url = transformImageUrl_1.default(srcsetObj.url, dir, filePath);
                                        return [4 /*yield*/, getFileSize(url)];
                                    case 1:
                                        fileSize = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, srcsetObj), { url: url,
                                                fileSize: fileSize })];
                                }
                            });
                        }); }))];
                case 7:
                    imgSrscetParsedUrlsTransformed = _e.sent();
                    if (!(imgSrscetParsedUrlsTransformed.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Promise.all(imgSrscetParsedUrlsTransformed.map(function (srcsetObj) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _a = [__assign({}, srcsetObj)];
                                        _b = {};
                                        if (!(srcsetObj.fileSize > replaceThreshold)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, imageUrlToPlaceholder_1.default(srcsetObj.url, paletteSize)];
                                    case 1:
                                        _c = _d.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _c = srcsetObj.url;
                                        _d.label = 3;
                                    case 3: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.url = _c, _b)])))];
                                }
                            });
                        }); }))];
                case 8:
                    _d = _e.sent();
                    return [3 /*break*/, 10];
                case 9:
                    _d = [];
                    _e.label = 10;
                case 10:
                    updatedImgSrcsetParsed = _d;
                    updatedImgSrcset = updatedImgSrcsetParsed.length > 0 &&
                        updatedImgSrcsetParsed.every(function (_a) {
                            var url = _a.url;
                            return url.length > 1;
                        })
                        ? srcset.stringify(updatedImgSrcsetParsed)
                        : null;
                    if (updatedImgSrcset) {
                        image.setAttribute('srcset', updatedImgSrcset);
                        image.setAttribute('data-lazy-srcset', imgSrcset);
                    }
                    ret = __spreadArrays([
                        transformedImgSrc && updatedSrc && imgFileSize ? { url: transformedImgSrc, fileSize: imgFileSize } : null
                    ], (imgSrscetParsedUrlsTransformed && updatedImgSrcset ? imgSrscetParsedUrlsTransformed.map(function (_a) {
                        var url = _a.url, fileSize = _a.fileSize;
                        url, fileSize;
                    }) : []));
                    return [2 /*return*/, ret.filter(function (item) { return item; })];
            }
        });
    });
};
exports.default = manipulateImage;
