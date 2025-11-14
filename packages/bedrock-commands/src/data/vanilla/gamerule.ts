import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The gamerule command */
export const gamerule: CommandInfo[] = [
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "commandblockoutput", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "commandblocksenabled", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "dodaylightcycle", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "doentitydrops", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "dofiretick", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "doimmediaterespawn", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "doinsomnia", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "dolimitedcrafting", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "domobloot", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "domobspawning", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "dotiledrops", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "doweathercycle", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "drowningdamage", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "falldamage", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "firedamage", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "freezedamage", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "functioncommandlimit", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "keepinventory", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "maxcommandchainlength", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "mobgriefing", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "naturalregeneration", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "playerssleepingpercentage", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "projectilescanbreakblocks", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "pvp", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "randomtickspeed", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "recipesunlock", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "respawnblocksexplode", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "sendcommandfeedback", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showbordereffect", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showcoordinates", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showdaysplayed", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showdeathmessages", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showrecipemessages", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "showtags", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "spawnradius", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "tntexplodes", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "gamerule",
    documentation: "Sets or queries a game rule value.",
    permission_level: 1,
    parameters: [
      { text: "gamerule", type: ParameterType.keyword, required: true },
      { text: "tntexplosiondropdecay", type: ParameterType.keyword, required: true },
      { text: "value", type: ParameterType.boolean, required: false },
    ],
  },
];