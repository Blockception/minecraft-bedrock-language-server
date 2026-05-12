"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeaction_execute_deprecated = codeaction_execute_deprecated;
const ide_shared_1 = require("@blockception/ide-shared");
const vscode_languageserver_1 = require("vscode-languageserver");
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
/**
 * Code action for `minecraft.commands.execute.deprecated`
 * @param builder
 * @param diag
 * @returns
 */
function codeaction_execute_deprecated(builder, diag) {
    const document = builder.context.document;
    if (document.languageId !== ide_shared_1.Languages.McFunctionIdentifier)
        return;
    const line = document.getLine(diag.range.start.line);
    const offset = document.offsetAt(diag.range.start);
    let command = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
    const cursor = document.offsetAt(diag.range.start);
    let subCommand = command.isInSubCommand(cursor);
    while (subCommand) {
        if (subCommand) {
            command = subCommand;
        }
        subCommand = command.isInSubCommand(cursor);
    }
    if (command.parameters.length < 4)
        return;
    const [keyword, selector, x, y, z, detect] = command.parameters;
    if (keyword.text !== 'execute')
        return;
    if (!selector.text.startsWith('@'))
        return;
    // execute <selector> <x> <y> <z>
    // execute as @a at @s positioned x y z
    if (detect.text === 'detect')
        return;
    let newCommand = `execute as ${selector.text} at @s positioned ${x.text} ${y.text} ${z.text} run`;
    //Get full range
    const range = diag.range;
    const offsetRange = keyword.offset;
    range.end.character = range.start.character + (z.offset - offsetRange) + z.text.length;
    const id = { uri: document.uri, version: document.version };
    const edit = vscode_languageserver_1.TextEdit.replace(diag.range, newCommand);
    const docEdit = vscode_languageserver_1.TextDocumentEdit.create(id, [edit]);
    //Optimize
    newCommand = newCommand.replace('positioned ~ ~ ~ run', 'run');
    const action = {
        title: `Upgrade to new execute command: '${newCommand}'`,
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        edit: {
            documentChanges: [docEdit],
        },
    };
    builder.push(action);
}
//# sourceMappingURL=command-execute.js.map