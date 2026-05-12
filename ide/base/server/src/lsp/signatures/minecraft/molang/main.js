"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideDocSignature = provideDocSignature;
exports.provideSignature = provideSignature;
exports.provideWordSignature = provideWordSignature;
const words_1 = require("../../../../minecraft/molang/words");
const Contexts = __importStar(require("./contexts"));
const Geometry = __importStar(require("./geometries"));
const Material = __importStar(require("./materials"));
const Math = __importStar(require("./math"));
const Query = __importStar(require("./queries"));
const Temps = __importStar(require("./temps"));
const Textures = __importStar(require("./textures"));
const Variables = __importStar(require("./variables"));
/**
 *
 * @param doc
 * @param cursor
 * @returns
 */
function provideDocSignature(doc, cursor) {
    const text = doc.getText();
    const w = { offset: 0, text: text };
    const cpos = doc.offsetAt(cursor);
    return provideSignature(w, cpos);
}
/**
 *
 * @param text
 * @param cursor
 * @param doc
 * @returns
 */
function provideSignature(text, cursor) {
    const words = (0, words_1.CreateMolangSetWords)(text.text, text.offset);
    let lastIndex = words.length - 1;
    for (; lastIndex >= 0; lastIndex--) {
        const r = provideWordSignature(words[lastIndex], cursor, words.slice(lastIndex + 1) ?? []);
        if (r)
            return r;
    }
    return undefined;
}
/**
 *
 * @param text
 * @returns
 */
function provideWordSignature(text, cursor, parameters) {
    const index = text.text.indexOf('.');
    let main;
    let sub;
    if (index === -1) {
        main = text.text;
    }
    else {
        main = text.text.substring(0, index);
        sub = text.text.substring(index + 1);
    }
    switch (main) {
        case 'c':
        case 'contexts':
            return Contexts.provideSignature(sub);
        case 'q':
        case 'query':
            return Query.provideSignature(sub, cursor, parameters);
        case 'm':
        case 'math':
            return Math.provideSignature(sub, cursor, parameters);
        case 'geometry':
            return Geometry.provideSignature();
        case 'material':
            return Material.provideSignature();
        case 'v':
        case 'variable':
            return Variables.provideSignature(sub);
        case 't':
        case 'texture':
            return Textures.provideSignature(sub);
        case 'temp':
            return Temps.provideSignature(sub);
    }
    return undefined;
}
//# sourceMappingURL=main.js.map