"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectorattribute_one_positive_all_negatives = selectorattribute_one_positive_all_negatives;
exports.selectorattribute_duplicate_check = selectorattribute_duplicate_check;
exports.selectorattribute_no_negatives = selectorattribute_no_negatives;
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
/**
 * Attribute can only be tested positive once, but can have all the negative tests
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 * @returns Returns true if the selector is valid
 */
function selectorattribute_one_positive_all_negatives(parameters, selector, diagnoser) {
    let result = true;
    //Attribute can only be tested positive once, but can have all the negative tests
    if (parameters.length <= 1)
        return result;
    let negatives = 0;
    for (const element of parameters) {
        if (element.negative === true) {
            negatives++;
        }
    }
    //If we have less negatives then parameters - 1, then that means there are more positive thens 1
    if (negatives < parameters.length - 1) {
        result = false;
        parameters.forEach((item) => {
            diagnoser.add(json_1.CompactJson.toOffsetWord(item), `Parameter: "${item.key}" can only have 1 positive test or/and multiple negatives test`, types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.test.one_positive_all_negatives");
        });
    }
    return result;
}
/**
 * Checks if the attribute has duplicates tests
 * @param parameters
 * @param selector The selector the parameters are from
 * @param diagnoser
 * @returns
 */
function selectorattribute_duplicate_check(parameters, selector, diagnoser) {
    let result = true;
    //Just check for duplicate tests
    if (parameters.length <= 1)
        return result;
    for (let I = 0; I < parameters.length; I++) {
        const first = parameters[I];
        for (let J = I + 1; J < parameters.length; J++) {
            const second = parameters[J];
            if (first.offset !== second.offset && first.value === second.value) {
                result = false;
                diagnoser.add(json_1.CompactJson.toOffsetWord(second), `Duplicate test for parameter: "${second.key}"`, types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.test.duplicate");
            }
        }
    }
    return result;
}
/**
 * No negative tests are allowed
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 */
function selectorattribute_no_negatives(parameters, selector, diagnoser) {
    let result = true;
    for (const p of parameters) {
        if (p.negative === true) {
            result = false;
            diagnoser.add(json_1.CompactJson.toOffsetWord(p), `Parameter: "${p.key}" can not have a negative test`, types_1.DiagnosticSeverity.error, "minecraft.selector.attribute.test.nonegatives");
        }
    }
    return result;
}
//# sourceMappingURL=general.js.map