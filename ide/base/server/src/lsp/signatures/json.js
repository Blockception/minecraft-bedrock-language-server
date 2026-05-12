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
exports.provideJsonSignature = provideJsonSignature;
const functions_1 = require("../../minecraft/json/functions");
const functions_2 = require("../../minecraft/molang/functions");
const Commands = __importStar(require("./minecraft/commands"));
const Molang = __importStar(require("./minecraft/molang/main"));
function provideJsonSignature(doc, cursor) {
    const text = doc.getText();
    const cpos = doc.offsetAt(cursor);
    const range = (0, functions_1.getCurrentString)(text, cpos);
    if (!range)
        return;
    let property = text.substring(range.start, range.end);
    if ((0, functions_2.IsMolang)(property)) {
        if (property.startsWith('/')) {
            //On command
            property = property.substring(1);
            range.start++;
            return Commands.provideSignature(property, range.start, cpos, doc);
        }
        else if (property.startsWith('@s')) {
            //On event
            return MolangEventSignature;
        }
        else {
            //On other molang
            return Molang.provideSignature({ text: property, offset: range.start }, cpos);
        }
    }
    return undefined;
}
const MolangEventSignature = {
    activeParameter: 1,
    activeSignature: 0,
    signatures: [
        {
            label: 'Molang Event',
            activeParameter: 1,
            documentation: 'A molang event to launch on the entity',
            parameters: [
                { label: '@s', documentation: 'The selector aim at' },
                { label: '< event >', documentation: 'The event to launch' },
            ],
        },
    ],
};
//# sourceMappingURL=json.js.map