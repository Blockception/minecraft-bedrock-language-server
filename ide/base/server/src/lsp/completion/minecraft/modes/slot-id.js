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
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const Integer = __importStar(require("../../general/integer"));
function provideCompletion(context) {
    const command = context.command;
    const Index = context.parameterIndex;
    if (Index < 0)
        return;
    const SlotType = command.parameters[Index - 1].text;
    const Mode = bc_minecraft_bedrock_types_1.Modes.SlotType.get(SlotType);
    if (Mode && bc_minecraft_bedrock_types_1.Modes.SlotType.isValue(Mode.name)) {
        if (Mode.range) {
            Integer.provideCreateCompletion(context.builder, Mode.range.min, Mode.range.max);
        }
        else {
            Integer.provideCreateCompletion(context.builder, 0, 9);
        }
    }
}
//# sourceMappingURL=slot-id.js.map