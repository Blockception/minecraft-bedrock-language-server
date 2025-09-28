"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_selector_has_property_diagnose = minecraft_selector_has_property_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const json_1 = require("bc-minecraft-bedrock-types/lib/minecraft/json");
const types_1 = require("../../../types");
const noop_1 = require("../../../types/noop");
const general_1 = require("../../general");
function minecraft_selector_has_property_diagnose(attr, sel, diagnoser) {
    let result = true;
    if (!json_1.CompactJson.isObject(attr)) {
        const type = json_1.CompactJson.Type[attr.type];
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), `Expected a object, not a ${type}`, types_1.DiagnosticSeverity.error, "minecraft.selector.has_property.type");
        return false;
    }
    attr.value.forEach((item) => {
        result = entity_has_property(item, diagnoser) && result;
    });
    return result;
}
function entity_has_property(attr, diagnoser) {
    if (!json_1.CompactJson.isString(attr)) {
        const type = json_1.CompactJson.Type[attr.type];
        diagnoser.add(json_1.CompactJson.toOffsetWord(attr), `Can't handle ${type}, needs to be a string/boolean/number`, types_1.DiagnosticSeverity.error, "minecraft.selector.has_property.type");
        return false;
    }
    const entityData = diagnoser.context.getProjectData().projectData.behaviorPacks.entities;
    const key = bc_minecraft_bedrock_types_1.Types.OffsetWord.create(attr.key, attr.offset);
    const value = json_1.CompactJson.valueToOffsetWord(attr);
    let entities = [];
    entityData.forEach((entity) => {
        if (entity.properties.some((item) => item.name === key.text)) {
            entities.push(entity);
        }
    });
    // Filter on only entities match on type
    if (entities.length > 1) {
        entities = entities.filter((item) => item.properties.some((item) => {
            switch (item.type) {
                case "bool":
                    return value.text === "true" || value.text === "false";
                case "float":
                    const frange = { min: item.range[0], max: item.range[1] };
                    return (0, general_1.general_range_float_diagnose)(value, new noop_1.NoopDiagnoser(diagnoser), frange);
                case "int":
                    const irange = { min: item.range[0], max: item.range[1] };
                    return (0, general_1.general_range_integer_diagnose)(value, new noop_1.NoopDiagnoser(diagnoser), irange);
                case "enum":
                    return item.values.includes(value.text);
            }
        }));
    }
    if (entities.length === 0) {
        diagnoser.add(key, `No entity has the property '${key.text}'`, types_1.DiagnosticSeverity.error, "minecraft.selector.has_property.notfound");
        return false;
    }
    return true;
}
//# sourceMappingURL=has_property.js.map