"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../../../types");
const general_info_1 = require("../general-info");
function process(command, doc) {
    var _a;
    //tag <selector> add <tag>
    if (((_a = command.parameters[2]) === null || _a === void 0 ? void 0 : _a.text) !== "add")
        return undefined;
    const tag = command.parameters[3];
    return general_info_1.GeneralInfo.create(tag.text, bc_minecraft_bedrock_types_1.Types.Location.create(doc.uri, tag.offset), types_1.Documentation.getDoc(doc, () => `The tag: ${tag.text}`, command.parameters[0].offset));
}
//# sourceMappingURL=process.js.map