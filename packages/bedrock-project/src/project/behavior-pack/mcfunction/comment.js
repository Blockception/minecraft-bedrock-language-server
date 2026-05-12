"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMcfunctionCommentStart = findMcfunctionCommentStart;
exports.GetComment = GetComment;
/**
 * Returns the index of the first `#` character that is not inside a
 * double-quoted string, or -1 if no such character exists.
 *
 * This correctly identifies inline comments (e.g. `kill @s # comment`)
 * while ignoring `#` inside string arguments (e.g. `summon cow "#asdf"`).
 */
function findMcfunctionCommentStart(line) {
    let inString = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '\\' && inString) {
            i++; // skip escaped character inside a string
        }
        else if (line[i] === '"') {
            inString = !inString;
        }
        else if (line[i] === '#' && !inString) {
            return i;
        }
    }
    return -1;
}
function GetComment(line) {
    const index = findMcfunctionCommentStart(line);
    if (index < 0)
        return '';
    return line.slice(index + 1);
}
//# sourceMappingURL=comment.js.map