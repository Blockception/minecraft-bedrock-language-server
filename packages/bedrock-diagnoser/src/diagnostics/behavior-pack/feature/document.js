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
    const feature = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Feature.is(feature))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, feature);
    const identifier = findFeatureIdentifier(feature);
    if (!identifier)
        return;
    const path = diagnoser.document.uri.split('/');
    if (!identifier.endsWith(path
        .slice(path.findIndex((v) => v == 'features') + 1)
        .join('/')
        .replace('.json', '')))
        diagnoser.add(identifier, `Feature identifier must match the relative path to the components up to and including the file name`, types_1.DiagnosticSeverity.error, 'behaviorpack.components.identifier');
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)('behaviorpack.components', diagnoser.context.getProjectData().projectData.behaviorPacks.features, identifier, diagnoser);
    const components = feature;
    if (components['minecraft:aggregate_feature'])
        components['minecraft:aggregate_feature'].features?.forEach((id) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(id, diagnoser);
        });
    if (components['minecraft:cave_carver_feature'])
        diagnose_block_reference(components['minecraft:cave_carver_feature'].fill_with, diagnoser);
    if (components['minecraft:fossil_feature'])
        diagnose_block_reference(components['minecraft:fossil_feature'].ore_block, diagnoser);
    if (components['minecraft:geode_feature']) {
        diagnose_block_reference(components['minecraft:geode_feature'].filler, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].middle_layer, diagnoser);
        components['minecraft:geode_feature'].inner_placements?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
        diagnose_block_reference(components['minecraft:geode_feature'].alternate_inner_layer, diagnoser);
    }
    if (components['minecraft:growing_plant_feature']) {
        components['minecraft:growing_plant_feature'].body_blocks?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        components['minecraft:growing_plant_feature'].head_blocks?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
    }
    if (components['minecraft:multiface_feature']) {
        diagnose_block_reference(components['minecraft:multiface_feature'].places_block, diagnoser);
        diagnose_block_reference(components['minecraft:multiface_feature'].can_place_on, diagnoser);
    }
    if (components['minecraft:nether_cave_carver_feature'])
        diagnose_block_reference(components['minecraft:nether_cave_carver_feature'].fill_with, diagnoser);
    if (components['minecraft:ore_feature'])
        components['minecraft:ore_feature'].replace_rules?.forEach((entry) => {
            diagnose_block_reference(entry.places_block, diagnoser);
            entry.may_replace?.forEach((ref) => {
                diagnose_block_reference(ref, diagnoser);
            });
        });
    if (components['minecraft:partially_exposed_blob_feature'])
        diagnose_block_reference(components['minecraft:partially_exposed_blob_feature'].places_block, diagnoser);
    if (components['minecraft:scatter_feature'])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components['minecraft:scatter_feature'].places_feature, diagnoser);
    if (components['minecraft:search_feature'])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components['minecraft:search_feature'].places_feature, diagnoser);
    if (components['minecraft:search_feature'])
        components['minecraft:search_feature'].features?.forEach((id) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(id, diagnoser);
        });
    if (components['minecraft:single_block_feature']) {
        if (Array.isArray(components['minecraft:single_block_feature'].places_block))
            components['minecraft:single_block_feature'].places_block?.forEach((entry) => {
                diagnose_block_reference(entry, diagnoser);
            });
        else
            diagnose_block_reference(components['minecraft:single_block_feature'].places_block, diagnoser);
    }
    if (components['minecraft:snap_to_surface_feature'])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components['minecraft:snap_to_surface_feature'].feature_to_snap, diagnoser);
    if (components['minecraft:structure_template_feature']) {
        if (typeof components['minecraft:structure_template_feature'].structure_name == 'string')
            (0, structure_1.diagnose_structure_implementation)('"' + components['minecraft:structure_template_feature'].structure_name + '"', diagnoser);
        components['minecraft:structure_template_feature'].constraints?.block_intersection?.block_allowlist?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        components['minecraft:structure_template_feature'].constraints?.block_intersection?.block_whitelist?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
    }
    if (components['minecraft:surface_relative_threshold_feature'])
        (0, diagnose_1.behaviorpack_feature_diagnose)(components['minecraft:surface_relative_threshold_feature'].feature_to_place, diagnoser);
    //TODO Tree components
    if (components['minecraft:underwater_cave_carver_feature']) {
        diagnose_block_reference(components['minecraft:underwater_cave_carver_feature'].fill_with, diagnoser);
        diagnose_block_reference(components['minecraft:underwater_cave_carver_feature'].replace_air_with, diagnoser);
    }
    if (components['minecraft:vegetation_patch_feature']) {
        components['minecraft:vegetation_patch_feature'].replaceable_blocks?.forEach((id) => {
            diagnose_block_reference(id, diagnoser);
        });
        diagnose_block_reference(components['minecraft:vegetation_patch_feature'].ground_block, diagnoser);
        (0, diagnose_1.behaviorpack_feature_diagnose)(components['minecraft:vegetation_patch_feature'].vegetation_feature, diagnoser);
    }
    if (components['minecraft:weighted_random_feature']) {
        components['minecraft:weighted_random_feature'].features?.forEach((entry) => {
            (0, diagnose_1.behaviorpack_feature_diagnose)(entry[0], diagnoser);
        });
    }
}
function findFeatureIdentifier(source) {
    for (const key in source) {
        if (key != 'format_version')
            return source[key]?.description?.identifier;
    }
    return undefined;
}
function diagnose_block_reference(reference, diagnoser) {
    if (typeof reference == 'string')
        (0, block_1.is_block_defined)(reference, diagnoser);
    else if (typeof reference.name == 'string')
        (0, block_1.is_block_defined)(reference.name, diagnoser);
}
//# sourceMappingURL=document.js.map