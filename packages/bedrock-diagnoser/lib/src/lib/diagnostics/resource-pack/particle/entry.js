"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_particle_document = diagnose_particle_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const components_1 = require("bc-minecraft-bedrock-types/lib/minecraft/components");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const definitions_1 = require("../../definitions");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
const texture_atlas_1 = require("../texture-atlas");
const components_2 = require("./components");
/**Diagnoses the given document as a particle
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_particle_document(diagnoser) {
    var _a, _b, _c;
    const particle = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Particle.is(particle))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, particle);
    //check components
    const context = {
        source: particle,
        components: (0, components_1.getUsedComponents)(particle.particle_effect.components),
    };
    (0, components_2.resourcepack_diagnose_particle_components)(particle.particle_effect, context, diagnoser);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const texture = (_c = (_b = (_a = particle.particle_effect) === null || _a === void 0 ? void 0 : _a.description) === null || _b === void 0 ? void 0 : _b["basic_render_parameters"]) === null || _c === void 0 ? void 0 : _c["texture"];
    if (typeof texture != "string")
        return;
    const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
    if (pack === undefined)
        return;
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.ResourcePack.hasTexture(texture, (0, definitions_1.education_enabled)(diagnoser)))
        return;
    const rp_files = diagnoser.context
        .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}"], pack.context.ignores)
        .map((item) => item.replace(/\\/gi, "/"));
    (0, texture_atlas_1.texture_files_diagnose)("texture", texture, rp_files, diagnoser);
}
//# sourceMappingURL=entry.js.map