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
const internal = __importStar(require("../../../internal/behavior-pack/entity"));
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
    var _a, _b, _c, _d, _e;
    const uri = doc.uri;
    const content = doc.getText();
    const imp = json_1.Json.To(doc);
    if (!internal.Entity.is(imp))
        return undefined;
    const container = imp["minecraft:entity"];
    const id = container.description.identifier;
    const out = {
        runtime_identifier: (_a = container.description.runtime_identifier) !== null && _a !== void 0 ? _a : "",
        animations: references_1.References.create(),
        documentation: types_1.Documentation.getDoc(doc, () => `BP Entity: ${id}`),
        events: references_1.Defined.wrap(Object.keys((_b = container.events) !== null && _b !== void 0 ? _b : {})),
        families: references_1.Defined.create(),
        groups: references_1.Defined.create(),
        id: id,
        location: bc_minecraft_bedrock_types_1.Types.Location.create(uri, content.indexOf(id)),
        molang: (0, molang_1.harvestMolang)(content, container),
        properties: Object.entries((_d = (_c = container.description) === null || _c === void 0 ? void 0 : _c.properties) !== null && _d !== void 0 ? _d : {}).map(([name, property]) => {
            return { name, ...property };
        }),
    };
    getFamilies(container.components, out.families);
    if (container.component_groups) {
        Object.entries(container.component_groups).forEach(([name, group]) => {
            out.groups.defined.add(name);
            getFamilies(group, out.families);
        });
    }
    //Animations
    Object.entries((_e = container.description.animations) !== null && _e !== void 0 ? _e : {}).forEach(([name, anim]) => {
        out.animations.defined.add(name);
        out.animations.using.add(anim);
    });
    return out;
}
function getFamilies(components, receiver) {
    const families = components["minecraft:type_family"];
    if (type_family.is(families)) {
        references_1.Defined.add(receiver, families.family);
    }
}
var type_family;
(function (type_family) {
    function is(value) {
        if (typeof value === "object" && Array.isArray(value.family)) {
            return true;
        }
        return false;
    }
    type_family.is = is;
})(type_family || (type_family = {}));
//# sourceMappingURL=process.js.map