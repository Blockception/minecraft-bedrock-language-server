"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_get_item = minecraft_get_item;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
function minecraft_get_item(value, doc) {
    const offset = doc.getText().indexOf(value);
    // Remove number from item
    const i = value.lastIndexOf(":");
    if (i > 0) {
        const last = value.slice(i + 1);
        if (bc_minecraft_bedrock_types_1.General.Integer.is(last)) {
            value = value.slice(0, i);
        }
    }
    return { offset: offset, text: value };
}
//# sourceMappingURL=items.js.map