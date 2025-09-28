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
const Internal = __importStar(require("../../../internal/resource-pack"));
const types_1 = require("../../../types");
const references_1 = require("../../../types/references");
const molang_1 = require("../../molang");
const resources_1 = require("../../../internal/resource-pack/resources");
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
    if (!Internal.Entity.is(imp))
        return undefined;
    const description = imp["minecraft:client_entity"].description;
    const id = description.identifier;
    const out = {
        id: id,
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        molang: (0, molang_1.harvestMolang)(content, description),
        animations: references_1.References.wrap((_a = description.animation_controllers) === null || _a === void 0 ? void 0 : _a.flatMap((item) => (typeof item === "string" ? item : Object.getOwnPropertyNames(item)[0])).filter((item) => item !== undefined), undefined),
        documentation: types_1.Documentation.getDoc(doc, () => `Entity: ${id}`),
    };
    (0, resources_1.getUsingResources)(out.molang, imp["minecraft:client_entity"].description, doc);
    //process animations
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(description.animations, (reference, id) => {
        out.animations.defined.add(reference);
        out.animations.using.add(id);
    });
    return out;
}
//# sourceMappingURL=process.js.map