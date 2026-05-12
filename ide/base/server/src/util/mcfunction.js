"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommentStart = findCommentStart;
/**
 * Returns the index of the first `#` character that is not inside a
 * double-quoted string, or -1 if no such character exists.
 *
 * This correctly identifies inline comments (e.g. `kill @s # comment`)
 * while ignoring `#` inside string arguments (e.g. `summon cow "#asdf"`).
 */
function findCommentStart(line) {
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
//# sourceMappingURL=mcfunction.js.map