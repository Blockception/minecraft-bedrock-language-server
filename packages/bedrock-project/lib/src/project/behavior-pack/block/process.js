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
const block_state_1 = require("./block-state");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    var _a;
    const uri = doc.uri;
    const content = doc.getText();
    const imp = internal_1.Json.To(doc);
    if (!Internal.Block.is(imp))
        return undefined;
    const container = imp["minecraft:block"];
    const id = container.description.identifier;
    return {
        id: id,
        documentation: types_1.Documentation.getDoc(doc, () => `BP Block: ${id}`),
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        molang: (0, molang_1.harvestMolang)(content, container),
        states: Object.entries((_a = container.description.properties) !== null && _a !== void 0 ? _a : {})
            .map(([prop, values]) => block_state_1.BlockState.create(prop, values))
            .filter((b) => b !== undefined),
    };
}
//# sourceMappingURL=process.js.map