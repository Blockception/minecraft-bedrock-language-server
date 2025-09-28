import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The damage command */
export const damage: CommandInfo[] = [
  {
    name: "damage",
    documentation: "Apply damage to the specified entities.",
    permission_level: 1,
    parameters: [
      { text: "damage", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "amount", type: ParameterType.integer, required: true },
      { text: "cause", type: ParameterType.causeType, required: false },
    ],
  },
  {
    name: "damage",
    documentation: "Apply damage to the specified entities.",
    permission_level: 1,
    parameters: [
      { text: "damage", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "amount", type: ParameterType.integer, required: true },
      { text: "cause", type: ParameterType.causeType, required: true },
      { text: "entity", type: ParameterType.keyword, required: true },
      { text: "damager", type: ParameterType.selector, required: true },
    ],
  },
];