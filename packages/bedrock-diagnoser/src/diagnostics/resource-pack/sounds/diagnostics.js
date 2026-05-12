"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_resourcepack_sounds = diagnose_resourcepack_sounds;
exports.diagnose_resourcepack_sound = diagnose_resourcepack_sound;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const __1 = require("../..");
function diagnose_resourcepack_sounds(data, diagnoser) {
    if (data === undefined)
        return;
    const resources = diagnoser.context.getProjectData().resources;
    bc_minecraft_bedrock_shared_1.Definition.forEach(data, (ref, id) => {
        const sound = resources.sounds.get(id, diagnoser.project);
        if (sound === undefined) {
            __1.Errors.missing('resources', 'sounds', ref + '/' + id, diagnoser);
        }
    });
}
function diagnose_resourcepack_sound(id, diagnoser) {
    if (id === undefined)
        return;
    const pdata = diagnoser.context.getProjectData().resources.sounds.get(id, diagnoser.project);
    if (pdata === undefined) {
        __1.Errors.missing('resources', 'sounds', id, diagnoser);
    }
}
//# sourceMappingURL=diagnostics.js.map