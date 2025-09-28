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
const Internal = __importStar(require("../../../internal/resource-pack"));
const types_1 = require("../../../types");
const references_1 = require("../../../types/references");
const molang_1 = require("../../molang");
/** */
function process(doc) {
    var _a, _b;
    const imp = types_1.TextDocument.toObject(doc, Internal.Animations.is);
    if (!imp)
        return undefined;
    const uri = doc.uri;
    const content = doc.getText();
    const out = [];
    const container = imp.animations;
    const keys = Object.getOwnPropertyNames(container);
    for (let I = 0; I < keys.length; I++) {
        const id = keys[I];
        const anim = container[id];
        if (!Internal.Animation.is(anim))
            continue;
        const item = {
            id: id,
            location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
            molang: (0, molang_1.harvestMolang)(content, anim),
            documentation: types_1.Documentation.getDoc(doc, () => { var _a, _b; return `RP Animation: '${id}', loop: ${(_a = anim.loop) !== null && _a !== void 0 ? _a : false}, length: ${(_b = anim.animation_length) !== null && _b !== void 0 ? _b : "unknown"}`; }),
            particles: references_1.Using.wrap(Object.values((_a = anim.particle_effects) !== null && _a !== void 0 ? _a : {})
                .filter((e) => e !== undefined)
                .flatMap((e) => (Array.isArray(e) ? e : [e]))
                .map((e) => e === null || e === void 0 ? void 0 : e.effect)
                .filter((e) => e !== undefined)),
            sounds: references_1.Using.wrap(Object.values((_b = anim.sound_effects) !== null && _b !== void 0 ? _b : {})
                .filter((e) => e !== undefined)
                .flatMap((e) => (Array.isArray(e) ? e : [e]))
                .map((value) => value.effect)
                .filter((e) => e !== undefined)),
        };
        out.push(item);
    }
    return out;
}
//# sourceMappingURL=process.js.map