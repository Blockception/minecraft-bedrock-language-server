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
const internal_1 = require("../../../internal");
const Internal = __importStar(require("../../../internal/behavior-pack"));
const types_1 = require("../../../types");
const molang_1 = require("../../molang");
/** */
function process(doc) {
    const uri = doc.uri;
    const content = doc.getText();
    const imp = internal_1.Json.To(doc);
    if (!Internal.Animations.is(imp))
        return undefined;
    const container = imp.animations;
    return Object.entries(container)
        .filter(([, anim]) => Internal.Animation.is(anim))
        .map(([id, anim]) => {
        var _a;
        return {
            id: id,
            location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
            molang: (0, molang_1.harvestMolang)(content, anim),
            documentation: types_1.Documentation.getDoc(doc, () => { var _a, _b; return `BP Animation: \`${id}\`, loop: ${(_a = anim.loop) !== null && _a !== void 0 ? _a : false}, length: ${(_b = anim.animation_length) !== null && _b !== void 0 ? _b : "unknown"}`; }),
            events: types_1.Using.wrap(Object.values((_a = anim.timeline) !== null && _a !== void 0 ? _a : {})
                .flatMap((keyframe) => (typeof keyframe == "string" ? [keyframe] : keyframe))
                .filter((entry) => entry.startsWith("@s "))
                .map((entry) => entry.slice(3))),
        };
    });
}
//# sourceMappingURL=process.js.map