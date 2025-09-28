"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessMcFunction = ProcessMcFunction;
exports.ProcessAnimationCommands = ProcessAnimationCommands;
exports.ProcessAnimationControllerCommands = ProcessAnimationControllerCommands;
exports.processEntityCommands = processEntityCommands;
exports.ProcessCommand = ProcessCommand;
exports.ProcessCommandAt = ProcessCommandAt;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const internal_1 = require("../../../../internal");
const Internal = __importStar(require("../../../../internal"));
const Objective = __importStar(require("../objective/process"));
const Structure = __importStar(require("../structures/process"));
const Tag = __importStar(require("../tag/process"));
const TickingArea = __importStar(require("../tickingarea/process"));
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
function ProcessMcFunction(doc, receiver) {
    const text = doc.getText();
    const lines = text.split("\n");
    for (let I = 0; I < lines.length; I++) {
        ProcessCommand(lines[I].trim(), doc, receiver);
    }
}
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
function ProcessAnimationCommands(doc, receiver) {
    const imp = internal_1.Json.To(doc);
    if (!Internal.BehaviorPack.Animations.is(imp))
        return;
    //For each animation
    Object.values(imp.animations).forEach((anim) => {
        var _a;
        //For each timeline object
        Object.values((_a = anim.timeline) !== null && _a !== void 0 ? _a : {})
            .flatMap((item) => (typeof item === "string" ? [item] : item))
            .forEach((time) => InternalJsonValue(time, doc, receiver));
    });
}
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
function ProcessAnimationControllerCommands(doc, receiver) {
    const imp = internal_1.Json.To(doc);
    if (!Internal.BehaviorPack.AnimationControllers.is(imp))
        return;
    //for each controller
    Object.values(imp.animation_controllers).forEach((anim) => {
        //for each state
        Object.values(anim.states).forEach((state) => {
            var _a, _b;
            (_a = state.on_entry) === null || _a === void 0 ? void 0 : _a.forEach((p) => InternalJsonValue(p, doc, receiver));
            (_b = state.on_exit) === null || _b === void 0 ? void 0 : _b.forEach((p) => InternalJsonValue(p, doc, receiver));
        });
    });
}
function processEntityCommands(doc, receiver) {
    var _a, _b;
    const imp = internal_1.Json.To(doc);
    if (!Internal.BehaviorPack.Entity.is(imp))
        return;
    Object.values((_b = (_a = imp["minecraft:entity"]) === null || _a === void 0 ? void 0 : _a.events) !== null && _b !== void 0 ? _b : {})
        .map((event) => { var _a; return (_a = event.queue_command) === null || _a === void 0 ? void 0 : _a.command; })
        .filter((comm) => comm !== undefined)
        .flatMap((comm) => (!Array.isArray(comm) ? [comm] : comm))
        .forEach((c) => InternalJsonValue(c, doc, receiver));
}
function InternalJsonValue(prop, doc, receiver) {
    if (prop.startsWith("/")) {
        const offset = doc.getText().indexOf(prop);
        ProcessCommandAt(prop, offset, doc, receiver);
    }
}
/**
 *
 * @param line
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
function ProcessCommand(line, doc, receiver) {
    if (line.startsWith("#") || line.length < 3)
        return;
    const offset = doc.getText().indexOf(line);
    return ProcessCommandAt(line, offset, doc, receiver);
}
/**
 *
 * @param line
 * @param offset
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
function ProcessCommandAt(line, offset, doc, receiver) {
    if (line.startsWith("#"))
        return;
    if (line.startsWith("/"))
        line = line.substring(1);
    let command = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
    while (command) {
        if (command.parameters.length === 0)
            break;
        switch (command != undefined && command.parameters[0].text) {
            case "tag":
                receiver.tags.set(Tag.process(command, doc));
                break;
            case "scoreboard":
                Objective.process(command, doc, receiver);
                break;
            case "structure":
                receiver.structures.set(Structure.process(command, doc));
                break;
            case "tickingarea":
                receiver.tickingAreas.set(TickingArea.process(command, doc));
                break;
        }
        command = command.getSubCommand(true);
    }
}
//# sourceMappingURL=process.js.map