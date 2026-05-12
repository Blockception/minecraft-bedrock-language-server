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
exports.provideReferences = provideReferences;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_vscode_words_1 = require("bc-vscode-words");
const vscode_languageserver_1 = require("vscode-languageserver");
const functions_1 = require("../../../minecraft/json/functions");
const functions_2 = require("../../../minecraft/molang/functions");
const util_1 = require("../../../util");
const Command = __importStar(require("./commands"));
const Molang = __importStar(require("./molang"));
async function provideReferences(context) {
    const { document, position } = context;
    const text = document.getText();
    const elementRange = (0, functions_1.getCurrentElement)(text, document.offsetAt(position));
    if (!elementRange)
        return undefined;
    const value = new bc_vscode_words_1.OffsetWord(text.slice(elementRange.start, elementRange.end), elementRange.start);
    const result = [];
    //Find references in document
    if ((0, functions_2.IsMolang)(value.text)) {
        //Command
        if (value.text.startsWith('/')) {
            return Command.provideReferences(context, new bc_vscode_words_1.OffsetWord(value.text.slice(1), value.offset + 1));
        }
        //Event
        else if (value.text.startsWith('@')) {
            const references = await context.database.findReferences(value.text.slice(2).trim(), [bc_minecraft_bedrock_command_1.ParameterType.event], context.token, context.workDoneProgress);
            return util_1.References.convertLocation(references, context.documents);
        }
        //Molang
        else {
            return Molang.provideReferences(context, value);
        }
    }
    else {
        ReferencesInDocument(value, document, result);
        const out = await context.database.findReference(value.text, context.documents, { defined: true, usage: true }, context.token);
        if (out) {
            result.push(...out);
        }
    }
    return result;
}
function ReferencesInDocument(value, document, receiver) {
    const text = document.getText();
    let index = value.offset;
    const start = value.offset;
    const length = value.text.length;
    const end = value.offset + length;
    while (index > -1) {
        if (index < start || index > end) {
            const range = vscode_languageserver_1.Range.create(document.positionAt(index), document.positionAt(index + length));
            receiver.push(vscode_languageserver_1.Location.create(document.uri, range));
        }
        index = text.indexOf(value.text, index + length);
    }
}
//# sourceMappingURL=json.js.map