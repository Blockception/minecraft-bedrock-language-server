"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDefinition = void 0;
exports.behaviorpack_item_diagnose = behaviorpack_item_diagnose;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const __1 = require("../..");
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const entity_1 = require("../entity");
function behaviorpack_item_diagnose(value, diagnoser) {
    const { namespace, id } = ItemDefinition.parse(typeof value == "string" ? value : value.text);
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.item, `${namespace}:${id}`, diagnoser))
        return true;
    //If it is an spawn egg, treat it as an entity
    if (id.endsWith("_spawn_egg")) {
        const item = id.slice(0, id.length - 10);
        const entity = { offset: typeof value == "string" ? 0 : value.offset, text: `${namespace}:${item}` };
        return (0, entity_1.behaviorpack_entityid_diagnose)(entity, diagnoser);
    }
    if (hasAny(`${namespace}:${id}`, diagnoser)) {
        if (typeof value == "string")
            return true;
        else
            return checkData(value, diagnoser);
    }
    if (namespace === "minecraft") {
        if (hasAny(`${namespace}:${id}`, diagnoser)) {
            if (typeof value == "string")
                return true;
            else
                return checkData(value, diagnoser);
        }
    }
    //Nothing then report error
    __1.Errors.missing("behaviors", "items", `${namespace}:${id}`, diagnoser, value);
    return false;
}
function hasAny(id, diagnoser) {
    const data = diagnoser.context.getProjectData().projectData;
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.item, id, diagnoser))
        return true;
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.block, id, diagnoser))
        return true;
    //Project has item Or blocks
    if (data.hasItem(id))
        return true;
    if (data.hasBlock(id))
        return true;
    const edu = (0, definitions_1.education_enabled)(diagnoser);
    //Vanilla has item
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.hasItem(id, edu))
        return true;
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.hasBlock(id, edu))
        return true;
    return false;
}
function checkData(value, diagnoser) {
    const edu = (0, definitions_1.education_enabled)(diagnoser);
    const item = bc_minecraft_bedrock_vanilla_data_1.MinecraftData.BehaviorPack.getItem(value.text, edu);
    if (item && typeof value.data === "number") {
        if (value.data <= item.max_damage) {
            diagnoser.add(value, `Item data is for ${value.text} is 0..${item.max_damage}`, types_1.DiagnosticSeverity.error, "behaviorpack.item.data");
        }
    }
    return true;
}
var ItemDefinition;
(function (ItemDefinition) {
    /**
     * Parses item ids into their subcomponents that follow syntax like:
     * - `<namespace>:<id>:[variant]`
     * - `<id>:[variant]`
     * @param id
     */
    function parse(id) {
        const parts = id.split(":");
        if (parts.length === 3) {
            return {
                namespace: parts[0],
                id: parts[1],
                variant: parts[2],
            };
        }
        if (parts.length === 1) {
            return {
                namespace: "minecraft",
                id: parts[0],
                variant: "",
            };
        }
        const [first, second] = parts;
        if (first === "minecraft") {
            return {
                namespace: first,
                id: second,
                variant: "",
            };
        }
        if (!Number.isNaN(parseInt(second)))
            return {
                namespace: "minecraft",
                id: first,
                variant: second,
            };
        return {
            namespace: first,
            id: second,
            variant: "",
        };
    }
    ItemDefinition.parse = parse;
})(ItemDefinition || (exports.ItemDefinition = ItemDefinition = {}));
//# sourceMappingURL=diagnose.js.map