import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { createDefinitionDocGenerator } from '../utils';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined model', 'The model');
  const generateV = (item: Identifiable) => `The vanilla model: ${item}`;
  const data = context.document.configuration();

  // Add models from .mcdefinitions
  context.builder.generate(data.definitions.model?.defined, generateDoc, Kinds.Completion.Models);

  context.builder.generate(context.database.ProjectData.resourcePacks.models, generateDoc, Kinds.Completion.Models);
  context.builder.generate(MinecraftData.vanilla.ResourcePack.models, generateV, Kinds.Completion.Models);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.models, generateV, Kinds.Completion.Models);
}
