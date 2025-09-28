"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_biome_document = diagnose_biome_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const components_1 = require("bc-minecraft-bedrock-types/lib/minecraft/components");
const types_1 = require("../../../types");
const json_1 = require("../../json");
const duplicate_check_1 = require("../../packs/duplicate-check");
const dependencies_1 = require("./components/dependencies");
const diagnose_1 = require("./components/diagnose");
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
/**Diagnoses the given document as an bp biome
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_biome_document(diagnoser) {
    const biome = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Biome.is(biome))
        return;
    const identifier = biome["minecraft:biome"].description.identifier;
    const context = {
        source: biome,
        components: (0, components_1.getUsedComponents)(biome["minecraft:biome"]),
    };
    (0, diagnose_1.behaviorpack_diagnose_biome_components)(biome["minecraft:biome"], context, diagnoser);
    (0, dependencies_1.behaviorpack_biome_components_dependencies)(biome, context, diagnoser);
    // check that no other exists with this id
    (0, duplicate_check_1.no_other_duplicates)("behaviorpack.biome", diagnoser.context.getProjectData().projectData.behaviorPacks.biomes, identifier, diagnoser);
    try {
        if (minecraft_1.FormatVersion.isLessThan(biome.format_version, [1, 21, 110])) {
            diagnoser.add("format_version", `Server side biome JSON files should be version 1.21.110 or higher`, types_1.DiagnosticSeverity.error, "behaviorpack.biome.min_version");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        // Leaving empty as the base diagnoser should flag an invalid format version
    }
}
//# sourceMappingURL=document.js.map