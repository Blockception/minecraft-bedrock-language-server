"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentWord = getCurrentWord;
const bc_vscode_words_1 = require("bc-vscode-words");
const util_1 = require("../../util");
function getCurrentWord(document, cursor) {
    let startIndex = cursor;
    const text = document.getText();
    for (; startIndex > 0; startIndex--) {
        if (!wordCharacter(text, startIndex)) {
            startIndex++;
            break;
        }
    }
    let endIndex = startIndex;
    for (; endIndex < text.length; endIndex++) {
        if (!wordCharacter(text, endIndex)) {
            break;
        }
    }
    const s = text.slice(startIndex, endIndex);
    return new bc_vscode_words_1.OffsetWord(s, startIndex);
}
function wordCharacter(text, index) {
    const c = text.charCodeAt(index);
    if (util_1.Character.IsLetterCode(c) || util_1.Character.IsNumberCode(c)) {
        return true;
    }
    if (c === util_1.Character.Character_underscore || c === util_1.Character.Character_dash || c === util_1.Character.Character_column) {
        return true;
    }
    return false;
}
//# sourceMappingURL=function.js.map