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
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const vscode_languageserver_1 = require("vscode-languageserver");
/**These are here to stop circular dependency */
const General = __importStar(require("../../general"));
const BehaviorPack = __importStar(require("../behavior-pack"));
const ItemComponents = __importStar(require("../json/item-components"));
const RawText = __importStar(require("../json/rawtext"));
const ModeCompletions = __importStar(require("../modes/modes"));
const SlotId = __importStar(require("../modes/slot-id"));
const ResourcePack = __importStar(require("../resource-pack"));
const Selectors = __importStar(require("../selectors/selector"));
const Command = __importStar(require("./commands"));
function provideCompletion(context) {
    const { parameter, builder } = context;
    //Check default option
    if (parameter.options) {
        //Accepted values
        if (parameter.options.acceptedValues) {
            parameter.options.acceptedValues.forEach((value) => {
                builder.add({ label: value, documentation: 'accepted values', kind: vscode_languageserver_1.CompletionItemKind.EnumMember });
            });
        }
        //Wildcard
        if (parameter.options.wildcard) {
            builder.add({ label: '*', documentation: 'wild card', kind: vscode_languageserver_1.CompletionItemKind.Constant });
        }
    }
    //Adding explanation text
    const ncontext = {
        ...context,
        builder: builder.withEvents((item) => {
            const doc = bc_minecraft_bedrock_command_1.ParameterTypeDocumentation[parameter.type];
            if (!doc)
                return;
            if (typeof item.documentation === 'string' || item.documentation === undefined) {
                item.documentation = {
                    kind: 'markdown',
                    value: item.documentation ?? '',
                };
            }
            item.documentation.value += '\n' + doc;
        }),
    };
    const call = DataMap[parameter.type];
    if (call)
        call(ncontext);
}
function toCompletion(context) {
    context.builder.add({
        label: context.parameter.text,
        documentation: 'The keyword: ' + context.parameter.text,
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    });
}
function modeCompletion(mode) {
    return (context) => {
        return ModeCompletions.provideCompletion(mode, context);
    };
}
const DataMap = {
    //BehaviorPacks
    [bc_minecraft_bedrock_command_1.ParameterType.block]: BehaviorPack.Blocks.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.blockStates]: BehaviorPack.BlockStates.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.entity]: BehaviorPack.Entities.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.event]: BehaviorPack.EntityEvent.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.function]: BehaviorPack.Functions.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.item]: BehaviorPack.Items.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.lootTable]: BehaviorPack.LootTables.provideShortCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.structure]: BehaviorPack.Structures.provideCompletion,
    //ResourcePacks
    [bc_minecraft_bedrock_command_1.ParameterType.animation]: ResourcePack.Animations.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.particle]: ResourcePack.Particles.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.sound]: ResourcePack.Sounds.provideCompletion,
    //General
    [bc_minecraft_bedrock_command_1.ParameterType.boolean]: General.Boolean.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.coordinate]: General.Coordinate.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.float]: General.Float.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.integer]: General.Integer.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.integer_range]: General.Integer.provideRangeCompletion,
    //Json
    [bc_minecraft_bedrock_command_1.ParameterType.jsonItem]: ItemComponents.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.jsonRawText]: RawText.provideCompletion,
    //Modes
    [bc_minecraft_bedrock_command_1.ParameterType.cameraShakeType]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.CameraShake.name),
    [bc_minecraft_bedrock_command_1.ParameterType.causeType]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.CauseType.name),
    [bc_minecraft_bedrock_command_1.ParameterType.cloneMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Clone.name),
    [bc_minecraft_bedrock_command_1.ParameterType.difficulty]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Difficulty.name),
    [bc_minecraft_bedrock_command_1.ParameterType.dimension]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Dimension.name),
    [bc_minecraft_bedrock_command_1.ParameterType.fillMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Fill.name),
    [bc_minecraft_bedrock_command_1.ParameterType.gamemode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Gamemode.name),
    [bc_minecraft_bedrock_command_1.ParameterType.handType]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.HandType.name),
    [bc_minecraft_bedrock_command_1.ParameterType.locateFeature]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.LocateFeature.name),
    [bc_minecraft_bedrock_command_1.ParameterType.maskMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Mask.name),
    [bc_minecraft_bedrock_command_1.ParameterType.mirror]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Mirror.name),
    [bc_minecraft_bedrock_command_1.ParameterType.musicRepeatMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.MusicRepeat.name),
    [bc_minecraft_bedrock_command_1.ParameterType.oldBlockMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.OldBlock.name),
    [bc_minecraft_bedrock_command_1.ParameterType.operation]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Operation.name),
    [bc_minecraft_bedrock_command_1.ParameterType.scoreComparator]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.ScoreComparator.name),
    [bc_minecraft_bedrock_command_1.ParameterType.permission]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Permission.name),
    [bc_minecraft_bedrock_command_1.ParameterType.permissionState]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.PermissionState.name),
    [bc_minecraft_bedrock_command_1.ParameterType.replaceMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Replace.name),
    [bc_minecraft_bedrock_command_1.ParameterType.ridefillMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.RideFill.name),
    [bc_minecraft_bedrock_command_1.ParameterType.rideRules]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.RideRules.name),
    [bc_minecraft_bedrock_command_1.ParameterType.rotation]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Rotation.name),
    [bc_minecraft_bedrock_command_1.ParameterType.saveMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Save.name),
    [bc_minecraft_bedrock_command_1.ParameterType.scanMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Scan.name),
    [bc_minecraft_bedrock_command_1.ParameterType.slotID]: SlotId.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.slotType]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.SlotType.name),
    [bc_minecraft_bedrock_command_1.ParameterType.structureAnimationMode]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.StructureAnimation.name),
    [bc_minecraft_bedrock_command_1.ParameterType.teleportRules]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.TeleportRules.name),
    [bc_minecraft_bedrock_command_1.ParameterType.time]: modeCompletion(bc_minecraft_bedrock_types_1.Modes.Time.name),
    //Commands
    [bc_minecraft_bedrock_command_1.ParameterType.command]: Command.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.keyword]: toCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.effect]: General.Effect.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.executeSubcommand]: Command.provideExecuteSubcommandCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.message]: General.Strings.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.objective]: General.Objectives.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.selector]: Selectors.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.string]: General.Strings.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.tag]: General.Tags.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.tickingarea]: General.Tickingareas.provideCompletion,
    [bc_minecraft_bedrock_command_1.ParameterType.xp]: General.Xp.provideCompletion,
};
//# sourceMappingURL=parameters.js.map