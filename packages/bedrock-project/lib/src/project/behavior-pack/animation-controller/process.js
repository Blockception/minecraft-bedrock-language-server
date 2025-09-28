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
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const Internal = __importStar(require("../../../internal/behavior-pack/animation-controller"));
const json_1 = require("../../../internal/json");
const types_1 = require("../../../types");
const references_1 = require("../../../types/references");
const molang_1 = require("../../molang");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    const content = doc.getText();
    const imp = json_1.Json.To(doc);
    if (!Internal.AnimationControllers.is(imp))
        return undefined;
    return Object.entries(imp.animation_controllers)
        .filter(([, controller]) => Internal.AnimationController.is(controller))
        .map(([id, controller]) => {
        const item = {
            id: id,
            animations: references_1.References.create(),
            documentation: types_1.Documentation.getDoc(doc, () => `BP Animation Controller: ${id}`),
            events: references_1.Using.create(),
            location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
            molang: (0, molang_1.harvestMolang)(content, controller),
        };
        Object.values(controller.states).forEach((state) => {
            var _a, _b;
            bc_minecraft_bedrock_types_1.Types.Conditional.forEach(state.animations, (reference) => item.animations.using.add(reference));
            references_1.Using.add(item.events, (_a = state.on_entry) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.startsWith("@s ")).map((entry) => entry.slice(3)));
            references_1.Using.add(item.events, (_b = state.on_exit) === null || _b === void 0 ? void 0 : _b.filter((entry) => entry.startsWith("@s ")).map((entry) => entry.slice(3)));
        });
        return item;
    });
}
//# sourceMappingURL=process.js.map