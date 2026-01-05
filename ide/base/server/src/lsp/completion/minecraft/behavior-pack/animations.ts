import { Identifiable } from '@blockception/packages-shared';
import { Kinds } from '../../../../constants';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable | string) => {
    if (typeof item === 'string') return `The defined bp animation: ${item}`;
    return `The bp animation: ${item.id}`;
  };
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
