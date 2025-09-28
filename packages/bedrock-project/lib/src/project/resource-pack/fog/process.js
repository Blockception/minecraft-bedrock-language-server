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
const Internal = __importStar(require("../../../internal/resource-pack"));
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../types");
const types_2 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const imp = types_1.TextDocument.toObject(doc, Internal.Fog.is);
    if (!imp)
        return undefined;
    const uri = doc.uri;
    const content = doc.getText();
    const container = imp["minecraft:fog_settings"];
    const id = container.description.identifier;
    return {
        id: id,
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        documentation: types_2.Documentation.getDoc(doc, () => `Fog: ${id}`),
    };
}
//# sourceMappingURL=process.js.map