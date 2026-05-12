"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttribute = getAttribute;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
function getAttribute(attr, selector) {
    const sel = bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.parse(selector);
    if (sel === undefined)
        return [];
    const types = sel.get(attr).map((attr) => {
        return attr.isString() ? attr.value : '';
    });
    return types;
}
//# sourceMappingURL=selectors.js.map