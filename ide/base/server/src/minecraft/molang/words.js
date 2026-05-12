"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMolangWords = CreateMolangWords;
exports.CreateMolangSetWords = CreateMolangSetWords;
const bc_vscode_words_1 = require("bc-vscode-words");
const MolangWordsRegexp = /(['"][^'"]+['"]|[A-Za-z_]+|[/.!+\-*&[]{}()><=:;?|]+|@[a-z]|[0-9.]+)/gi;
const MolangSetWordsRegexp = /([a-zA-Z]+\.([A-Za-z_]*))/gi;
/**
 *
 * @param text
 * @param offset
 * @returns
 */
function CreateMolangWords(text, offset) {
    return bc_vscode_words_1.OffsetWord.Parse(text, MolangWordsRegexp, offset);
}
/**
 *
 * @param text
 * @param offset
 * @returns
 */
function CreateMolangSetWords(text, offset) {
    return bc_vscode_words_1.OffsetWord.Parse(text, MolangSetWordsRegexp, offset);
}
//# sourceMappingURL=words.js.map