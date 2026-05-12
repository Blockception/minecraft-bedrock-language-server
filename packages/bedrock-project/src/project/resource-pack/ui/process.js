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
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const json_1 = require("../../../internal/json");
const Internal = __importStar(require("../../../internal/resource-pack"));
const types_1 = require("../../../types");
/**
 * Processes a UI definition document and extracts all UI element identifiers,
 * variables, bindings, and inheritance references.
 * @param doc The text document to process
 * @returns An array of UI elements or undefined if the document is not a valid UI file
 */
function process(doc) {
    const uri = doc.uri;
    const content = doc.getText();
    const imp = json_1.Json.To(doc);
    if (!Internal.UI.is(imp))
        return undefined;
    const namespace = imp.namespace;
    const results = [];
    for (const key of Object.keys(imp)) {
        if (key === 'namespace')
            continue;
        const elementDef = imp[key];
        if (typeof elementDef !== 'object' || elementDef === null)
            continue;
        // Parse element name and optional inheritance (@)
        let elementName;
        let extendsRef;
        if (key.includes('@')) {
            const atIdx = key.indexOf('@');
            elementName = key.substring(0, atIdx);
            extendsRef = key.substring(atIdx + 1);
        }
        else {
            elementName = key;
        }
        const id = namespace ? `${namespace}.${elementName}` : elementName;
        // Extract variables ($-prefixed keys from the element definition)
        const variables = new Set();
        for (const prop of Object.keys(elementDef)) {
            if (prop.startsWith('$')) {
                variables.add(prop);
            }
        }
        // Extract binding names from the bindings array
        const bindings = new Set();
        const bindingsArr = elementDef.bindings;
        if (Array.isArray(bindingsArr)) {
            for (const binding of bindingsArr) {
                if (typeof binding === 'object' && binding !== null) {
                    const bindingName = binding.binding_name;
                    if (typeof bindingName === 'string') {
                        bindings.add(bindingName);
                    }
                }
            }
        }
        results.push({
            id,
            location: bc_minecraft_bedrock_shared_1.Location.create(uri, content.indexOf(key)),
            documentation: types_1.Documentation.getDoc(doc, () => `UI Element: ${id}`),
            variables,
            bindings,
            extends: extendsRef,
        });
    }
    return results.length > 0 ? results : undefined;
}
//# sourceMappingURL=process.js.map