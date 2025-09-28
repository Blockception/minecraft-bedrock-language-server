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
function process(doc) {
    var _a, _b;
    const uri = doc.uri;
    const content = doc.getText();
    const imp = internal_1.Json.To(doc);
    if (!Internal.BlockCulling.is(imp))
        return undefined;
    const id = imp["minecraft:block_culling_rules"].description.identifier;
    if (typeof id !== "string")
        return undefined;
    return {
        id: id,
        affected_bones: types_1.Defined.wrap((_b = (_a = imp["minecraft:block_culling_rules"]) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.map((r) => { var _a; return (_a = r === null || r === void 0 ? void 0 : r.geometry_part) === null || _a === void 0 ? void 0 : _a.bone; }).filter((b) => b !== undefined)),
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        documentation: types_1.Documentation.getDoc(doc, () => `Block culling rule: ${id}`),
    };
}
//# sourceMappingURL=process.js.map