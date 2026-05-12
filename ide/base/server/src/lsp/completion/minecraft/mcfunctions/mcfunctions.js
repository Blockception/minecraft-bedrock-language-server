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
exports.provideCompletion = provideCompletion;
exports.provideCompletionLine = provideCompletionLine;
exports.provideCompletionCommand = provideCompletionCommand;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const vscode_languageserver_1 = require("vscode-languageserver");
const attributes_1 = require("../../../../project/attributes");
const context_1 = require("../../../context/context");
const mcfunction_1 = require("../../../../util/mcfunction");
const CCommand = __importStar(require("../commands/commands"));
const Parameter = __importStar(require("../commands/parameters"));
/**
 *
 * @param context
 * @param pos
 * @returns
 */
function provideCompletion(context) {
    const { document, position, cursor } = context;
    const lineIndex = position.line;
    const line = document.getLine(lineIndex);
    const commandIndex = (0, mcfunction_1.findCommentStart)(line);
    if (commandIndex >= 0) {
        if (position.character > commandIndex)
            return;
    }
    if (lineIndex === 0 && position.character < 3) {
        context.builder.add({
            label: '# <mcfunction_documentation_here>',
            documentation: 'mcfunction documentation',
            kind: vscode_languageserver_1.CompletionItemKind.Snippet,
        });
        context.builder.add({
            label: '# region',
            documentation: 'mcfunction documentation',
            kind: vscode_languageserver_1.CompletionItemKind.Snippet,
            insertText: '# region\n# endregion',
        });
    }
    const offset = document.offsetAt({ character: 0, line: lineIndex });
    let command = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
    let subCommmand = command.isInSubCommand(cursor);
    while (subCommmand) {
        if (subCommmand) {
            command = subCommmand;
        }
        subCommmand = command.isInSubCommand(cursor);
    }
    provideCompletionCommand(context, command);
}
/**
 *
 * @param context
 * @param text
 * @param cursor
 * @param offset
 */
function provideCompletionLine(context, text, offset) {
    const command = bc_minecraft_bedrock_command_1.Command.parse(text, offset);
    provideCompletionCommand(context, command);
}
/**
 *
 * @param context
 * @param cursor
 * @param command
 * @returns
 */
function provideCompletionCommand(context, command) {
    const { cursor, document } = context;
    if (command == undefined || command.parameters.length == 0 || cursor < command.parameters[0].offset + 3) {
        CCommand.provideCompletion(context);
        return;
    }
    const eduEnabled = (0, attributes_1.IsEducationEnabled)(document);
    const matches = command.getBestMatch(eduEnabled);
    if (matches.length === 0) {
        if (cursor < 10)
            CCommand.provideCompletion(context);
        return;
    }
    const parameterIndex = command.findCursorIndex(cursor);
    const current = command.parameters[parameterIndex];
    const bestMatch = command.getBestMatch(eduEnabled)[0];
    for (let I = 0; I < matches.length; I++) {
        const Match = matches[I];
        if (Match.obsolete) {
            continue;
        }
        if (Match.parameters.length > parameterIndex) {
            const parameter = Match.parameters[parameterIndex];
            const ncontext = context_1.Context.modify(context, {
                command,
                current,
                parameter,
                parameterIndex,
                bestMatch,
            });
            Parameter.provideCompletion(ncontext);
        }
    }
}
//# sourceMappingURL=mcfunctions.js.map