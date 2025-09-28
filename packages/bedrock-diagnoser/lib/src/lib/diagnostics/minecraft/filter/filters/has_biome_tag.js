"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_filter_has_biome_tag = diagnose_filter_has_biome_tag;
const types_1 = require("../../../../types");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
function diagnose_filter_has_biome_tag(filter, diagnoser) {
    const tag = filter.value;
    if (!tag || typeof tag !== 'string') {
        return diagnoser.add("test/has_biome_tag", "Tag is not defined", types_1.DiagnosticSeverity.error, "minecraft.filter.has_biome_tag.type");
    }
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.biomes.some(biome => biome.tags.includes(tag)))
        return;
    let found = false;
    diagnoser.context.getProjectData().projectData.behaviorPacks.biomes.forEach(biome => {
        if (biome.tags.defined.has(tag))
            found = true;
    });
    if (!found)
        diagnoser.add("test/has_biome_tag/" + tag, `Cannot find biome tag definition: ${tag}`, types_1.DiagnosticSeverity.error, "minecraft.filter.has_biome_tag.type");
}
//# sourceMappingURL=has_biome_tag.js.map