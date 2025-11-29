import { IIdentifier } from '../interfaces';
import { addOrSkip } from '../static/collections';

/**
 * Animation data from resource packs
 */
export interface Animation extends IIdentifier {
  id: string;
  bones: string[];
  particles: string[];
  sounds: string[];
}

/**
 * Create a new Animation
 */
export function createAnimation(): Animation {
  return {
    id: '',
    bones: [],
    particles: [],
    sounds: [],
  };
}

/**
 * Convert JSON document to Animation objects
 */
export function convertAnimation(doc: object, receiver: Animation[]): void {
  const root = doc as Record<string, unknown>;
  const container = root['animations'] as Record<string, unknown>;
  if (!container) return;

  for (const [name, value] of Object.entries(container)) {
    const item = createAnimation();
    item.id = name;
    receiver.push(item);

    const anim = value as Record<string, unknown>;

    const bones = anim['bones'] as Record<string, unknown> | undefined;
    if (bones) {
      harvestBones(bones, item.bones);
    }

    const sounds = anim['sound_effects'] as Record<string, unknown> | undefined;
    if (sounds) {
      harvestAllEffects(sounds, item.sounds);
    }

    const particles = anim['particle_effects'] as Record<string, unknown> | undefined;
    if (particles) {
      harvestAllEffects(particles, item.particles);
    }
  }
}

/**
 * Collect all the bone names
 */
function harvestBones(root: Record<string, unknown>, bones: string[]): void {
  for (const boneName of Object.keys(root)) {
    addOrSkip(bones, boneName);
  }
}

/**
 * Collects all defined effects: { "0.0": { "effect": "value" } } or { "0.0": [{ "effect": "value" }] }
 */
function harvestAllEffects(root: Record<string, unknown>, effects: string[]): void {
  for (const value of Object.values(root)) {
    harvestEffect(value, effects);
  }
}

/**
 * Collect all the { "effect": "value" } or [{ "effect": "value" }]
 */
function harvestEffect(root: unknown, effects: string[]): void {
  if (Array.isArray(root)) {
    for (const item of root) {
      harvestEffect(item, effects);
    }
    return;
  }

  if (typeof root === 'object' && root !== null) {
    const obj = root as Record<string, unknown>;
    const effect = obj['effect'] as string | undefined;
    if (effect && effect.trim() !== '') {
      addOrSkip(effects, effect);
    }
  }
}
