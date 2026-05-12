"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMolang = IsMolang;
exports.getPreviousWord = getPreviousWord;
exports.isDefined = isDefined;
exports.getIdentifier = getIdentifier;
exports.getScopeDefined = getScopeDefined;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const util_1 = require("../../util");
const MolangRegexp = /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->)\b/im;
// const MolangCommandRegexp = /^\/[a-z]+ /;
/**
 *
 * @param text
 * @returns
 */
function IsMolang(text) {
    if (text.startsWith('@s'))
        return true;
    //Get first word
    let index = text.indexOf(' ');
    if (index < 0)
        index = text.length;
    let word = text.substring(0, index);
    if (word.startsWith('/')) {
        word = word.substring(1, word.length);
    }
    //command test
    if (bc_minecraft_bedrock_command_1.CommandData.Vanilla[word] !== undefined) {
        return true;
    }
    if (bc_minecraft_bedrock_command_1.CommandData.Edu[word] !== undefined) {
        return true;
    }
    //general test
    return MolangRegexp.test(text);
}
/**
 *
 * @param text The text to retrieve the word from
 * @param cursor The cursor offset in the text
 * @returns
 */
function getPreviousWord(text, cursor) {
    let endIndex = cursor;
    if (text.charAt(endIndex - 1) === '.')
        endIndex = cursor - 1;
    let Index;
    for (Index = endIndex - 1; Index > -1; Index--) {
        const c = text.charAt(Index);
        if (util_1.Character.IsLetter(c) || util_1.Character.IsNumber(c) || c === '_')
            continue;
        break;
    }
    return text.substring(Index + 1, endIndex);
}
function isDefined(set, id) {
    if (set === undefined)
        return false;
    for (const item of set.assigned) {
        const identifier = bc_minecraft_molang_1.ExpressionNode.getIdentifier(item);
        if (identifier === id)
            return true;
    }
    return false;
}
/**
 * @deprecated Use ExpressionNode.getIdentifier
 */
function getIdentifier(item, prefixed = true) {
    return bc_minecraft_molang_1.ExpressionNode.getIdentifier(item, prefixed);
}
function getScopeDefined(set, ...scope) {
    const result = [];
    set.assigned.forEach((v) => {
        if (scope.includes(v.scope))
            result.push(v);
    });
    return result;
}
//# sourceMappingURL=functions.js.map