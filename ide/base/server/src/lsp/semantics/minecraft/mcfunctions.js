"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSemanticToken = provideSemanticToken;
exports.McfunctionLineTokens = McfunctionLineTokens;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const vscode_languageserver_1 = require("vscode-languageserver");
const attributes_1 = require("../../../project/attributes");
const mcfunction_1 = require("../builders/mcfunction");
const constants_1 = require("../constants");
const functions_1 = require("../functions");
const mcfunction_2 = require("../../../util/mcfunction");
const selectors_1 = require("./selectors");
function provideSemanticToken(doc, range) {
    const builder = new mcfunction_1.McfunctionSemanticTokensBuilder(doc);
    let startIndex = 0;
    let endIndex = doc.lineCount;
    if (range) {
        startIndex = range.start.line;
        endIndex = range.end.line;
    }
    for (let I = startIndex; I < endIndex; I++) {
        const line = doc.getLine(I);
        const CommentIndex = (0, mcfunction_2.findCommentStart)(line);
        if (CommentIndex >= 0) {
            builder.AddAt(I, CommentIndex, line.length - CommentIndex, constants_1.SemanticTokensEnum.comment);
        }
        const pos = vscode_languageserver_1.Position.create(I, 0);
        const command = bc_minecraft_bedrock_command_1.Command.parse(line, doc.offsetAt(pos));
        createTokens(command, builder);
    }
    return builder.Build();
}
function McfunctionLineTokens(line, offset, Builder) {
    if (line.startsWith('/')) {
        line = line.substring(1, line.length);
        offset++;
    }
    const command = bc_minecraft_bedrock_command_1.Command.parse(line, offset);
    if (command.getCommandData(true).length <= 0) {
        return;
    }
    createTokens(command, Builder);
}
function createTokens(command, builder) {
    if (command.parameters.length == 0)
        return;
    const edu = (0, attributes_1.IsEducationEnabled)(builder.document.configuration());
    const first = command.parameters[0];
    if (first.text.startsWith('#'))
        return;
    if (command.subType === bc_minecraft_bedrock_command_1.ParameterType.executeSubcommand) {
        builder.AddWord(first, constants_1.SemanticTokensEnum.keyword, constants_1.SemanticModifiersEnum.declaration);
    }
    else {
        builder.AddWord(first, constants_1.SemanticTokensEnum.class);
    }
    const matches = command.getBestMatch(edu);
    if (matches.length == 0)
        return;
    const match = matches[0];
    let max = command.parameters.length;
    if (match.parameters.length < max)
        max = match.parameters.length;
    for (let I = 1; I < max; I++) {
        const data = match.parameters[I];
        const word = command.parameters[I];
        switch (data.type) {
            case bc_minecraft_bedrock_command_1.ParameterType.executeSubcommand:
            case bc_minecraft_bedrock_command_1.ParameterType.command:
                const sub = command.getSubCommand(edu);
                if (sub) {
                    createTokens(sub, builder);
                }
                return;
            case bc_minecraft_bedrock_command_1.ParameterType.boolean:
                builder.AddWord(word, constants_1.SemanticTokensEnum.keyword);
                break;
            //Values
            case bc_minecraft_bedrock_command_1.ParameterType.block:
            case bc_minecraft_bedrock_command_1.ParameterType.entity:
            case bc_minecraft_bedrock_command_1.ParameterType.item:
            case bc_minecraft_bedrock_command_1.ParameterType.particle:
            case bc_minecraft_bedrock_command_1.ParameterType.sound:
            case bc_minecraft_bedrock_command_1.ParameterType.tickingarea:
            case bc_minecraft_bedrock_command_1.ParameterType.structure:
                (0, functions_1.CreateNamespaced)(word, builder);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.coordinate:
            case bc_minecraft_bedrock_command_1.ParameterType.float:
            case bc_minecraft_bedrock_command_1.ParameterType.integer:
            case bc_minecraft_bedrock_command_1.ParameterType.xp:
                (0, functions_1.CreateRangeTokensWord)(word, builder);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.keyword:
                builder.AddWord(word, constants_1.SemanticTokensEnum.method, constants_1.SemanticModifiersEnum.defaultLibrary);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.function:
            case bc_minecraft_bedrock_command_1.ParameterType.string:
                builder.AddWord(word, constants_1.SemanticTokensEnum.string);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.objective:
                builder.AddWord(word, constants_1.SemanticTokensEnum.variable);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.tag:
                builder.AddWord(word, constants_1.SemanticTokensEnum.regexp, constants_1.SemanticModifiersEnum.readonly);
                break;
            case bc_minecraft_bedrock_command_1.ParameterType.operation:
                builder.AddWord(word, constants_1.SemanticTokensEnum.operator);
                break;
            //Modes
            case bc_minecraft_bedrock_command_1.ParameterType.cameraShakeType:
            case bc_minecraft_bedrock_command_1.ParameterType.cloneMode:
            case bc_minecraft_bedrock_command_1.ParameterType.difficulty:
            case bc_minecraft_bedrock_command_1.ParameterType.effect:
            case bc_minecraft_bedrock_command_1.ParameterType.event:
            case bc_minecraft_bedrock_command_1.ParameterType.fillMode:
            case bc_minecraft_bedrock_command_1.ParameterType.gamemode:
            case bc_minecraft_bedrock_command_1.ParameterType.locateFeature:
            case bc_minecraft_bedrock_command_1.ParameterType.maskMode:
            case bc_minecraft_bedrock_command_1.ParameterType.mirror:
            case bc_minecraft_bedrock_command_1.ParameterType.musicRepeatMode:
            case bc_minecraft_bedrock_command_1.ParameterType.replaceMode:
            case bc_minecraft_bedrock_command_1.ParameterType.rideRules:
            case bc_minecraft_bedrock_command_1.ParameterType.rotation:
            case bc_minecraft_bedrock_command_1.ParameterType.saveMode:
            case bc_minecraft_bedrock_command_1.ParameterType.slotType:
            case bc_minecraft_bedrock_command_1.ParameterType.slotID:
            case bc_minecraft_bedrock_command_1.ParameterType.structureAnimationMode:
            case bc_minecraft_bedrock_command_1.ParameterType.teleportRules:
            case bc_minecraft_bedrock_command_1.ParameterType.oldBlockMode:
            case bc_minecraft_bedrock_command_1.ParameterType.time:
                builder.AddWord(word, constants_1.SemanticTokensEnum.enumMember);
                break;
            //json
            case bc_minecraft_bedrock_command_1.ParameterType.blockStates:
            case bc_minecraft_bedrock_command_1.ParameterType.jsonItem:
            case bc_minecraft_bedrock_command_1.ParameterType.jsonRawText:
                break;
            //
            case bc_minecraft_bedrock_command_1.ParameterType.selector:
                (0, selectors_1.CreateSelectorTokens)(word, builder);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=mcfunctions.js.map