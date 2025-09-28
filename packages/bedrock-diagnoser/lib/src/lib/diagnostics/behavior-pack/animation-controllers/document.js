"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_controller_document = diagnose_animation_controller_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const animation_controllers_1 = require("../../minecraft/animation-controllers");
const molang_1 = require("../../molang");
const duplicate_check_1 = require("../../packs/duplicate-check");
const commands_1 = require("../mcfunction/commands");
/**
 * Diagnoses the given document as an animation controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_animation_controller_document(diagnoser) {
    const controllers = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.AnimationControllers.is(controllers))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, controllers);
    //Transition check
    (0, animation_controllers_1.general_animation_controllers)(controllers, diagnoser);
    //foreach animation,
    Object.entries(controllers.animation_controllers).forEach(([id, controller]) => {
        // check that no other exists with this id
        (0, duplicate_check_1.no_other_duplicates)("behaviorpack.animation_controllers", diagnoser.context.getProjectData().projectData.behaviorPacks.animation_controllers, id, diagnoser);
        Object.values(controller.states).forEach((state) => {
            var _a, _b;
            (_a = state.on_entry) === null || _a === void 0 ? void 0 : _a.forEach((item) => (0, commands_1.json_commandsCheck)(item, diagnoser));
            (_b = state.on_exit) === null || _b === void 0 ? void 0 : _b.forEach((item) => (0, commands_1.json_commandsCheck)(item, diagnoser));
        });
    });
}
//# sourceMappingURL=document.js.map