"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_entity_document = diagnose_entity_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const resources_1 = require("bc-minecraft-bedrock-project/lib/src/internal/resource-pack/resources");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../types");
const entity_1 = require("../../behavior-pack/entity");
const json_1 = require("../../json/json");
const script_1 = require("../../minecraft/script");
const molang_1 = require("../../molang");
const anim_or_controller_1 = require("../anim-or-controller");
const diagnostics_1 = require("../animation-controllers/diagnostics");
const usage_1 = require("../animation/usage");
const diagnose_1 = require("../model/diagnose");
const diagnose_2 = require("../particle/diagnose");
const diagnostics_2 = require("../render-controller/diagnostics");
const diagnostics_3 = require("../sounds/diagnostics");
const entry_1 = require("../texture-atlas/entry");
const molang_2 = require("bc-minecraft-bedrock-project/lib/src/project/molang");
/**
 * Diagnoses the given document as an RP entity
 * @param doc The text document to diagnose
 * @param diag The diagnoser builder to receive the errors
 */
function diagnose_entity_document(diag) {
    var _a, _b, _c, _d, _e, _f;
    const diagnoser = types_1.Metadata.withMetadata(diag, { userType: "Entities" });
    //No behaviorpack check, entities can exist without their bp side (for servers)
    //Load entity
    const entity = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Entity.is(entity))
        return;
    const description = entity["minecraft:client_entity"].description;
    const entityGathered = bc_minecraft_bedrock_project_1.ResourcePack.Entity.process(diagnoser.document);
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, entity);
    (0, entity_1.behaviorpack_entityid_diagnose)(description.identifier, diagnoser);
    if (!entityGathered)
        return;
    if (!entityGathered.molang) {
        entityGathered.molang = (0, molang_2.harvestMolang)(diagnoser.document.getText(), entity);
        (0, resources_1.getUsingResources)(entityGathered.molang, entity["minecraft:client_entity"].description, diagnoser.document);
    }
    // Collect all animations and animation controllers
    const anim_data = {
        animation_controllers: {},
        animations: (_a = description.animations) !== null && _a !== void 0 ? _a : {},
        script: (_b = description.scripts) !== null && _b !== void 0 ? _b : {},
    };
    (_c = description.animation_controllers) === null || _c === void 0 ? void 0 : _c.forEach((controller) => {
        if (typeof controller === "string") {
            anim_data.animation_controllers[controller] = controller;
            return;
        }
        bc_minecraft_bedrock_types_1.Types.Definition.forEach(controller, (ref, anim_id) => (anim_data.animation_controllers[ref] = anim_id));
    });
    //#region animations
    //Check animations / animation controllers
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(anim_data.animations, (ref, anim_id) => (0, anim_or_controller_1.animation_or_controller_diagnose_implementation)(anim_id, entityGathered, diagnoser, description.particle_effects, description.sound_effects));
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(anim_data.animation_controllers, (ref, anim_id) => (0, anim_or_controller_1.animation_or_controller_diagnose_implementation)(anim_id, entityGathered, diagnoser, description.particle_effects, description.sound_effects));
    //Check used animations
    (0, usage_1.resourcepack_animation_used)(anim_data, diagnoser);
    //#endregion
    //Check animation controllers
    (_d = description.animation_controllers) === null || _d === void 0 ? void 0 : _d.map((controller) => flatten(controller)).filter((id) => id !== undefined).forEach((id) => (0, diagnostics_1.diagnose_animation_controller_implementation)(id, entityGathered, diagnoser, {}));
    //Check render controllers
    (_e = description.render_controllers) === null || _e === void 0 ? void 0 : _e.map((controller) => getKey(controller)).filter((key) => key !== undefined).forEach((key) => (0, diagnostics_2.render_controller_diagnose_implementation)(key, entityGathered, diagnoser));
    //Check models
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.geometry, (ref, modelId) => (0, diagnose_1.model_is_defined)(modelId, diagnoser));
    //check particles
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.particle_effects, (ref, part_id) => (0, diagnose_2.particle_is_defined)(part_id, diagnoser));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const textureId = (_f = description["spawn_egg"]) === null || _f === void 0 ? void 0 : _f["texture"];
    if (typeof textureId == "string" &&
        !diagnoser.context.getProjectData().projectData.resourcePacks.itemTextures.find((val) => val.id == textureId)) {
        diagnoser.add(`description/spawn_egg/${textureId}`, `Texture reference "${textureId}" was not defined in item_texture.json`, types_1.DiagnosticSeverity.error, "behaviorpack.item.components.texture_not_found");
    }
    //Get pack
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    const rp_files = diagnoser.context
        .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    //Check if entity has textures defined
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.textures, (ref, id) => {
        (0, entry_1.texture_files_diagnose)(description.identifier, id, rp_files, diagnoser);
    });
    //Check if entity has sounds defined
    (0, diagnostics_3.diagnose_resourcepack_sounds)(description.sound_effects, diagnoser);
    //Script check
    if (description.scripts)
        (0, script_1.diagnose_script)(diagnoser, description.scripts, description.animations);
}
function flatten(data) {
    if (typeof data === "string")
        return data;
    const key = Object.getOwnPropertyNames(data)[0];
    if (key)
        return data[key];
    return undefined;
}
function getKey(data) {
    if (typeof data === "string")
        return data;
    return Object.getOwnPropertyNames(data)[0];
}
//# sourceMappingURL=document.js.map