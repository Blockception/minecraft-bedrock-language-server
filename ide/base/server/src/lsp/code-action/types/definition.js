"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definition = definition;
exports.attributes = attributes;
const ide_shared_1 = require("@blockception/ide-shared");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../../../util");
/**
 * Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
function definition(builder, diag, type) {
    const document = builder.context.document;
    const value = document.getText(diag.range);
    const ws = builder.context.database.WorkspaceData.getFolder(document.uri);
    if (!ws) {
        builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
        return;
    }
    const uri = util_1.Vscode.join(ws, bc_minecraft_project_1.MCDefinition.filename);
    const command = {
        title: `Add ${value} as ${type} to MCDefinitions`,
        command: ide_shared_1.Commands.Files.Append,
        arguments: [uri, `${type}=${value}`],
    };
    const action = {
        title: command.title,
        command: command,
        diagnostics: [diag],
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        isPreferred: false,
    };
    builder.push(action);
}
/**Adds a given type and value to the definition
 * @param builder
 * @param diag
 * @param type
 */
function attributes(builder, diag) {
    const document = builder.context.document;
    if (!document)
        return;
    const ws = builder.context.database.WorkspaceData.getFolder(document.uri);
    const key = diag.code ?? '';
    if (typeof key === 'undefined' || key === '')
        return;
    if (!ws) {
        builder.context.logger.error(`Couldn't find workspace for: ${document.uri}`);
        return;
    }
    const uri = util_1.Vscode.join(ws, bc_minecraft_project_1.MCAttributes.filename);
    const command = {
        title: `Disable diagnostic code in project: ${key}`,
        command: ide_shared_1.Commands.Files.Append,
        arguments: [uri, `diagnostic.disable.${key}=true`],
    };
    const action = {
        title: command.title,
        command: command,
        diagnostics: [diag],
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        isPreferred: false,
    };
    builder.push(action);
    // Add quick fix to disable in current file
    addDisableInFile(builder, diag);
    // Add quick fix to disable on next line
    addDisableNextLine(builder, diag);
}
/**
 * Adds a quick fix to disable a diagnostic code for the entire file
 * @param builder
 * @param diag
 */
function addDisableInFile(builder, diag) {
    const document = builder.context.document;
    if (!document)
        return;
    const key = diag.code ?? '';
    if (typeof key === 'undefined' || key === '')
        return;
    // Insert at the beginning of the file
    const edit = vscode_languageserver_1.TextEdit.insert({ line: 0, character: 0 }, `// mc-disable ${key}\n`);
    const action = {
        title: `Disable '${key}' for this file`,
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        diagnostics: [diag],
        isPreferred: false,
        edit: {
            changes: {
                [document.uri]: [edit],
            },
        },
    };
    builder.push(action);
}
/**
 * Adds a quick fix to disable a diagnostic code for the next line
 * @param builder
 * @param diag
 */
function addDisableNextLine(builder, diag) {
    const document = builder.context.document;
    if (!document)
        return;
    const key = diag.code ?? '';
    if (typeof key === 'undefined' || key === '')
        return;
    // Get the line before the diagnostic
    const line = diag.range.start.line;
    // Get the indentation of the current line
    const currentLineText = document.getText({
        start: { line, character: 0 },
        end: { line: line + 1, character: 0 },
    }).replace(/\n$/, ''); // Remove trailing newline
    const indent = currentLineText.match(/^(\s*)/)?.[1] ?? '';
    // Insert on the line before the diagnostic
    const edit = vscode_languageserver_1.TextEdit.insert({ line, character: 0 }, `${indent}// mc-disable-next-line ${key}\n`);
    const action = {
        title: `Disable '${key}' for this line`,
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        diagnostics: [diag],
        isPreferred: false,
        edit: {
            changes: {
                [document.uri]: [edit],
            },
        },
    };
    builder.push(action);
}
//# sourceMappingURL=definition.js.map