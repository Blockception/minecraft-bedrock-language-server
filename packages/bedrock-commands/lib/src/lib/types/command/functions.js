"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestMatches = getBestMatches;
exports.isMatch = isMatch;
exports.checkRequiredParameterLength = checkRequiredParameterLength;
exports.getCommandData = getCommandData;
exports.hasCommandData = hasCommandData;
exports.IsCommand = IsCommand;
exports.IsExecuteSubcommand = IsExecuteSubcommand;
const data_1 = require("../../data");
const parameter_type_1 = require("../parameter-type");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
/**Gets the best matching commandInfo data, if multiple are returned, it unclear or somewhere not fully specified
 * @param command The command to search through
 * @param edu Whether or not to include education data
 * @returns An array with commands info*/
function getBestMatches(command, edu = false) {
    let m = command.getCommandData(edu);
    if (m.length === 1)
        return m;
    m = m.filter((x) => isMatch(command, x, edu));
    if (m.length > 1) {
        const n = m.filter((x) => checkRequiredParameterLength(command, x));
        if (n.length === 0)
            return m;
        return n;
    }
    return m;
}
/**Checks if the command matches the commandInfo
 * @param command The command to examine
 * @param data The commandInfo serving as the basis
 * @param edu If education content should be used or not
 * @returns true or false is this commandInfo matches the command*/
function isMatch(command, data, edu = false) {
    var _a, _b, _c;
    let Limit = data.parameters.length;
    if (Limit > command.parameters.length) {
        Limit = command.parameters.length;
    }
    for (let I = 0; I < Limit; I++) {
        const commandPar = command.parameters[I];
        const commandText = commandPar.text;
        const patPar = data.parameters[I];
        if ((_b = (_a = patPar.options) === null || _a === void 0 ? void 0 : _a.acceptedValues) === null || _b === void 0 ? void 0 : _b.includes(commandText)) {
            continue;
        }
        const match = Matches[patPar.type];
        if (match) {
            if (!match(commandText))
                return false;
            continue;
        }
        switch (patPar.type) {
            case parameter_type_1.ParameterType.block:
            case parameter_type_1.ParameterType.entity:
            case parameter_type_1.ParameterType.event:
            case parameter_type_1.ParameterType.function:
            case parameter_type_1.ParameterType.item:
            case parameter_type_1.ParameterType.message:
            case parameter_type_1.ParameterType.objective:
            case parameter_type_1.ParameterType.particle:
            case parameter_type_1.ParameterType.sound:
            case parameter_type_1.ParameterType.tag:
            case parameter_type_1.ParameterType.tickingarea:
            case parameter_type_1.ParameterType.unknown:
                //TODO program matches types for these
                continue;
            case parameter_type_1.ParameterType.command:
                if (!IsCommand(commandText, edu))
                    return false;
                break;
            case parameter_type_1.ParameterType.effect:
                if (commandText === "clear")
                    return false;
                break;
            case parameter_type_1.ParameterType.executeSubcommand:
                if (!IsExecuteSubcommand(commandText))
                    return false;
                break;
            case parameter_type_1.ParameterType.keyword:
                if (commandText != patPar.text)
                    return false;
                break;
            case parameter_type_1.ParameterType.selector:
                const { wildcard, allowFakePlayers } = (_c = patPar.options) !== null && _c !== void 0 ? _c : {};
                if (!bc_minecraft_bedrock_types_1.Minecraft.Selector.Selector.isSelector(commandText, wildcard, allowFakePlayers))
                    return false;
                break;
        }
    }
    return true;
}
const Matches = {
    [parameter_type_1.ParameterType.blockStates]: (item) => bc_minecraft_bedrock_types_1.General.Json.isArray(item),
    [parameter_type_1.ParameterType.boolean]: (item) => bc_minecraft_bedrock_types_1.General.Boolean.is(item),
    [parameter_type_1.ParameterType.cameraShakeType]: (item) => bc_minecraft_bedrock_types_1.Modes.CameraShake.isValue(item),
    [parameter_type_1.ParameterType.causeType]: (item) => bc_minecraft_bedrock_types_1.Modes.CauseType.isValue(item),
    [parameter_type_1.ParameterType.cloneMode]: (item) => bc_minecraft_bedrock_types_1.Modes.Clone.isValue(item),
    [parameter_type_1.ParameterType.coordinate]: (item) => bc_minecraft_bedrock_types_1.Minecraft.Coordinate.is(item),
    [parameter_type_1.ParameterType.damageCause]: (item) => bc_minecraft_bedrock_types_1.Modes.CauseType.isValue(item),
    [parameter_type_1.ParameterType.dimension]: (item) => bc_minecraft_bedrock_types_1.Modes.Dimension.isValue(item),
    [parameter_type_1.ParameterType.difficulty]: (item) => bc_minecraft_bedrock_types_1.Modes.Difficulty.isValue(item),
    [parameter_type_1.ParameterType.easing]: (item) => bc_minecraft_bedrock_types_1.Modes.Easing.isValue(item),
    [parameter_type_1.ParameterType.fillMode]: (item) => bc_minecraft_bedrock_types_1.Modes.Fill.isValue(item),
    [parameter_type_1.ParameterType.float]: (item) => bc_minecraft_bedrock_types_1.General.Float.is(item),
    [parameter_type_1.ParameterType.gamemode]: (item) => bc_minecraft_bedrock_types_1.Modes.Gamemode.isValue(item),
    [parameter_type_1.ParameterType.handType]: (item) => bc_minecraft_bedrock_types_1.Modes.HandType.isValue(item),
    [parameter_type_1.ParameterType.hudElement]: (item) => bc_minecraft_bedrock_types_1.Modes.HudElement.isValue(item),
    [parameter_type_1.ParameterType.hudVisibility]: (item) => bc_minecraft_bedrock_types_1.Modes.HudVisibility.isValue(item),
    [parameter_type_1.ParameterType.integer]: (item) => bc_minecraft_bedrock_types_1.General.Integer.is(item),
    [parameter_type_1.ParameterType.jigsaw]: (item) => bc_minecraft_bedrock_types_1.General.String.is(item),
    [parameter_type_1.ParameterType.jsonItem]: (item) => bc_minecraft_bedrock_types_1.General.Json.isObject(item),
    [parameter_type_1.ParameterType.jsonRawText]: (item) => bc_minecraft_bedrock_types_1.General.Json.isObject(item),
    [parameter_type_1.ParameterType.locateFeature]: (item) => bc_minecraft_bedrock_types_1.Modes.LocateFeature.isValue(item),
    [parameter_type_1.ParameterType.lootTable]: (item) => bc_minecraft_bedrock_types_1.General.String.is(item),
    [parameter_type_1.ParameterType.maskMode]: (item) => bc_minecraft_bedrock_types_1.Modes.Mask.isValue(item),
    [parameter_type_1.ParameterType.mirror]: (item) => bc_minecraft_bedrock_types_1.Modes.Mirror.isValue(item),
    [parameter_type_1.ParameterType.musicRepeatMode]: (item) => bc_minecraft_bedrock_types_1.Modes.MusicRepeat.isValue(item),
    [parameter_type_1.ParameterType.oldBlockMode]: (item) => bc_minecraft_bedrock_types_1.Modes.OldBlock.isValue(item),
    [parameter_type_1.ParameterType.operation]: (item) => bc_minecraft_bedrock_types_1.Modes.Operation.isValue(item),
    [parameter_type_1.ParameterType.replaceMode]: (item) => bc_minecraft_bedrock_types_1.Modes.Replace.isValue(item),
    [parameter_type_1.ParameterType.rideRules]: (item) => bc_minecraft_bedrock_types_1.Modes.RideRules.isValue(item),
    [parameter_type_1.ParameterType.ridefillMode]: (item) => bc_minecraft_bedrock_types_1.Modes.RideFill.isValue(item),
    [parameter_type_1.ParameterType.rotation]: (item) => bc_minecraft_bedrock_types_1.Modes.Rotation.isValue(item),
    [parameter_type_1.ParameterType.saveMode]: (item) => bc_minecraft_bedrock_types_1.Modes.Save.isValue(item),
    [parameter_type_1.ParameterType.slotID]: (item) => bc_minecraft_bedrock_types_1.General.Integer.is(item),
    [parameter_type_1.ParameterType.slotType]: (item) => bc_minecraft_bedrock_types_1.Modes.SlotType.isValue(item),
    [parameter_type_1.ParameterType.string]: (item) => bc_minecraft_bedrock_types_1.General.String.is(item),
    [parameter_type_1.ParameterType.structureAnimationMode]: (item) => bc_minecraft_bedrock_types_1.Modes.StructureAnimation.isValue(item),
    [parameter_type_1.ParameterType.teleportRules]: (item) => bc_minecraft_bedrock_types_1.Modes.TeleportRules.isValue(item),
    [parameter_type_1.ParameterType.time]: (item) => bc_minecraft_bedrock_types_1.Modes.Time.isValue(item),
    [parameter_type_1.ParameterType.timeInTicks]: (item) => bc_minecraft_bedrock_types_1.Modes.Time.isValue(item),
    [parameter_type_1.ParameterType.xp]: (item) => bc_minecraft_bedrock_types_1.Minecraft.XP.is(item),
};
function checkRequiredParameterLength(command, data) {
    let required = 0;
    for (let I = 0; I < data.parameters.length; I++) {
        const par = data.parameters[I];
        if (par.required) {
            required++;
        }
        else {
            break;
        }
    }
    if (command.parameters.length < required) {
        return false;
    }
    return true;
}
/**Retrieves the command data related to the given keyword
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
function getCommandData(name, edu = false, type = parameter_type_1.ParameterType.command) {
    const out = [];
    if (type == parameter_type_1.ParameterType.executeSubcommand) {
        Add(out, data_1.CommandData.ExecuteSubcommands[name]);
    }
    if (type == parameter_type_1.ParameterType.command) {
        Add(out, data_1.CommandData.Vanilla[name]);
        if (edu)
            Add(out, data_1.CommandData.Edu[name]);
    }
    return out;
}
/**Checks if the given commandData is present
 * @param name The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns An array with commands info*/
function hasCommandData(name, edu = false) {
    if (data_1.CommandData.Vanilla[name])
        return true;
    if (edu && data_1.CommandData.Edu[name])
        return true;
    return false;
}
/**Checks if the given commandData is present
 * @param command The command to retrieve
 * @param edu Whether or not to include education commands
 * @returns True or false*/
function IsCommand(command, edu = false) {
    if (data_1.CommandData.Vanilla[command])
        return true;
    if (edu && data_1.CommandData.Edu[command])
        return true;
    return false;
}
/** Checks if the given command is a execute sub command
 * @param command The command to check
 * @returns True or false*/
function IsExecuteSubcommand(command) {
    return data_1.CommandData.ExecuteSubcommands[command] != undefined;
}
function Add(receiver, items) {
    if (items)
        receiver.push(...items);
}
//# sourceMappingURL=functions.js.map