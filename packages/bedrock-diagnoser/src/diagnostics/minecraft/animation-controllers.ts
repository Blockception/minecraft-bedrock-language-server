import { BehaviorPack, Defined, Internal, References, ResourcePack, Using } from 'bc-minecraft-bedrock-project';
import { State } from 'bc-minecraft-bedrock-project/src/internal/behavior-pack';

import { DiagnosticsBuilder, DiagnosticSeverity, WithMetadata } from '../../types';
import { diagnose_molang_implementation, MolangMetadata, User } from '../molang/diagnostics';
import { Identifiable } from '@blockception/packages-shared';
import { Conditional } from 'bc-minecraft-bedrock-types/src/types';

export type animation_controllers =
  | Internal.BehaviorPack.AnimationControllers
  | Internal.ResourcePack.AnimationControllers;
export type animation_controller =
  | Internal.BehaviorPack.AnimationController
  | Internal.ResourcePack.AnimationController;
export type animationsOwner = Identifiable & AnimationCarrier<Pick<References, 'defined'>>;

/**
 *
 * @param data
 * @param diagnoser
 */
export function general_animation_controllers(data: animation_controllers, diagnoser: DiagnosticsBuilder): void {
  Object.entries(data.animation_controllers).forEach(([controller_id, controller]) =>
    general_animation_controller(controller_id, controller, diagnoser),
  );
}

/**
 *
 * @param controller
 * @param controller_id
 * @param diagnoser
 */
export function general_animation_controller(
  controller_id: string,
  controller: animation_controller,
  diagnoser: DiagnosticsBuilder,
): void {
  //Check if initial_state points to existing state
  if (controller.initial_state) {
    const initial_state = controller.initial_state;

    if (controller.states[initial_state] === undefined) {
      diagnoser.add(
        `${controller_id}/initial_state/${initial_state}`,
        'Cannot find initial state, minecraft will revert to state at 0 index',
        DiagnosticSeverity.warning,
        'minecraft.animation_controller.state.missing',
      );
    }
  }

  const states = Object.keys(controller.states);
  const transitionedStates = new Set();

  //Check states
  Object.values(controller.states)
    .filter((state): state is { transitions: Conditional[] } => Array.isArray(state?.transitions))
    .map((state) => checkTransition(controller_id, state.transitions, controller.states, diagnoser))
    .flatMap((transitions) => transitions)
    .forEach((trans) => transitionedStates.add(trans));

  states.forEach((state) => {
    if (!transitionedStates.has(state) && controller.initial_state != state) {
      diagnoser.add(
        `${controller_id}/${state}`,
        `"${state}" state is never reached.`,
        DiagnosticSeverity.info,
        'minecraft.animation_controller.state.never_reached',
      );
    }
  });
}

/**
 *
 * @param controller
 * @param transitions
 * @param states
 * @param Builder
 */
function checkTransition(
  controller: string,
  transitions: Conditional[],
  states: Record<string, State>,
  diagnoser: DiagnosticsBuilder,
): string[] {
  const transitionedStates: string[] = [];
  //Loop over the transitions
  for (let I = 0; I < transitions.length; I++) {
    const trans = transitions[I];
    //Get state identification refered
    const state: string = typeof trans === 'string' ? trans : Object.getOwnPropertyNames(trans)[0];

    //check is map contains any value
    if (states[state] === undefined) {
      diagnoser.add(
        controller + '/states/' + state,
        `missing state defined by transition: ${state}`,
        DiagnosticSeverity.error,
        'minecraft.animation_controller.state.missing',
      );
    } else transitionedStates.push(state);
  }
  return transitionedStates;
}

export type Controller =
  | ResourcePack.AnimationController.AnimationController
  | BehaviorPack.AnimationController.AnimationController;

export interface AnimationCarrier<T extends Defined | Using> {
  animations: T;
}

export function general_animation_controllers_implementation(
  user: User & Partial<AnimationCarrier<Defined>>,
  controller: Controller,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>,
) {
  //for each animation, check if the defined animation is also used
  controller?.animations.using?.forEach((anim_id) => {
    if (user.animations?.defined.has(anim_id)) return;

    diagnoser.add(
      `${user.id}/${controller.id}`,
      `Animation controller (${controller.id}) is using animation: '${anim_id}' but ${user.id} has nothing defined that matches the given key\nMinecraft will still run but might return null errors on the animation`,
      DiagnosticSeverity.warning,
      'minecraft.animation_controller.animation.undefined',
    );
  });

  //Molang
  diagnose_molang_implementation(user, controller, diagnoser);
}
