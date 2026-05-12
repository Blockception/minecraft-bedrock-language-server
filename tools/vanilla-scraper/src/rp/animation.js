"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimation = createAnimation;
exports.convertAnimation = convertAnimation;
const collections_1 = require("../static/collections");
/**
 * Create a new Animation
 */
function createAnimation() {
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
function convertAnimation(doc, receiver) {
    const root = doc;
    const container = root['animations'];
    if (!container)
        return;
    for (const [name, value] of Object.entries(container)) {
        const item = createAnimation();
        item.id = name;
        receiver.push(item);
        const anim = value;
        const bones = anim['bones'];
        if (bones) {
            harvestBones(bones, item.bones);
        }
        const sounds = anim['sound_effects'];
        if (sounds) {
            harvestAllEffects(sounds, item.sounds);
        }
        const particles = anim['particle_effects'];
        if (particles) {
            harvestAllEffects(particles, item.particles);
        }
    }
}
/**
 * Collect all the bone names
 */
function harvestBones(root, bones) {
    for (const boneName of Object.keys(root)) {
        (0, collections_1.addOrSkip)(bones, boneName);
    }
}
/**
 * Collects all defined effects: { "0.0": { "effect": "value" } } or { "0.0": [{ "effect": "value" }] }
 */
function harvestAllEffects(root, effects) {
    for (const value of Object.values(root)) {
        harvestEffect(value, effects);
    }
}
/**
 * Collect all the { "effect": "value" } or [{ "effect": "value" }]
 */
function harvestEffect(root, effects) {
    if (Array.isArray(root)) {
        for (const item of root) {
            harvestEffect(item, effects);
        }
        return;
    }
    if (typeof root === 'object' && root !== null) {
        const obj = root;
        const effect = obj['effect'];
        if (effect && effect.trim() !== '') {
            (0, collections_1.addOrSkip)(effects, effect);
        }
    }
}
//# sourceMappingURL=animation.js.map