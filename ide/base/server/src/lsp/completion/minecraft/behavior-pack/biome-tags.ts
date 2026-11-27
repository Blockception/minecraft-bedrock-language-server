import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.BiomeTag });

  context.database.ProjectData.behaviorPacks.biomes.forEach((biome) => {
    builder.generate(biome.tags, (tag) => `The biome tag: ${tag}\n\rFrom biome: ${biome.id}`);
  });

  MinecraftData.vanilla.BehaviorPack.biomes.forEach((biome) => {
    builder.generate(biome.tags, (tag) => `The vanilla biome tag: ${tag}\n\rFrom biome: ${biome.id}`);
  });
}
