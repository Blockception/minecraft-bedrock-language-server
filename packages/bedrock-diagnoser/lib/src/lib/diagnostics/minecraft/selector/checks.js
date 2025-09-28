"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectorattributes_no_duplicate = selectorattributes_no_duplicate;
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
/**
 * Checking if the given attribute is the only one.
 * @param attrs The attributes to check
 * @param sel The selector
 * @param diagnoser The diagnoser
 * @returns True if the attribute is the only one, false otherwise
 */
function selectorattributes_no_duplicate(attrs, sel, diagnoser) {
    if (attrs.length <= 1)
        return true;
    attrs.forEach((item) => diagnoser.add(json_1.CompactJson.toOffsetWord(item), `Duplicate selector attribute: ${item.key}, but only one allowed`, types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.noduplicate"));
    return false;
}
//# sourceMappingURL=checks.js.map