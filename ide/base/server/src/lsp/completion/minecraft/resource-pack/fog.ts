import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable | string) => {
    if (typeof item === 'string') return `The defined fog: ${item}`;
    return `The fog: ${item.id}`;
  };
  const data = context.document.configuration();

  // Add fogs from .mcdefinitions
  context.builder.generate(data.definitions.fog?.defined, generateDoc, Kinds.Completion.Fogs);

  context.builder.generate(context.database.ProjectData.resourcePacks.fogs, generateDoc, Kinds.Completion.Fogs);

  //Generate for vanilla data
  const generateV = (item: string) => `The vanilla fog: ${item}`;

  //Vanilla data
  context.builder.generate(MinecraftData.vanilla.ResourcePack.fogs, generateV, Kinds.Completion.Fogs);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.fogs, generateV, Kinds.Completion.Fogs);
}
