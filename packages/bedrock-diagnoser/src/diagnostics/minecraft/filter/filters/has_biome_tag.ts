import { Minecraft } from 'bc-minecraft-bedrock-types';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../../types';

export function diagnose_filter_has_biome_tag(filter: Minecraft.Filter.Filter, diagnoser: DiagnosticsBuilder) {
  const tag = filter.value;

  if (!tag || typeof tag !== 'string') {
    return diagnoser.add(
      'test/has_biome_tag',
      'Tag is not defined',
      DiagnosticSeverity.error,
      'minecraft.filter.has_biome_tag.type',
    );
  }

  if (MinecraftData.vanilla.BehaviorPack.biomes.some((biome) => biome.tags.includes(tag))) return;

  let found = false;
  diagnoser.context.getProjectData().projectData.behaviorPacks.biomes.forEach((biome) => {
    if (biome.tags.defined.has(tag)) found = true;
  });

  if (!found)
    diagnoser.add(
      'test/has_biome_tag/' + tag,
      `Cannot find biome tag definition: ${tag}`,
      DiagnosticSeverity.error,
      'minecraft.filter.has_biome_tag.type',
    );
}
