import { Identifiable } from '@blockception/packages-shared';
import { Kinds } from '../../../../constants';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';
import { createDefinitionDocGenerator } from '../utils';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined bp animation', 'The bp animation');
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });
  const data = context.document.configuration();

  // Add animations from .mcdefinitions
  builder.generate(data.definitions.animation?.defined, generateDoc);

  builder.generate(context.database.ProjectData.behaviorPacks.animations, generateDoc);
}

export function provideDefinedAnimationCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Animation });

  context.database.ProjectData.behaviorPacks.entities.forEach((item) => {
    builder.generate(item.animations.defined, (anim) => `Animation ${anim} defined  by ${item.id}`);
  });
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return animBPJsonCompletion.onCompletion(context);
}

const animBPJsonCompletion = new JsonPathCompletion();
