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
const Internal = __importStar(require("../../../internal/behavior-pack/feature"));
const json_1 = require("../../../internal/json");
const types_1 = require("../../../types");
/**
 *
 * @param doc
 * @returns
 */
function process(doc) {
    const uri = doc.uri;
    const content = doc.getText();
    const imp = json_1.Json.To(doc);
    if (!Internal.Feature.is(imp))
        return undefined;
    const key = Object.keys(imp).find((x) => !x.startsWith("format_version"));
    if (key === undefined)
        return;
    const container = imp[key];
    if (container === undefined || typeof container === "string")
        return;
    const id = container.description.identifier;
    return {
        id: id,
        documentation: types_1.Documentation.getDoc(doc, () => `Feature: ${id}`),
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        type: key,
    };
}
//# sourceMappingURL=process.js.map