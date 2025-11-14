import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The dialogue command */
export const dialogue: CommandInfo[] = [
  {
    name: "dialogue",
    documentation: "Opens NPC dialogue for a player.",
    permission_level: 1,
    parameters: [
      { text: "dialogue", type: ParameterType.keyword, required: true },
      { text: "change", type: ParameterType.keyword, required: true },
      { text: "npc", type: ParameterType.selector, required: true },
      { text: "scene name", type: ParameterType.string, required: true },
      { text: "players", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "dialogue",
    documentation: "Opens NPC dialogue for a player.",
    permission_level: 1,
    parameters: [
      { text: "dialogue", type: ParameterType.keyword, required: true },
      { text: "open", type: ParameterType.keyword, required: true },
      { text: "npc", type: ParameterType.selector, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "scene name", type: ParameterType.string, required: false },
    ],
  },
];