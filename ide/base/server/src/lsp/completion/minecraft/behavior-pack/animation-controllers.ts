import { Kinds } from '../../../../constants';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder';
import { CompletionContext } from '../../context';

import * as Animations from './animations';

export function provideCompletion(context: Context<CompletionContext>): void {
  const data = context.document.configuration();

  // Add animation controllers from .mcdefinitions
  context.builder.generate(
    data.definitions.animation_controller?.defined,
    (item) => {
      if (typeof item === 'string') return `The defined bp animation controller: ${item}`;
      return `The bp animation controller: ${item.id}`;
    },
    Kinds.Completion.AnimationControllers,
  );

  context.builder.generate(
    context.database.ProjectData.behaviorPacks.animation_controllers,
    (item) => `The bp animation controller: ${item.id}`,
    Kinds.Completion.AnimationControllers,
  );
}

export function provideJsonCompletion(context: Context<CompletionContext>): void {
  return acBPJsonCompletion.onCompletion(context);
}

const acBPJsonCompletion = new JsonPathCompletion({
  match: /animation_controllers\/(.*)\/states\/(.*)\/animations\/.*/gi,
  onCompletion: Animations.provideDefinedAnimationCompletion,
});
