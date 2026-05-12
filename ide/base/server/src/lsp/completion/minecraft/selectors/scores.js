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
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../../../../util");
const Objectives = __importStar(require("../../general/objectives"));
function provideCompletion(context, selector, pos) {
    const charBefore = util_1.Offset.charAt(selector, pos - 1);
    if (charBefore === '{') {
        return Objectives.provideCompletion(context);
    }
    if (util_1.Offset.isWithin(selector, pos) || charBefore === '=') {
        return provideRange(context);
    }
    return Objectives.provideCompletion(context);
}
function provideRange(context) {
    const builder = context.builder.withDefaults({ kind: vscode_languageserver_1.CompletionItemKind.Value });
    builder.add({ label: '0', documentation: 'test for the exact value of 0' });
    builder.add({
        label: '!0',
        documentation: 'test for the exact value of everything but 0',
    });
    builder.add({
        label: '0..',
        documentation: 'test for the everything equal to 0 or higher',
    });
    builder.add({
        label: '..0',
        documentation: 'test for the everything equal to 0 or lower',
    });
    builder.add({
        label: '0..10',
        documentation: 'test for the everything equal to 0 or 10 and everything in between',
    });
    builder.add({
        label: '!0..10',
        documentation: 'test for the everything not equal to 0 or 10 and everything in between',
    });
}
//# sourceMappingURL=scores.js.map