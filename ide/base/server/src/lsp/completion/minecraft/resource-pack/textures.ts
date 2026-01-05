import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { createDefinitionDocGenerator } from '../utils';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined texture', 'The texture');
  const generateV = (item: string) => `The vanilla texture: ${item}`;
  const data = context.document.configuration();

  // Add textures from .mcdefinitions
  context.builder.generate(data.definitions.texture?.defined, generateDoc, Kinds.Completion.Texture);

  context.builder.generate(context.database.ProjectData.resourcePacks.textures, generateDoc, Kinds.Completion.Texture);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.textures, generateV, Kinds.Completion.Texture);

  //Education data
  if (IsEducationEnabled(context.document)) {
    context.builder.generate(MinecraftData.edu.ResourcePack.textures, generateV, Kinds.Completion.Texture);
  }
}
