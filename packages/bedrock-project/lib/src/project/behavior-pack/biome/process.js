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
const Internal = __importStar(require("../../../internal/behavior-pack/biome"));
const json_1 = require("../../../internal/json");
const types_1 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    var _a;
    const uri = doc.uri;
    const content = doc.getText();
    const biome = json_1.Json.To(doc);
    if (!Internal.Biome.is(biome))
        return undefined;
    const id = biome["minecraft:biome"].description.identifier;
    const tagComp = (_a = biome["minecraft:biome"]) === null || _a === void 0 ? void 0 : _a.components["minecraft:tags"];
    return {
        id: id,
        documentation: types_1.Documentation.getDoc(doc, () => `Biome: ${id}`),
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        tags: types_1.Defined.wrap(Array.isArray(tagComp) ? tagComp : Array.isArray(tagComp.tags) ? tagComp.tags : []),
    };
}
//# sourceMappingURL=process.js.map