"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_attachable_document = diagnose_attachable_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const resources_1 = require("bc-minecraft-bedrock-project/lib/src/internal/resource-pack/resources");
const molang_1 = require("bc-minecraft-bedrock-project/lib/src/project/molang");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../types");
const item_1 = require("../../behavior-pack/item");
const json_1 = require("../../json/json");
const script_1 = require("../../minecraft/script");
const molang_2 = require("../../molang");
const anim_or_controller_1 = require("../anim-or-controller");
const usage_1 = require("../animation/usage");
const diagnose_1 = require("../model/diagnose");
const diagnose_2 = require("../particle/diagnose");
const diagnostics_1 = require("../render-controller/diagnostics");
const diagnostics_2 = require("../sounds/diagnostics");
const entry_1 = require("../texture-atlas/entry");
/**
 * Diagnoses the given document as an attachable
 * @param doc The text document to diagnose
 * @param diag The diagnoser builder to receive the errors*/
function diagnose_attachable_document(diag) {
    var _a, _b, _c, _d;
    const diagnoser = types_1.Metadata.withMetadata(diag, { userType: "Attachables" });
    const attachable = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Attachable.is(attachable))
        return;
    const description = attachable["minecraft:attachable"].description;
    const attachableGathered = bc_minecraft_bedrock_project_1.ResourcePack.Attachable.process(diagnoser.document);
    (0, molang_2.diagnose_molang_syntax_current_document)(diagnoser, attachable);
    (0, item_1.behaviorpack_item_diagnose)(description.identifier, diagnoser);
    if (!attachableGathered)
        return;
    if (!attachableGathered.molang) {
        attachableGathered.molang = (0, molang_1.harvestMolang)(diagnoser.document.getText(), attachable);
        (0, resources_1.getUsingResources)(attachableGathered.molang, attachable["minecraft:attachable"].description, diagnoser.document);
    }
    //#region animations
    //Check animations / animation controllers
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
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(anim_data.animations, (reference, anim_id) => (0, anim_or_controller_1.animation_or_controller_diagnose_implementation)(anim_id, attachableGathered, diagnoser, description.particle_effects, description.sound_effects));
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(anim_data.animation_controllers, (ref, anim_id) => (0, anim_or_controller_1.animation_or_controller_diagnose_implementation)(anim_id, attachableGathered, diagnoser, description.particle_effects, description.sound_effects));
    //Check used animations
    (0, usage_1.resourcepack_animation_used)(anim_data, diagnoser);
    //#endregion
    //Check render controllers
    (_d = description.render_controllers) === null || _d === void 0 ? void 0 : _d.map((controller) => getKey(controller)).filter((temp) => temp !== undefined).forEach((key) => (0, diagnostics_1.render_controller_diagnose_implementation)(key, attachableGathered, diagnoser));
    //Check models
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.geometry, (ref, modelId) => (0, diagnose_1.model_is_defined)(modelId, diagnoser));
    //check particles
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.particle_effects, (ref, part_id) => (0, diagnose_2.particle_is_defined)(part_id, diagnoser));
    //Get pack
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    const rp_files = diagnoser.context
        .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    //Check if attachable has textures defined
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.textures, (ref, id) => {
        (0, entry_1.texture_files_diagnose)(description.identifier, id, rp_files, diagnoser);
    });
    //Check if attachable has sounds defined
    (0, diagnostics_2.diagnose_resourcepack_sounds)(description.sound_effects, diagnoser);
    //Script check
    if (description.scripts)
        (0, script_1.diagnose_script)(diagnoser, description.scripts, description.animations);
}
function getKey(data) {
    if (typeof data === "string")
        return data;
    return Object.getOwnPropertyNames(data)[0];
}
//# sourceMappingURL=document.js.map