import { IIdentifier } from '../interfaces';
import { addOrSkip } from '../static/collections';

/**
 * Animation controller data from resource packs
 */
export interface AnimationController extends IIdentifier {
  id: string;
  animations: string[];
  particles: string[];
  sounds: string[];
}

/**
 * Create a new AnimationController
 */
export function createAnimationController(): AnimationController {
  return {
    id: '',
    animations: [],
    particles: [],
    sounds: [],
  };
}

/**
 * Convert JSON document to AnimationController objects
 */
export function convertAnimationController(doc: object, receiver: AnimationController[]): void {
  const root = doc as Record<string, unknown>;
  const container = root['animation_controllers'] as Record<string, unknown>;
  if (!container) return;

  for (const [name, value] of Object.entries(container)) {
    const item = createAnimationController();
    item.id = name;
    receiver.push(item);

    const anim = value as Record<string, unknown>;
    const states = anim['states'] as Record<string, unknown> | undefined;
    if (states) {
      harvestStates(states, item);
    }
  }
}

/**
 * Harvest data from animation controller states
 */
function harvestStates(states: Record<string, unknown>, receiver: AnimationController): void {
  for (const state of Object.values(states)) {
    harvestState(state as Record<string, unknown>, receiver);
  }
}

/**
 * Harvest data from a single state
 */
function harvestState(state: Record<string, unknown>, receiver: AnimationController): void {
  const animations = state['animations'] as unknown;
  if (animations) {
    harvestConditionals(animations, receiver.animations);
  }

  const particleEffects = state['particle_effects'] as unknown;
  if (particleEffects) {
    harvestConditionals(particleEffects, receiver.particles);
  }

  const soundEffects = state['sound_effects'] as unknown;
  if (soundEffects) {
    harvestConditionals(soundEffects, receiver.sounds);
  }
}

/**
 * Harvest keys from: [{ "<key>": "<value>" }, "<key>"]
 */
function harvestConditionals(conditionals: unknown, keys: string[]): void {
  if (Array.isArray(conditionals)) {
    for (const item of conditionals) {
      harvestConditionals(item, keys);
    }
    return;
  }

  if (typeof conditionals === 'object' && conditionals !== null) {
    const obj = conditionals as Record<string, unknown>;
    const firstKey = Object.keys(obj)[0];
    if (firstKey && firstKey.trim() !== '') {
      addOrSkip(keys, firstKey);
    }
    return;
  }

  if (typeof conditionals === 'string' && conditionals.trim() !== '') {
    addOrSkip(keys, conditionals);
  }
}
