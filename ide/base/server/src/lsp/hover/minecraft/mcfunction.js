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
exports.provideHover = provideHover;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const vscode_languageserver_1 = require("vscode-languageserver");
const attributes_1 = require("../../../project/attributes");
const RawText = __importStar(require("./json-raw-text"));
function provideHover(context) {
    const { params, document } = context;
    const cursor = document.offsetAt(params.position);
    const LineIndex = params.position.line;
    const Line = document.getLine(LineIndex);
    const offset = document.offsetAt({ character: 0, line: LineIndex });
    const Edu = (0, attributes_1.IsEducationEnabled)(document);
    let command = bc_minecraft_bedrock_command_1.Command.parse(Line, offset);
    let subCommand = command.isInSubCommand(cursor, Edu);
    while (subCommand) {
        command = subCommand;
        subCommand = subCommand.isInSubCommand(cursor, Edu);
    }
    const data = command.getBestMatch(Edu);
    if (data.length >= 1) {
        const info = data[0];
        const parameters = info.parameters;
        const index = command.findCursorIndex(cursor);
        if (parameters.length > index) {
            const parameterInfo = parameters[index];
            const parameter = command.parameters[index];
            if (parameter) {
                const pdoc = bc_minecraft_bedrock_command_1.ParameterTypeDocumentation[parameterInfo.type] ?? '';
                const r = vscode_languageserver_1.Range.create(document.positionAt(parameter.offset), document.positionAt(parameter.offset + parameter.text.length));
                if (index == 0) {
                    return { contents: `## ${info.name}\n${info.documentation}\n${pdoc}`, range: r };
                }
                else {
                    return GetHoverContent(context, parameterInfo, r, parameter.text, pdoc);
                }
            }
        }
    }
    return undefined;
}
/**
 *
 * @param parameter
 * @param range
 * @param text
 * @returns
 */
function GetHoverContent(context, parameter, range, text, additional) {
    const { database } = context;
    switch (parameter.type) {
        case bc_minecraft_bedrock_command_1.ParameterType.block:
            return getDocumentation(text, range, database.ProjectData.behaviorPacks.blocks, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.entity:
            return getDocumentation(text, range, database.ProjectData.behaviorPacks.entities, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.function:
            return getDocumentation(text, range, database.ProjectData.behaviorPacks.functions, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.jsonRawText:
            return RawText.provideHover(range);
        case bc_minecraft_bedrock_command_1.ParameterType.objective:
            return getDocumentation(text, range, database.ProjectData.general.objectives, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.particle:
            return getDocumentation(text, range, database.ProjectData.resourcePacks.particles, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.sound:
            return getDocumentation(text, range, database.ProjectData.resourcePacks.sounds, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.tag:
            return getDocumentation(text, range, database.ProjectData.general.tags, additional);
        case bc_minecraft_bedrock_command_1.ParameterType.tickingarea:
            return getDocumentation(text, range, database.ProjectData.general.tickingAreas, additional);
    }
    const title = parameter.text;
    const doc = `## ${title}\n${GetString(parameter.type) ?? ''}\n${additional}`;
    return { contents: { kind: 'markdown', value: doc }, range: range };
}
function GetString(type) {
    switch (type) {
        case bc_minecraft_bedrock_command_1.ParameterType.boolean:
            return 'A boolean value (true or false)';
        case bc_minecraft_bedrock_command_1.ParameterType.command:
            return 'A sub command to execute';
        case bc_minecraft_bedrock_command_1.ParameterType.coordinate:
            return 'A coordinate';
        case bc_minecraft_bedrock_command_1.ParameterType.effect:
            return 'A effect identifier';
        case bc_minecraft_bedrock_command_1.ParameterType.event:
            return 'A event';
        case bc_minecraft_bedrock_command_1.ParameterType.float:
            return 'A float number';
        case bc_minecraft_bedrock_command_1.ParameterType.gamemode:
            return 'A minecraft gamemode';
        case bc_minecraft_bedrock_command_1.ParameterType.integer:
            return 'An integer number';
        case bc_minecraft_bedrock_command_1.ParameterType.item:
            return 'An item identifier';
        case bc_minecraft_bedrock_command_1.ParameterType.jsonItem:
            return 'The json schema for items';
        case bc_minecraft_bedrock_command_1.ParameterType.locateFeature:
            return 'A locate feature';
        case bc_minecraft_bedrock_command_1.ParameterType.operation:
            return 'A scoreboard math operation';
        case bc_minecraft_bedrock_command_1.ParameterType.replaceMode:
            return 'A replace mode';
        case bc_minecraft_bedrock_command_1.ParameterType.selector:
            return 'A selector that target all players, entities or fake players';
        case bc_minecraft_bedrock_command_1.ParameterType.slotID:
            return 'A slot id';
        case bc_minecraft_bedrock_command_1.ParameterType.slotType:
            return 'A slot type';
        case bc_minecraft_bedrock_command_1.ParameterType.string:
            return 'A string';
        case bc_minecraft_bedrock_command_1.ParameterType.unknown:
            return 'no idea, I quit';
        case bc_minecraft_bedrock_command_1.ParameterType.xp:
            return 'A xp number';
    }
    return undefined;
}
function getDocumentation(_query, range, collection, additional) {
    let out = undefined;
    collection.forEach((item) => {
        let doc;
        if (bc_minecraft_bedrock_shared_1.Documentated.is(item) && item.documentation) {
            doc = item.documentation;
        }
        else {
            doc = item.id + '\n' + item.location.uri;
        }
        doc += '\n' + additional;
        out = { contents: { kind: 'markdown', value: doc }, range: range };
    });
    return out;
}
//# sourceMappingURL=mcfunction.js.map