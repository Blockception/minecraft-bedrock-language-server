"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_sound_definitions_document = diagnose_sound_definitions_document;
exports.sound_files_diagnose = sound_files_diagnose;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const json_1 = require("../../json/json");
/**
 * Diagnoses the given document as a `sound_definitions` file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_sound_definitions_document(diagnoser) {
    const definitions = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.SoundDefinitions.is(definitions))
        return;
    //Get pack for files search
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    const sounds = definitions.sound_definitions;
    const sound_files = diagnoser.context
        .getFiles(pack.folder, ["**/sounds/**/*.{fsb,wav,ogg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    //For each sound definition
    Object.entries(sounds).forEach(([sound_id, sound]) => {
        //For each file reference
        sound.sounds.forEach((soundSpec) => {
            if (typeof soundSpec === "string") {
                sound_files_diagnose(sound_id, soundSpec, sound_files, diagnoser);
            }
            else {
                const name = soundSpec.name;
                if (typeof name === "string") {
                    sound_files_diagnose(sound_id, name, sound_files, diagnoser);
                }
            }
        });
    });
}
function sound_files_diagnose(owner, file, files, diagnoser) {
    for (let i = 0; i < files.length; i++) {
        if (files[i].includes(file)) {
            //Found then return out
            return;
        }
    }
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.getSoundFile(file, (0, definitions_1.education_enabled)(diagnoser)) !== undefined)
        return;
    diagnoser.add(`${owner}/${file}`, `Cannot find sound file: ${file}`, types_1.DiagnosticSeverity.error, "resourcepack.sound.missing");
}
//# sourceMappingURL=entry.js.map