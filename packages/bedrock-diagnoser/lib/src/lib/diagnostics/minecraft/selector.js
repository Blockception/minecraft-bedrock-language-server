"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_selector_diagnose = minecraft_selector_diagnose;
exports.minecraft_selector_attribute_diagnose_hard = minecraft_selector_attribute_diagnose_hard;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
const attributes_1 = require("./selector/attributes");
/**
 *
 * @param pattern
 * @param value
 * @param diagnoser
 * @returns
 */
function minecraft_selector_diagnose(pattern, value, diagnoser) {
    var _a, _b;
    const sel = value.text;
    //Is a selector?
    if (sel.startsWith("@")) {
        minecraft_selector_diagnose_hard(value, diagnoser, pattern);
        return;
    }
    //Fake entity or named then
    const name = bc_minecraft_bedrock_project_1.Text.UnQuote(sel);
    //Fake players have been banned
    if (((_a = pattern.options) === null || _a === void 0 ? void 0 : _a.allowFakePlayers) === false) {
        diagnoser.add(value, "No fake players / names allowed", types_1.DiagnosticSeverity.error, "minecraft.selector.invalid");
        return;
    }
    if (((_b = pattern.options) === null || _b === void 0 ? void 0 : _b.playerOnly) === true) {
        diagnoser.add(value, "Only players selector allowed to be used", types_1.DiagnosticSeverity.error, "minecraft.selector.invalid");
        return;
    }
    const data = diagnoser.context.getProjectData().projectData;
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.name, name, diagnoser))
        return;
    //Project has defined this fake entity
    if (data.general.fakeEntities.has(name))
        return;
    //Found nothing then report
    diagnoser.add(value, `Cannot find fake entity definition or name for: ${name}`, types_1.DiagnosticSeverity.warning, "minecraft.fakeentity.missing");
}
/**
 * Diagnoses a selector
 * @param pattern
 * @param value
 * @param diagnoser
 */
function minecraft_selector_diagnose_hard(value, diagnoser, pattern) {
    var _a;
    const selector = bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.parse(value.text, value.offset);
    if (selector === undefined) {
        diagnoser.add(value, "Invalid selector", types_1.DiagnosticSeverity.error, "minecraft.selector.invalid");
        return false;
    }
    let result = true;
    //If the selector is only meant to be aimed at player warn the user
    if (((_a = pattern.options) === null || _a === void 0 ? void 0 : _a.playerOnly) === true) {
        switch (selector.selectorType) {
            case "@e":
            case "@v":
                result = false;
                diagnoser.add(value, "Selector is meant to target only players", types_1.DiagnosticSeverity.info, "minecraft.selector.playeronly");
                break;
        }
    }
    if (!bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.isValidType(selector)) {
        result = false;
        diagnoser.add(value, `Unknown selector type: ${selector.type}`, types_1.DiagnosticSeverity.error, "minecraft.selector.type.invalid");
    }
    //Check attributes
    const names = selector.names();
    for (const name of names) {
        const attributes = selector.get(name);
        //No attribute then next
        if (attributes) {
            result && (result = minecraft_selector_attribute_diagnose_hard(name, attributes, selector, diagnoser));
        }
    }
    return result;
}
/**
 * Diagnoses a selector attribute
 * @param attribute The attribute to diagnose
 * @param attributes The attributes to diagnose
 * @param selector The selector to diagnose
 * @param diagnoser The diagnoser to use
 * @returns Returns true when the attribute is valid
 */
function minecraft_selector_attribute_diagnose_hard(attribute, attributes, selector, diagnoser) {
    return attributes_1.Attribute.diagnose(attribute, attributes, selector, diagnoser);
}
//# sourceMappingURL=selector.js.map