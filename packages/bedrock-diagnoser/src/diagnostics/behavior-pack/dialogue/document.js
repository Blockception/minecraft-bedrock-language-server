"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_dialogue_document = diagnose_dialogue_document;
const json_1 = require("../../json/json");
const commands_1 = require("../mcfunction/commands");
/**Diagnoses the given document as a dialogue file
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_dialogue_document(diagnoser) {
    const dialogue = json_1.Json.LoadReport(diagnoser);
    if (typeof dialogue !== 'object')
        return;
    dialogue['minecraft:npc_dialogue']?.scenes?.forEach((scene) => {
        if (scene.on_open_commands)
            (0, commands_1.json_commandsCheck)(scene.on_open_commands, diagnoser);
        if (scene.on_close_commands)
            (0, commands_1.json_commandsCheck)(scene.on_close_commands, diagnoser);
        scene.buttons?.forEach((button) => {
            if (button.commands)
                (0, commands_1.json_commandsCheck)(button.commands, diagnoser);
        });
    });
}
//# sourceMappingURL=document.js.map