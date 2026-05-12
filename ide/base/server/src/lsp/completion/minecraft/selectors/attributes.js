"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.GetCurrentAttribute = GetCurrentAttribute;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const vscode_languageserver_1 = require("vscode-languageserver");
const modes_1 = require("../modes/modes");
//Doesnt do scores and doesnt need to
function provideCompletion(context) {
    (0, modes_1.provideModeCompletion)(bc_minecraft_bedrock_types_1.Modes.SelectorAttribute, context, vscode_languageserver_1.CompletionItemKind.Property);
}
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
function GetCurrentAttribute(selector, pos) {
    let StartIndex = pos - selector.offset;
    while (StartIndex > 2) {
        const character = selector.text.charAt(StartIndex);
        if (character === ',' || character === '{') {
            break;
        }
        StartIndex--;
    }
    StartIndex++;
    let EndIndex = selector.text.indexOf('=', StartIndex);
    if (EndIndex < 0)
        EndIndex = selector.text.length;
    return selector.text.slice(StartIndex, EndIndex).trim();
}
//# sourceMappingURL=attributes.js.map