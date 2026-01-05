import { Identifiable } from '@blockception/packages-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';

import * as Animations from './animations';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable | string) => {
    if (typeof item === 'string') return `The defined rp animation controller: ${item}`;
    return `The rp animation controller: ${item.id}`;
  };
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.AnimationControllers });
  const data = context.document.configuration();

  // Add animation controllers from .mcdefinitions
  builder.generate(data.definitions.animation_controller?.defined, generateDoc);

  builder.generate(context.database.ProjectData.resourcePacks.animation_controllers, generateDoc);
  builder.generate(MinecraftData.vanilla.ResourcePack.animation_controllers, generateDoc);

  //Education data
  if (IsEducationEnabled(context.document))
    builder.generate(MinecraftData.edu.ResourcePack.animation_controllers, generateDoc);
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return acRPJsonCompletion.onCompletion(context);
}

const acRPJsonCompletion = new JsonPathCompletion({
  match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/\d+$/gi,
  onCompletion: Animations.provideCompletion,
});
