"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selector_scores_diagnose = selector_scores_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
const range_1 = require("../../general/range");
const objective_1 = require("../objective");
/**
 * Diagnoses the scores attribute from a selector
 * @param attr The attribute to diagnose
 * @param diagnoser The diagnoser to use
 */
function selector_scores_diagnose(attr, sel, diagnoser) {
    let result = true;
    if (!json_1.CompactJson.isObject(attr)) {
        const type = json_1.CompactJson.Type[attr.type];
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), `Expected a object, not a ${type}`, types_1.DiagnosticSeverity.error, "minecraft.selector.scores.type");
        return false;
    }
    attr.value.forEach((item) => {
        result = minecraft_selector_scores_item_diagnose(item, diagnoser) && result;
    });
    return result;
}
/**
 * Diagnoses a single item from a selector scores attribute
 * @param attr The score attribute to diagnose
 * @param diagnoser The diagnoser to use
 */
function minecraft_selector_scores_item_diagnose(attr, diagnoser) {
    if (!json_1.CompactJson.isString(attr)) {
        const type = json_1.CompactJson.Type[attr.type];
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), `Expected a range / integer value, not a ${type}`, types_1.DiagnosticSeverity.error, "minecraft.selector.scores.item.type");
        return false;
    }
    //Check objective references
    const result = (0, objective_1.minecraft_objectives_diagnose)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(attr.key, attr.offset), diagnoser);
    //Check range value
    return (0, range_1.general_range_integer_diagnose)(json_1.CompactJson.valueToOffsetWord(attr), diagnoser) && result;
}
//# sourceMappingURL=scores.js.map