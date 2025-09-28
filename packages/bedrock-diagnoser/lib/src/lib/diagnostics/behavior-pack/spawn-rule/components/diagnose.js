"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_diagnose_spawnrule_components = behaviorpack_diagnose_spawnrule_components;
const checks_1 = require("../../../../utility/components/checks");
const filter_1 = require("../../../minecraft/filter");
const entity_1 = require("../../entity");
const block_1 = require("../../block");
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function behaviorpack_diagnose_spawnrule_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
}
const component_test = {
    "minecraft:biome_filter": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component, diagnoser);
    },
    "minecraft:delay_filter": (name, component, context, diagnoser) => {
        if (typeof component.identifier == "string")
            (0, entity_1.behaviorpack_entityid_diagnose)(component.identifier, diagnoser);
    },
    "minecraft:herd": (name, component, context, diagnoser) => {
        const entity = diagnoser.context
            .getProjectData()
            .projectData.behaviorPacks.entities.get(context.source["minecraft:spawn_rules"].description.identifier);
        if (!entity)
            return;
        if (typeof component.event == "string")
            (0, entity_1.behaviorpack_entity_event_diagnose)(component.event, name, entity.events, diagnoser);
    },
    "minecraft:permute_type": (name, component, context, diagnoser) => {
        processEntries(component, (entry) => {
            if (typeof entry.entity_type == "string")
                (0, entity_1.behaviorpack_entityid_diagnose)(entry.entity_type, diagnoser);
        });
    },
    "minecraft:spawn_event": (name, component, context, diagnoser) => {
        const entity = diagnoser.context
            .getProjectData()
            .projectData.behaviorPacks.entities.get(context.source["minecraft:spawn_rules"].description.identifier);
        if (!entity)
            return;
        if (typeof component.event == "string")
            (0, entity_1.behaviorpack_entity_event_diagnose)(component.event, name, entity.events, diagnoser);
    },
    "minecraft:spawns_on_block_filter": (name, component, context, diagnoser) => {
        if (typeof component == "string")
            (0, block_1.is_block_defined)(component, diagnoser);
        else if (Array.isArray(component))
            component.forEach((entry) => {
                if (typeof entry == "string")
                    (0, block_1.is_block_defined)(entry, diagnoser);
                else if (typeof entry == "object" && typeof entry.name == "string")
                    (0, block_1.is_block_defined)(entry.name, diagnoser);
            });
        else if (typeof component == "object" && typeof component.name == "string")
            (0, block_1.is_block_defined)(component.name, diagnoser);
    },
    "minecraft:spawns_on_block_prevented_filter": (name, component, context, diagnoser) => {
        if (typeof component == "string")
            (0, block_1.is_block_defined)(component, diagnoser);
        else if (Array.isArray(component))
            component.forEach((entry) => {
                if (typeof entry == "string")
                    (0, block_1.is_block_defined)(entry, diagnoser);
                else if (typeof entry == "object" && typeof entry.name == "string")
                    (0, block_1.is_block_defined)(entry.name, diagnoser);
            });
        else if (typeof component == "object" && typeof component.name == "string")
            (0, block_1.is_block_defined)(component.name, diagnoser);
    },
};
//! Move into some util place as this function is duplicated in entity/components/diagnose.ts
function processEntries(data, callback) {
    if (Array.isArray(data))
        data.forEach(callback);
    else if (data)
        callback(data);
}
//# sourceMappingURL=diagnose.js.map