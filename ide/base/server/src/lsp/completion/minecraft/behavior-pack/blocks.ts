import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';
import { createDefinitionDocGenerator } from '../utils';

import * as BlockCulling from '../resource-pack/block-culling';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined block', 'The block definition');
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Block });
  const data = context.document.configuration();

  // Add blocks from .mcdefinitions
  builder.generate(data.definitions.block?.defined, generateDoc);

  builder.generate(context.database.ProjectData.behaviorPacks.blocks, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc);

  //Education data
  if (IsEducationEnabled(context.document)) builder.generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return blocksBPJsonCompletion.onCompletion(context);
}

const blocksBPJsonCompletion = new JsonPathCompletion({
  match: 'minecraft:block/components/minecraft:geometry/culling',
  onCompletion: BlockCulling.provideCompletion,
});
