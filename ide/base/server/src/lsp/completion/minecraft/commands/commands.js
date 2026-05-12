"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
exports.provideExecuteSubcommandCompletion = provideExecuteSubcommandCompletion;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const constants_1 = require("../../../../constants");
const attributes_1 = require("../../../../project/attributes");
/**
 *
 * @param receiver
 */
function provideCompletion(context) {
    const edu = (0, attributes_1.IsEducationEnabled)(context.document);
    Object.values(bc_minecraft_bedrock_command_1.CommandData.Vanilla).forEach((data) => getCompletion(data, context.builder));
    if (edu)
        Object.values(bc_minecraft_bedrock_command_1.CommandData.Edu).forEach((data) => getCompletion(data, context.builder));
}
function provideExecuteSubcommandCompletion(context) {
    Object.values(bc_minecraft_bedrock_command_1.CommandData.ExecuteSubcommands).forEach((data) => getCompletion(data, context.builder));
}
/**
 *
 * @param Data
 * @param receiver
 */
function getCompletion(Data, receiver) {
    for (let I = 0; I < Data.length; I++) {
        const CInfo = Data[I];
        if (CInfo.obsolete)
            continue;
        const doc = `## ${CInfo.name}\n${CInfo.documentation}\n[documentation](https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/${CInfo.name})`;
        receiver.add({ label: CInfo.name, documentation: doc, kind: constants_1.Kinds.Completion.Command });
        break;
    }
}
//# sourceMappingURL=commands.js.map