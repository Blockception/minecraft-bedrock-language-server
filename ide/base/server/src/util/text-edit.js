"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replace = Replace;
exports.TrimStartFromLine = TrimStartFromLine;
exports.TrimEndFromLine = TrimEndFromLine;
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 *
 * @param line
 * @param oldText
 * @param newText
 * @param lineIndex
 * @param receiver
 */
function Replace(line, oldText, newText, lineIndex, receiver) {
    let index = line.indexOf(oldText);
    while (index > -1) {
        const range = vscode_languageserver_1.Range.create(lineIndex, index, lineIndex, index + oldText.length);
        receiver.push(vscode_languageserver_1.TextEdit.replace(range, newText));
        index = line.indexOf(oldText, index + 1);
    }
}
/**
 * Loop through starting character to filters out empty characters and slashes
 * @param line The line to edit
 * @param index The index of the line
 * @param receiver
 * @param toRemove
 */
function TrimStartFromLine(line, index, receiver, toRemove) {
    const text = line;
    const lineIndex = index;
    let startindex = 0;
    let loop = true;
    while (loop) {
        loop = false;
        toRemove.forEach((x) => {
            if (x == text.substring(startindex, startindex + x.length)) {
                loop = true;
                startindex += x.length;
            }
        });
    }
    //If any unwanted character are found, remove them
    if (startindex > 0) {
        receiver.push(vscode_languageserver_1.TextEdit.del(vscode_languageserver_1.Range.create(lineIndex, 0, lineIndex, startindex)));
    }
}
/**
 *
 * @param line
 * @param index
 * @param receiver
 * @param toRemove*/
function TrimEndFromLine(line, index, receiver, toRemove) {
    const text = line;
    const lineIndex = index;
    let startindex = text.length - 1;
    const endindex = text.length;
    startindex = endindex;
    let loop = true;
    while (loop) {
        loop = false;
        toRemove.forEach((x) => {
            if (x == text.substring(startindex, startindex + x.length)) {
                loop = true;
                startindex -= x.length;
            }
        });
    }
    startindex++;
    if (startindex < endindex) {
        receiver.push(vscode_languageserver_1.TextEdit.del(vscode_languageserver_1.Range.create(lineIndex, startindex, lineIndex, endindex)));
    }
}
//# sourceMappingURL=text-edit.js.map