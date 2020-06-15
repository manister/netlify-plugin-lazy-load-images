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
Object.defineProperty(exports, "__esModule", { value: true });
var imagemin = require("imagemin");
var imagemin_pngquant_1 = require("imagemin-pngquant");
var canvas_1 = require("canvas");
var colorthief_1 = require("colorthief");
var rgbToHex = function (r, g, b) { return '#' + [r, g, b].map(function (x) {
    var hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}).join(''); };
var getColours = function (url, count) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                if (!(count > 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, colorthief_1.default.getPalette(url, count)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, colorthief_1.default.getColor(url)];
            case 3:
                _a = [_b.sent()];
                _b.label = 4;
            case 4:
                colours = _a;
                return [2 /*return*/, colours.map(function (colour) { return rgbToHex.apply(void 0, colour); })];
            case 5:
                e_1 = _b.sent();
                return [2 /*return*/, []];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getPlaceHolder = function (imageURL, _a) {
    var paletteSize = _a.paletteSize;
    return __awaiter(void 0, void 0, void 0, function () {
        var image, colours, _b, h, w, canvas, ctx, rectH, shrank;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, canvas_1.loadImage(imageURL)];
                case 1:
                    image = _c.sent();
                    return [4 /*yield*/, getColours(imageURL, paletteSize)];
                case 2:
                    colours = _c.sent();
                    _b = [image.height, image.width], h = _b[0], w = _b[1];
                    canvas = canvas_1.createCanvas(w, h);
                    ctx = canvas.getContext("2d");
                    rectH = h / colours.length;
                    colours.forEach(function (colour, index) {
                        ctx.fillStyle = colour;
                        ctx.fillRect(0, index * rectH, w, rectH);
                    });
                    return [4 /*yield*/, imagemin.buffer(canvas.toBuffer("image/png"), {
                            plugins: [
                                imagemin_pngquant_1.default()
                            ]
                        })];
                case 3:
                    shrank = _c.sent();
                    return [2 /*return*/, 'data:image/png;base64,' + shrank.toString('base64')];
            }
        });
    });
};
exports.default = getPlaceHolder;
