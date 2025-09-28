"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_feature_document = diagnose_feature_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const duplicate_check_1 = require("../../packs/duplicate-check");
const diagnose_1 = require("./diagnose");
const block_1 = require("../block");
const structure_1 = require("../structure");
const molang_1 = require("../../molang");
/**
 * Diagnoses the given document as an item
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_feature_document(diagnoser) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const feature = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Feature.is(feature))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, feature);
    const identifier = findFeatureIdentifier(feature);
    if (!identifier)
        return;
    const path = diagnoser.document.uri.split("/");
    if (!identifier.endsWith(path
        .slice(path.findIndex((v) => v == "features") + 1)
        .join("/")
        .replace(".json", "")))
        diagnoser.add(identifier, `Feature identifier must match the relative path to the components up to and including the file name`, types_1.DiagnosticSeverity.error, "behaviorpack.components.identifier");
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)("behaviorpack.components", diagnoser.context.getProjectData().projectData.behaviorPacks.features, identifier, diagnoser);
    let components = feature;
    if (components["minecraft:aggregate_feature"])
        (_a = components["minecraft:aggregate_feature"].features) === null || _a === void 0 ? void 0 : _a.forEach((id) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(id, diagnoser);
        });
    if (components["minecraft:cave_carver_feature"])
        diagnose_block_reference(components["minecraft:cave_carver_feature"].fill_with, diagnoser);
    if (components["minecraft:fossil_feature"])
        diagnose_block_reference(components["minecraft:fossil_feature"].ore_block, diagnoser);
    if (components["minecraft:geode_feature"]) {
        diagnose_block_reference(components["minecraft:geode_feature"].filler, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].middle_layer, diagnoser);
        (_b = components["minecraft:geode_feature"].inner_placements) === null || _b === void 0 ? void 0 : _b.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components["minecraft:geode_feature"].alternate_inner_layer, diagnoser);
    }
    if (components["minecraft:growing_plant_feature"]) {
        (_c = components["minecraft:growing_plant_feature"].body_blocks) === null || _c === void 0 ? void 0 : _c.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        (_d = components["minecraft:growing_plant_feature"].head_blocks) === null || _d === void 0 ? void 0 : _d.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
    }
    if (components["minecraft:multiface_feature"]) {
        diagnose_block_reference(components["minecraft:multiface_feature"].places_block, diagnoser);
        diagnose_block_reference(components["minecraft:multiface_feature"].can_place_on, diagnoser);
    }
    if (components["minecraft:nether_cave_carver_feature"])
        diagnose_block_reference(components["minecraft:nether_cave_carver_feature"].fill_with, diagnoser);
    if (components["minecraft:ore_feature"])
        (_e = components["minecraft:ore_feature"].replace_rules) === null || _e === void 0 ? void 0 : _e.forEach((entry) => {
            var _a;
            diagnose_block_reference(entry.places_block, diagnoser);
            (_a = entry.may_replace) === null || _a === void 0 ? void 0 : _a.forEach((ref) => {
                diagnose_block_reference(ref, diagnoser);
            });
        });
    if (components["minecraft:partially_exposed_blob_feature"])
        diagnose_block_reference(components["minecraft:partially_exposed_blob_feature"].places_block, diagnoser);
    if (components["minecraft:scatter_feature"])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components["minecraft:scatter_feature"].places_feature, diagnoser);
    if (components["minecraft:search_feature"])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components["minecraft:search_feature"].places_feature, diagnoser);
    if (components["minecraft:search_feature"])
        (_f = components["minecraft:search_feature"].features) === null || _f === void 0 ? void 0 : _f.forEach((id) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(id, diagnoser);
        });
    if (components["minecraft:single_block_feature"]) {
        if (Array.isArray(components["minecraft:single_block_feature"].places_block))
            (_g = components["minecraft:single_block_feature"].places_block) === null || _g === void 0 ? void 0 : _g.forEach((entry) => {
                diagnose_block_reference(entry, diagnoser);
            });
        else
            diagnose_block_reference(components["minecraft:single_block_feature"].places_block, diagnoser);
    }
    if (components["minecraft:snap_to_surface_feature"])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components["minecraft:snap_to_surface_feature"].feature_to_snap, diagnoser);
    if (components["minecraft:structure_template_feature"]) {
        if (typeof components["minecraft:structure_template_feature"].structure_name == "string")
            (0, structure_1.diagnose_structure_implementation)('"' + components["minecraft:structure_template_feature"].structure_name + '"', diagnoser);
        (_k = (_j = (_h = components["minecraft:structure_template_feature"].constraints) === null || _h === void 0 ? void 0 : _h.block_intersection) === null || _j === void 0 ? void 0 : _j.block_allowlist) === null || _k === void 0 ? void 0 : _k.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        (_o = (_m = (_l = components["minecraft:structure_template_feature"].constraints) === null || _l === void 0 ? void 0 : _l.block_intersection) === null || _m === void 0 ? void 0 : _m.block_whitelist) === null || _o === void 0 ? void 0 : _o.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
    }
    if (components["minecraft:surface_relative_threshold_feature"])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components["minecraft:surface_relative_threshold_feature"].feature_to_place, diagnoser);
    //TODO Tree components
    if (components["minecraft:underwater_cave_carver_feature"]) {
        diagnose_block_reference(components["minecraft:underwater_cave_carver_feature"].fill_with, diagnoser);
        diagnose_block_reference(components["minecraft:underwater_cave_carver_feature"].replace_air_with, diagnoser);
    }
    if (components["minecraft:vegetation_patch_feature"]) {
        (_p = components["minecraft:vegetation_patch_feature"].replaceable_blocks) === null || _p === void 0 ? void 0 : _p.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        diagnose_block_reference(components["minecraft:vegetation_patch_feature"].ground_block, diagnoser);
        (0, diagnose_1.behaviorpack_feature_diagnose)(components["minecraft:vegetation_patch_feature"].vegetation_feature, diagnoser);
    }
    if (components["minecraft:weighted_random_feature"]) {
        (_q = components["minecraft:weighted_random_feature"].features) === null || _q === void 0 ? void 0 : _q.forEach((entry) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(entry[0], diagnoser);
        });
    }
}
function findFeatureIdentifier(source) {
    var _a, _b;
    for (const key in source) {
        if (key != "format_version")
            return (_b = (_a = source[key]) === null || _a === void 0 ? void 0 : _a.description) === null || _b === void 0 ? void 0 : _b.identifier;
    }
    return undefined;
}
function diagnose_block_reference(reference, diagnoser) {
    if (typeof reference == "string")
        (0, block_1.is_block_defined)(reference, diagnoser);
    else if (typeof reference.name == "string")
        (0, block_1.is_block_defined)(reference.name, diagnoser);
}
//# sourceMappingURL=document.js.map