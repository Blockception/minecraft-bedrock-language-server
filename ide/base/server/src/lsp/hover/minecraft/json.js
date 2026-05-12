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
exports.provideHover = provideHover;
const vscode_languageserver_1 = require("vscode-languageserver");
const functions_1 = require("../../../minecraft/json/functions");
const functions_2 = require("../../../minecraft/molang/functions");
const Molang = __importStar(require("./molang"));
function provideHover(context) {
    const { document, params, database } = context;
    const cursor = document.offsetAt(params.position);
    const text = document.getText();
    const range = (0, functions_1.getCurrentString)(text, cursor);
    //If start has not been found or not a property
    if (range === undefined)
        return;
    //Prepare data to be fixed for json
    const currentText = text.substring(range.start, range.end);
    const R = vscode_languageserver_1.Range.create(params.position, {
        character: params.position.character + currentText.length,
        line: params.position.line,
    });
    if ((0, functions_2.IsMolang)(currentText)) {
        return Molang.provideHoverAt(context, currentText, range, cursor);
    }
    //Check project data
    const reference = database.ProjectData.find((item) => item.id === currentText);
    if (reference?.documentation) {
        return {
            contents: { kind: 'markdown', value: reference.documentation, language: 'en-gb' },
            range: R,
        };
    }
    return undefined;
}
//# sourceMappingURL=json.js.map