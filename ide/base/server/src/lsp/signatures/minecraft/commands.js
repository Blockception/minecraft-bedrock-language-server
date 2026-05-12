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
exports.provideSignature = provideSignature;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const attributes_1 = require("../../../project/attributes");
const carrier_1 = require("../carrier");
const RawText = __importStar(require("./json-raw-text"));
/**
 *
 * @param line
 * @param startOffset
 * @param cursorOffset
 * @param doc
 * @returns
 */
function provideSignature(line, startOffset, cursorOffset, doc) {
    let command = bc_minecraft_bedrock_command_1.Command.parse(line, startOffset);
    if (command.isEmpty())
        return undefined;
    const edu = (0, attributes_1.IsEducationEnabled)(doc);
    let subCommand = command.isInSubCommand(cursorOffset, edu);
    while (subCommand) {
        if (subCommand) {
            command = subCommand;
        }
        subCommand = command.isInSubCommand(cursorOffset, edu);
    }
    if (subCommand != undefined) {
        command = subCommand;
    }
    return {
        signatures: command.getBestMatch().map((item) => carrier_1.SignatureCarrier.get(item, toSignature)),
        activeParameter: command.findCursorIndex(cursorOffset),
        activeSignature: 0,
    };
}
//Converts the given MCCommand into a signature
function toSignature(command) {
    const signature = {
        label: '',
        documentation: command.documentation,
        parameters: [],
    };
    const parameters = command.parameters;
    for (let I = 0; I < parameters.length; I++) {
        const parameter = parameters[I];
        let t = parameter.text;
        if (parameter.type !== bc_minecraft_bedrock_command_1.ParameterType.keyword) {
            if (parameter.required) {
                t = `<${t}>`;
            }
            else {
                t = `[${t}]`;
            }
        }
        const p = createParameter(t, parameter);
        signature.label += t + ' ';
        signature.parameters?.push(p);
    }
    signature.label = signature.label.trim();
    return signature;
}
function createParameter(label, p) {
    switch (p.type) {
        case bc_minecraft_bedrock_command_1.ParameterType.jsonRawText:
            return RawText.provideParameterInformation();
    }
    let documentation = label;
    if (p.options) {
        documentation += '\n\n**Options**:\n';
        if (typeof p.options.allowFakePlayers === 'boolean') {
            documentation += `\nAllow fake players: ${p.options.allowFakePlayers}`;
        }
        if (typeof p.options.maximum === 'number') {
            documentation += `\nMaximum: ${p.options.maximum}`;
        }
        if (typeof p.options.minimum === 'number') {
            documentation += `\nMinimum: ${p.options.minimum}`;
        }
        if (typeof p.options.playerOnly === 'boolean') {
            documentation += `\nPlayer only: ${p.options.playerOnly}`;
        }
        if (typeof p.options.wildcard === 'boolean') {
            documentation += `\nWildcard: ${p.options.wildcard}`;
        }
        if (p.options.acceptedValues) {
            documentation += `Accepted values: \n- ${p.options.acceptedValues.join('\n- ')}`;
        }
    }
    documentation += '\n---';
    const Temp = {
        label: label,
        documentation: { kind: 'markdown', value: documentation },
    };
    return Temp;
}
//# sourceMappingURL=commands.js.map