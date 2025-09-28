"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_controller_document = diagnose_animation_controller_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json/json");
const animation_controllers_1 = require("../../minecraft/animation-controllers");
const molang_1 = require("../../molang");
/**
 * Diagnoses the given document as an animation controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_animation_controller_document(diagnoser) {
    const controllers = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.AnimationControllers.is(controllers))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, controllers);
    //Transition check
    (0, animation_controllers_1.general_animation_controllers)(controllers, diagnoser);
    //TODO add rp animation controller diagnostics
}
//# sourceMappingURL=document.js.map