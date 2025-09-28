"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_animation_controllers = general_animation_controllers;
exports.general_animation_controller = general_animation_controller;
exports.general_animation_controllers_implementation = general_animation_controllers_implementation;
const types_1 = require("../../types");
const diagnostics_1 = require("../molang/diagnostics");
/**
 *
 * @param data
 * @param diagnoser
 */
function general_animation_controllers(data, diagnoser) {
    Object.entries(data.animation_controllers).forEach(([controller_id, controller]) => general_animation_controller(controller_id, controller, diagnoser));
}
/**
 *
 * @param controller
 * @param controller_id
 * @param diagnoser
 */
function general_animation_controller(controller_id, controller, diagnoser) {
    //Check if initial_state points to existing state
    if (controller.initial_state) {
        const initial_state = controller.initial_state;
        if (controller.states[initial_state] === undefined) {
            diagnoser.add(`${controller_id}/initial_state/${initial_state}`, "Cannot find initial state, minecraft will revert to state at 0 index", types_1.DiagnosticSeverity.warning, "minecraft.animation_controller.state.missing");
        }
    }
    const states = Object.keys(controller.states);
    const transitionedStates = new Set();
    //Check states
    Object.values(controller.states)
        .filter((state) => Array.isArray(state === null || state === void 0 ? void 0 : state.transitions))
        .map((state) => checkTransition(controller_id, state.transitions, controller.states, diagnoser))
        .flatMap((transitions) => transitions)
        .forEach((trans) => transitionedStates.add(trans));
    states.forEach((state) => {
        if (!transitionedStates.has(state) && controller.initial_state != state) {
            diagnoser.add(`${controller_id}/${state}`, `"${state}" state is never reached.`, types_1.DiagnosticSeverity.info, "minecraft.animation_controller.state.never_reached");
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
function checkTransition(controller, transitions, states, diagnoser) {
    const transitionedStates = [];
    //Loop over the transitions
    for (let I = 0; I < transitions.length; I++) {
        const trans = transitions[I];
        //Get state identification refered
        const state = typeof trans === "string" ? trans : Object.getOwnPropertyNames(trans)[0];
        //check is map contains any value
        if (states[state] === undefined) {
            diagnoser.add(controller + "/states/" + state, `missing state defined by transition: ${state}`, types_1.DiagnosticSeverity.error, "minecraft.animation_controller.state.missing");
        }
        else
            transitionedStates.push(state);
    }
    return transitionedStates;
}
function general_animation_controllers_implementation(user, controller, diagnoser) {
    var _a;
    //for each animation, check if the defined animation is also used
    (_a = controller === null || controller === void 0 ? void 0 : controller.animations.using) === null || _a === void 0 ? void 0 : _a.forEach((anim_id) => {
        var _a;
        if ((_a = user.animations) === null || _a === void 0 ? void 0 : _a.defined.has(anim_id))
            return;
        diagnoser.add(`${user.id}/${controller.id}`, `Animation controller (${controller.id}) is using animation: '${anim_id}' but ${user.id} has nothing defined that matches the given key\nMinecraft will still run but might return null errors on the animation`, types_1.DiagnosticSeverity.warning, "minecraft.animation_controller.animation.undefined");
    });
    //Molang
    (0, diagnostics_1.diagnose_molang_implementation)(user, controller, diagnoser);
}
//# sourceMappingURL=animation-controllers.js.map