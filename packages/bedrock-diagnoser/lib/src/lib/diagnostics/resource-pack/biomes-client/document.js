"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_biomes_client_document = diagnose_biomes_client_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const components_1 = require("bc-minecraft-bedrock-types/lib/minecraft/components");
const components_2 = require("./components");
const molang_1 = require("../../molang");
/**Diagnoses the given document as a biome_client file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_biomes_client_document(diagnoser) {
    const biome = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Biome.is(biome))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, biome);
    //TODO: Check if biome.description.identifier is valid
    const context = {
        source: biome,
        components: (0, components_1.getUsedComponents)(biome["minecraft:client_biome"].components),
    };
    (0, components_2.resourcepack_diagnose_biome_components)(biome["minecraft:client_biome"], context, diagnoser);
}
//# sourceMappingURL=document.js.map