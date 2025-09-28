"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterType = void 0;
/** The type of command parameter */
var ParameterType;
(function (ParameterType) {
    /** An animation key */
    ParameterType[ParameterType["animation"] = 0] = "animation";
    /** Block identifiers */
    ParameterType[ParameterType["block"] = 1] = "block";
    /** Biome identifiers */
    ParameterType[ParameterType["biome"] = 2] = "biome";
    /** Block states */
    ParameterType[ParameterType["blockStates"] = 3] = "blockStates";
    /** Booleans */
    ParameterType[ParameterType["boolean"] = 4] = "boolean";
    /** causeType */
    ParameterType[ParameterType["causeType"] = 5] = "causeType";
    /** Camera Shake mode */
    ParameterType[ParameterType["cameraShakeType"] = 6] = "cameraShakeType";
    /** Camera preset */
    ParameterType[ParameterType["cameraPresets"] = 7] = "cameraPresets";
    /** Clone mode */
    ParameterType[ParameterType["cloneMode"] = 8] = "cloneMode";
    /** Command start */
    ParameterType[ParameterType["command"] = 9] = "command";
    /** Coordinate */
    ParameterType[ParameterType["coordinate"] = 10] = "coordinate";
    /** Damage cause */
    ParameterType[ParameterType["damageCause"] = 11] = "damageCause";
    /** Difficulty mode */
    ParameterType[ParameterType["difficulty"] = 12] = "difficulty";
    /** Dimension */
    ParameterType[ParameterType["dimension"] = 13] = "dimension";
    /** The camera easing effect */
    ParameterType[ParameterType["easing"] = 14] = "easing";
    /** Effect identifiers */
    ParameterType[ParameterType["effect"] = 15] = "effect";
    /** Entity identifiers */
    ParameterType[ParameterType["entity"] = 16] = "entity";
    /** Enchant type */
    ParameterType[ParameterType["enchant"] = 17] = "enchant";
    /**  */
    ParameterType[ParameterType["executeSubcommand"] = 18] = "executeSubcommand";
    /** Event in behaviors */
    ParameterType[ParameterType["event"] = 19] = "event";
    /** The fill mode */
    ParameterType[ParameterType["fillMode"] = 20] = "fillMode";
    /** Functions paths */
    ParameterType[ParameterType["function"] = 21] = "function";
    /** Float numbers */
    ParameterType[ParameterType["float"] = 22] = "float";
    /** Fog identifiers */
    ParameterType[ParameterType["fog"] = 23] = "fog";
    /** Game mode */
    ParameterType[ParameterType["gamemode"] = 24] = "gamemode";
    /** The type of hand: mainhand or offhand */
    ParameterType[ParameterType["handType"] = 25] = "handType";
    /** The type of hud visibility */
    ParameterType[ParameterType["hudVisibility"] = 26] = "hudVisibility";
    /** The type of hud element */
    ParameterType[ParameterType["hudElement"] = 27] = "hudElement";
    /** Integer numbers */
    ParameterType[ParameterType["integer"] = 28] = "integer";
    /** Integer range numbers */
    ParameterType[ParameterType["integer_range"] = 29] = "integer_range";
    /** Item identifiers */
    ParameterType[ParameterType["item"] = 30] = "item";
    /** Json item format */
    ParameterType[ParameterType["jsonItem"] = 31] = "jsonItem";
    /** Json raw text */
    ParameterType[ParameterType["jsonRawText"] = 32] = "jsonRawText";
    /** Keyword */
    ParameterType[ParameterType["keyword"] = 33] = "keyword";
    /** A loot table */
    ParameterType[ParameterType["lootTable"] = 34] = "lootTable";
    /** A loot table */
    ParameterType[ParameterType["jigsaw"] = 35] = "jigsaw";
    /** Locates feature mode */
    ParameterType[ParameterType["locateFeature"] = 36] = "locateFeature";
    /** Message */
    ParameterType[ParameterType["message"] = 37] = "message";
    /** Mask mode */
    ParameterType[ParameterType["maskMode"] = 38] = "maskMode";
    /** Mirror mode */
    ParameterType[ParameterType["mirror"] = 39] = "mirror";
    /** Music repeat mode */
    ParameterType[ParameterType["musicRepeatMode"] = 40] = "musicRepeatMode";
    /** Music */
    ParameterType[ParameterType["music"] = 41] = "music";
    /** Objective identifiers */
    ParameterType[ParameterType["objective"] = 42] = "objective";
    /** Old Block mode */
    ParameterType[ParameterType["oldBlockMode"] = 43] = "oldBlockMode";
    /** Operation mode */
    ParameterType[ParameterType["operation"] = 44] = "operation";
    /** Particle identifier */
    ParameterType[ParameterType["particle"] = 45] = "particle";
    /** Permission */
    ParameterType[ParameterType["permission"] = 46] = "permission";
    /** Permission state */
    ParameterType[ParameterType["permissionState"] = 47] = "permissionState";
    /** Recipe item */
    ParameterType[ParameterType["recipe"] = 48] = "recipe";
    /** Replace mode */
    ParameterType[ParameterType["replaceMode"] = 49] = "replaceMode";
    /** Ride Rules */
    ParameterType[ParameterType["rideRules"] = 50] = "rideRules";
    /** Ride Fill Mode */
    ParameterType[ParameterType["ridefillMode"] = 51] = "ridefillMode";
    /** Rotation Mode */
    ParameterType[ParameterType["rotation"] = 52] = "rotation";
    /** Save Mode */
    ParameterType[ParameterType["saveMode"] = 53] = "saveMode";
    /** scan Mode */
    ParameterType[ParameterType["scanMode"] = 54] = "scanMode";
    /** Selectors */
    ParameterType[ParameterType["selector"] = 55] = "selector";
    /** Slot type */
    ParameterType[ParameterType["slotType"] = 56] = "slotType";
    /** Slot ID */
    ParameterType[ParameterType["slotID"] = 57] = "slotID";
    /** Sound identifier */
    ParameterType[ParameterType["sound"] = 58] = "sound";
    /** Strings */
    ParameterType[ParameterType["string"] = 59] = "string";
    /** Structure */
    ParameterType[ParameterType["structure"] = 60] = "structure";
    /** Structure animation  mode */
    ParameterType[ParameterType["structureAnimationMode"] = 61] = "structureAnimationMode";
    /** Tag identifiers */
    ParameterType[ParameterType["tag"] = 62] = "tag";
    /** Teleport rules */
    ParameterType[ParameterType["teleportRules"] = 63] = "teleportRules";
    /** Ticking area identifiers */
    ParameterType[ParameterType["tickingarea"] = 64] = "tickingarea";
    /** Time mode */
    ParameterType[ParameterType["time"] = 65] = "time";
    /** Time in ticks */
    ParameterType[ParameterType["timeInTicks"] = 66] = "timeInTicks";
    /** Unknown */
    ParameterType[ParameterType["unknown"] = 67] = "unknown";
    /** XP */
    ParameterType[ParameterType["xp"] = 68] = "xp";
})(ParameterType || (exports.ParameterType = ParameterType = {}));
//# sourceMappingURL=parameter-type.js.map