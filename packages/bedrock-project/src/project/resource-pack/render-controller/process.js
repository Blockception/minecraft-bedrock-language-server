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
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const Internal = __importStar(require("../../../internal/resource-pack/render-controller"));
const types_1 = require("../../../types");
const molang_1 = require("../../molang");
/** Constant for the array scope identifier used in render controller arrays */
const ARRAY_SCOPE = 'array';
/**
 * Extracts array definitions from render controller arrays section and adds them to the molang set
 * @param controller The render controller object
 * @param content The full document content for position tracking
 * @param molangSet The molang set to add array definitions to
 */
function extractArrayDefinitions(controller, content, molangSet) {
    if (!controller.arrays)
        return;
    // Process each array category (materials, geometries, textures)
    const categories = ['materials', 'geometries', 'textures'];
    for (const category of categories) {
        const arraySpec = controller.arrays[category];
        if (!arraySpec)
            continue;
        // Each key in the ArraySpec is an array name following the format "Scope.name"
        // For example: "Array.skins", "Array.variants", etc.
        for (const arrayName of Object.keys(arraySpec)) {
            // Find the position of this array name in the content
            // Note: Using indexOf is a simple approach that works well for typical render controller files
            // where array names are unique. More sophisticated approaches (like JSON path tracking)
            // could be used for edge cases, but are not necessary for standard use.
            const position = content.indexOf(arrayName);
            if (position === -1)
                continue;
            // Parse the array name to extract scope and name parts
            // Expected format: "Array.name" where "Array" is the scope and "name" is the identifier
            const parts = arrayName.split('.');
            if (parts.length < 2) {
                // Invalid format - array names should be at least "Scope.name"
                continue;
            }
            const scopePrefix = parts[0].toLowerCase();
            const arrayIdentifier = parts[1];
            // Only process if it's an array scope (e.g., "Array.skins")
            // Other scopes like "Texture" or "Material" are not array definitions
            if (scopePrefix !== ARRAY_SCOPE)
                continue;
            // Create a VariableNode for the array definition
            const arrayNode = {
                type: bc_minecraft_molang_1.NodeType.Variable,
                scope: ARRAY_SCOPE,
                names: [arrayIdentifier],
                position: position,
            };
            // Add to the assigned set (indicating this array is defined)
            molangSet.assigned.add(arrayNode);
        }
    }
}
/** */
function process(doc) {
    const imp = types_1.TextDocument.toObject(doc, Internal.RenderControllers.is);
    if (!imp)
        return undefined;
    const uri = doc.uri;
    const content = doc.getText();
    return Object.entries(imp.render_controllers).map(([id, controller]) => {
        const molangSet = (0, molang_1.harvestMolang)(content, controller);
        // Extract and add array definitions to the molang set
        extractArrayDefinitions(controller, content, molangSet);
        return {
            id: id,
            location: bc_minecraft_bedrock_shared_1.Location.create(uri, content.indexOf(id)),
            molang: molangSet,
            documentation: types_1.Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
        };
    });
}
//# sourceMappingURL=process.js.map