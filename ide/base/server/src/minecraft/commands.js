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
exports.GetPossibleEntityTypes = GetPossibleEntityTypes;
exports.GetPossibleBlockID = GetPossibleBlockID;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const Selectors = __importStar(require("./general/selectors"));
/**
 * Tries to determine the possible type of the entity in a command
 * @param command The command to check
 * @param maxIndex The max index to check
 * @returns The possible type of the entity
 */
function GetPossibleEntityTypes(command, maxIndex) {
    const data = command.getBestMatch();
    const out = [];
    for (let I = 0; I < data.length; I++) {
        const data_item = data[I];
        const max = Math.min(data_item.parameters.length, maxIndex);
        for (let J = 0; J < max; J++) {
            const p = data_item.parameters[J];
            switch (p.type) {
                case bc_minecraft_bedrock_command_1.ParameterType.entity:
                    out.push(command.parameters[J].text);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.selector:
                    const item = Selectors.getAttribute('type', command.parameters[J].text);
                    if (item)
                        out.push(...item);
                    break;
            }
        }
    }
    return out;
}
function GetPossibleBlockID(command, maxIndex) {
    const data = command.getBestMatch();
    for (let I = 0; I < data.length; I++) {
        const data_item = data[I];
        const max = Math.min(data_item.parameters.length, maxIndex);
        for (let J = 0; J < max; J++) {
            const p = data_item.parameters[J];
            switch (p.type) {
                case bc_minecraft_bedrock_command_1.ParameterType.block:
                    return command.parameters[J].text;
            }
        }
    }
    return undefined;
}
//# sourceMappingURL=commands.js.map