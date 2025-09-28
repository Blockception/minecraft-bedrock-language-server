import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The effect command */
export const effect: CommandInfo[] = [
  {
    name: "effect",
    documentation: "Add or remove status effects.",
    permission_level: 1,
    parameters: [
      { text: "effect", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "clear", type: ParameterType.keyword, required: true },
      { text: "effect", type: ParameterType.effect, required: false },
    ],
  },
  {
    name: "effect",
    documentation: "Add or remove status effects.",
    permission_level: 1,
    parameters: [
      { text: "effect", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "effect", type: ParameterType.effect, required: true },
      { text: "infinite", type: ParameterType.keyword, required: true },
      { text: "amplifier", type: ParameterType.integer, required: false },
      { text: "hide particles", type: ParameterType.boolean, required: false },
    ],
  },
  {
    name: "effect",
    documentation: "Add or remove status effects.",
    permission_level: 1,
    parameters: [
      { text: "effect", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "effect", type: ParameterType.effect, required: true },
      { text: "seconds", type: ParameterType.integer, required: false },
      { text: "amplifier", type: ParameterType.integer, required: false },
      { text: "hide particles", type: ParameterType.boolean, required: false },
    ],
  },
];