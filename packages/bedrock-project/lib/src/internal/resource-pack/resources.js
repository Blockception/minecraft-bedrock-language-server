"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsingResources = getUsingResources;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
function getUsingResources(receiver, source, document) {
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(source.geometry, (reference) => {
        receiver.assigned.add({
            scope: "geometry",
            names: [reference],
            position: document.getText().indexOf(`"${reference}"`),
            type: bc_minecraft_molang_1.NodeType.ResourceReference,
        });
    });
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(source.materials, (reference) => {
        receiver.assigned.add({
            scope: "material",
            names: [reference],
            position: document.getText().indexOf(`"${reference}"`),
            type: bc_minecraft_molang_1.NodeType.ResourceReference,
        });
    });
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(source.materials, (reference) => {
        receiver.assigned.add({
            scope: "texture",
            names: [reference],
            position: document.getText().indexOf(`"${reference}"`),
            type: bc_minecraft_molang_1.NodeType.ResourceReference,
        });
    });
}
//# sourceMappingURL=resources.js.map