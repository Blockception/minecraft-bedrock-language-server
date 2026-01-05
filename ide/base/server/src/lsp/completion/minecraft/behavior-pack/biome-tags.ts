import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Tag });
  const tags = new Set<string>();

  // Collect tags from vanilla biomes
  MinecraftData.vanilla.BehaviorPack.biomes.forEach((biome) => {
    biome.tags.forEach((tag) => tags.add(tag));
  });

  // Collect tags from education edition if enabled
  if (IsEducationEnabled(context.document)) {
    MinecraftData.edu.BehaviorPack.biomes.forEach((biome) => {
      biome.tags.forEach((tag) => tags.add(tag));
    });
  }

  // Collect tags from project biomes
  context.database.ProjectData.behaviorPacks.biomes.forEach((biome) => {
    if (!biome.tags) return;
    const biomeTags = Array.isArray(biome.tags) ? biome.tags : biome.tags.defined;
    if (biomeTags) {
      biomeTags.forEach((tag) => tags.add(tag));
    }
  });

  // Generate completion items for all collected tags
  tags.forEach((tag) => {
    builder.add({
      label: tag,
      documentation: `Biome tag: ${tag}`,
    });
  });
}
