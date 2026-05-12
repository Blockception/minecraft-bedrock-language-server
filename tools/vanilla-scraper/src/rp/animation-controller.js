"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimationController = createAnimationController;
exports.convertAnimationController = convertAnimationController;
const collections_1 = require("../static/collections");
/**
 * Create a new AnimationController
 */
function createAnimationController() {
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
function convertAnimationController(doc, receiver) {
    const root = doc;
    const container = root['animation_controllers'];
    if (!container)
        return;
    for (const [name, value] of Object.entries(container)) {
        const item = createAnimationController();
        item.id = name;
        receiver.push(item);
        const anim = value;
        const states = anim['states'];
        if (states) {
            harvestStates(states, item);
        }
    }
}
/**
 * Harvest data from animation controller states
 */
function harvestStates(states, receiver) {
    for (const state of Object.values(states)) {
        harvestState(state, receiver);
    }
}
/**
 * Harvest data from a single state
 */
function harvestState(state, receiver) {
    const animations = state['animations'];
    if (animations) {
        harvestConditionals(animations, receiver.animations);
    }
    const particleEffects = state['particle_effects'];
    if (particleEffects) {
        harvestConditionals(particleEffects, receiver.particles);
    }
    const soundEffects = state['sound_effects'];
    if (soundEffects) {
        harvestConditionals(soundEffects, receiver.sounds);
    }
}
/**
 * Harvest keys from: [{ "<key>": "<value>" }, "<key>"]
 */
function harvestConditionals(conditionals, keys) {
    if (Array.isArray(conditionals)) {
        for (const item of conditionals) {
            harvestConditionals(item, keys);
        }
        return;
    }
    if (typeof conditionals === 'object' && conditionals !== null) {
        const obj = conditionals;
        const firstKey = Object.keys(obj)[0];
        if (firstKey && firstKey.trim() !== '') {
            (0, collections_1.addOrSkip)(keys, firstKey);
        }
        return;
    }
    if (typeof conditionals === 'string' && conditionals.trim() !== '') {
        (0, collections_1.addOrSkip)(keys, conditionals);
    }
}
//# sourceMappingURL=animation-controller.js.map