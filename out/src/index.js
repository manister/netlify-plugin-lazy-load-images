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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSuccess = void 0;
var fs = require("fs");
var glob = require("glob");
var transformFileData_1 = require("./lib/transformFileData");
var getFileSize = require("filesize");
exports.onSuccess = function (_a) {
    var inputs = _a.inputs, constants = _a.constants, utils = _a.utils;
    return __awaiter(void 0, void 0, void 0, function () {
        var excludeFiles, excludeElements, paletteSize, transformFileDataWithCfg, files, results, grandTotal, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    excludeFiles = inputs.excludeFiles, excludeElements = inputs.excludeElements, paletteSize = inputs.paletteSize;
                    transformFileDataWithCfg = transformFileData_1.default({
                        excludeElements: excludeElements,
                        dir: constants.PUBLISH_DIR,
                        paletteSize: paletteSize,
                        replaceThreshold: parseInt(inputs.replaceThreshold)
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    files = glob.sync(constants.PUBLISH_DIR + "/**/*.html", {
                        ignore: excludeFiles.map(function (exclusion) { return exclusion.indexOf('/') === 0 ? "" + constants.PUBLISH_DIR + exclusion : exclusion; })
                    });
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, updatedFileData, updates, oldSize, newSize;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, transformFileDataWithCfg(file)];
                                    case 1:
                                        _a = _b.sent(), updatedFileData = _a.updatedFileData, updates = _a.updates;
                                        oldSize = fs.statSync(file).size;
                                        fs.writeFileSync(file, updatedFileData);
                                        newSize = fs.statSync(file).size;
                                        return [2 /*return*/, { file: file, updates: updates, difference: newSize - oldSize }];
                                }
                            });
                        }); }))];
                case 2:
                    results = _b.sent();
                    console.log('---');
                    grandTotal = results.reduce(function (grandAcca, _a) {
                        var file = _a.file, updates = _a.updates, difference = _a.difference;
                        var total = updates.reduce(function (_a, _b) {
                            var _c;
                            var total = _a.total, obj = _a.obj;
                            var url = _b.url, fileSize = _b.fileSize;
                            return ({
                                obj: __assign(__assign({}, obj), (_c = {}, _c[url] = fileSize, _c)),
                                total: obj[url] ? total : total + fileSize
                            });
                        }, { total: 0, obj: {} }).total;
                        console.log('---');
                        console.log("Inline placeholders on " + file + " have " + (difference > 0 ? 'added' : 'reduced size by') + " " + getFileSize(Math.abs(difference)));
                        console.log("Image requests on " + file + " reduced by " + getFileSize(total));
                        console.log('---');
                        return grandAcca + total;
                    }, 0);
                    console.log('---');
                    console.log("Total image requests reduced by " + getFileSize(grandTotal));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    utils.build.failPlugin('The Lazy Load plugin failed.', { error: error_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
