"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const types_1 = require("../../../../types");
const general_info_1 = require("../general-info");
function process(command, doc) {
    //tag <selector> add <tag>
    if (command.parameters[1]?.text !== 'save')
        return undefined;
    const structure = command.parameters[2];
    return general_info_1.GeneralInfo.create(structure.text, bc_minecraft_bedrock_shared_1.Location.create(doc.uri, structure.offset), types_1.Documentation.getDoc(doc, () => `The mcstructure: ${structure.text}`, structure.offset));
}
//# sourceMappingURL=process.js.map