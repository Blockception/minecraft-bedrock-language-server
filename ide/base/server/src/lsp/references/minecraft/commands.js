"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideReferences = provideReferences;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const attributes_1 = require("../../../project/attributes");
const util_1 = require("../../../util");
async function provideReferences(context, value) {
    const { document, position } = context;
    const line = value.text;
    const offset = value.offset;
    const com = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
    const data = com.getBestMatch((0, attributes_1.IsEducationEnabled)(document));
    if (data.length == 0)
        return undefined;
    const cursor = document.offsetAt(position);
    const index = com.findCursorIndex(cursor);
    if (index < 0)
        return;
    const parameter = com.parameters[index];
    const text = parameter.text;
    const types = [];
    //Gets types used
    for (let i = 0; i < data.length; i++) {
        const parameters = data[i].parameters;
        if (parameters.length > index) {
            types.push(parameters[index].type);
        }
    }
    if (types.length == 0)
        return undefined;
    //TODO add selector references
    const references = await context.database.findReferences(text, types, context.token, context.workDoneProgress);
    return util_1.References.convertLocation(references, context.documents);
}
//# sourceMappingURL=commands.js.map