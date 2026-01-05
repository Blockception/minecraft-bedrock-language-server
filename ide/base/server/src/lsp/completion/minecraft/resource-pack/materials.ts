import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable | string) => {
    if (typeof item === 'string') return `The defined material: ${item}`;
    return `The material: ${item.id}`;
  };
  const generateV = (item: string) => `The vanilla material: ${item}`;
  const data = context.document.configuration();

  // Add materials from .mcdefinitions
  context.builder.generate(
    data.definitions.material?.defined,
    generateDoc,
    Kinds.Completion.Materials,
  );

  context.builder.generate(
    context.database.ProjectData.resourcePacks.materials,
    generateDoc,
    Kinds.Completion.Materials,
  );
  context.builder.generate(MinecraftData.vanilla.ResourcePack.materials, generateV, Kinds.Completion.Materials);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.materials, generateV, Kinds.Completion.Materials);
}
