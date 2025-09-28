"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = all;
exports.forEach = forEach;
exports.must_offset_word = must_offset_word;
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
/**
 *
 * @param fn
 * @returns
 */
function all(...fn) {
    return (attr, sel, diagnoser) => {
        let result = true;
        for (const f of fn) {
            result = result && f(attr, sel, diagnoser);
        }
        return result;
    };
}
function forEach(fn) {
    return (attr, sel, diagnoser) => {
        let result = true;
        for (const a of attr) {
            result = result && fn(a, sel, diagnoser);
        }
        return result;
    };
}
function must_offset_word(fn) {
    return forEach((attr, sel, diagnoser) => {
        if (json_1.CompactJson.isString(attr)) {
            const word = json_1.CompactJson.valueToOffsetWord(attr);
            if (word.text.startsWith("!")) {
                word.text = word.text.slice(1);
                word.offset++;
            }
            return fn(word, diagnoser);
        }
        diagnoser.add(json_1.CompactJson.valueToOffsetWord(attr), "Expected a string", types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.string");
        return false;
    });
}
//# sourceMappingURL=util.js.map