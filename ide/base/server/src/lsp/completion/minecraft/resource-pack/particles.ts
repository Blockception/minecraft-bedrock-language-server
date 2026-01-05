import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';
import { createDefinitionDocGenerator } from '../utils';

import * as Textures from './textures';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined particle', 'The particle');
  const generateV = (item: string) => `The vanilla particle: ${item}`;
  const data = context.document.configuration();

  // Add particles from .mcdefinitions
  context.builder.generate(
    data.definitions.particle?.defined,
    generateDoc,
    Kinds.Completion.Particle,
  );

  context.builder.generate(
    context.database.ProjectData.resourcePacks.particles,
    generateDoc,
    Kinds.Completion.Particle,
  );
  context.builder.generate(MinecraftData.vanilla.ResourcePack.particles, generateV, Kinds.Completion.Particle);

  //Education data
  if (IsEducationEnabled(context.document))
    context.builder.generate(MinecraftData.edu.ResourcePack.particles, generateV, Kinds.Completion.Particle);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return particleJsonCompletion.onCompletion(context);
}

const particleJsonCompletion = new JsonPathCompletion({
  match: (item) => item.endsWith('/basic_render_parameters/texture'),
  onCompletion: Textures.provideCompletion,
});
