"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamerule = void 0;
const parameter_type_1 = require("../../types/parameter-type");
/**The gamerule command */
exports.gamerule = [
    {
        name: "gamerule",
        documentation: "Sets or queries a game rule value.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether command blocks should notify admins when they perform commands.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "commandblockoutput", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether command blocks should be enabled in-game.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "commandblocksenabled", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether the daylight cycle and moon phases progress.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "dodaylightcycle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not entities drop loot.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "doentitydrops", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not to do fire ticks, meaning that fire could do damage to block or not.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "dofiretick", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether to show the player a respawn screen or immediate respawn.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "doimmediaterespawn", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not to activate or deactivate the insomnia mechanic.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "doinsomnia", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not crafting should be limited.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "dolimitedcrafting", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not mobs should drop loot.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "domobloot", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not mobs / animal should be spawning.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "domobspawning", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not blocks that are destroyed also drop items.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "dotiledrops", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not to change between clear, rain and thunder weather.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "doweathercycle", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not drowning does damage to players.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "drowningdamage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not falling does damage to players.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "falldamage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not fire does damage to players..",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "firedamage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not freezing does damage to players.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "freezedamage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "The maximum amount of commands that can be run in a single call (sub calls included).",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "functioncommandlimit", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not the players maintain their inventory when dying.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "keepinventory", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "The maximum amount of commands that can be run in a single call (sub calls included).",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "maxcommandchainlength", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not mobs can grief.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "mobgriefing", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not natural regeneration is enabled.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "naturalregeneration", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Sets the percentage of players that need to sleep to skip the night.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "playerssleepingpercentage", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not projectiles can break blocks.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "projectilescanbreakblocks", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not players can attack each other.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "pvp", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "How many ticks the server can randomly progress elements of the world, such a crop growing.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "randomtickspeed", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not recipes unlock when the player unlocks them.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "recipesunlock", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Sets or queries a game rule value.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "respawnblocksexplode", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not to output the command output to the console.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "sendcommandfeedback", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not the player can see the border effect.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showbordereffect", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not the player can see the coordinates.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showcoordinates", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or the player can see the days played",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showdaysplayed", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not the player can see the death messages.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showdeathmessages", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not the player can see the recipe messages.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showrecipemessages", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whenever or not the player can see the tags.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "showtags", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Sets the spawn radius for the world.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "spawnradius", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.integer, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Whether or not the TNT explodes.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tntexplodes", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
    {
        name: "gamerule",
        documentation: "Sets whenever or not TNT has explosion drop decay.",
        permission_level: 1,
        parameters: [
            { text: "gamerule", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "tntexplosiondropdecay", type: parameter_type_1.ParameterType.keyword, required: true },
            { text: "value", type: parameter_type_1.ParameterType.boolean, required: false },
        ],
    },
];
//# sourceMappingURL=gamerule.js.map