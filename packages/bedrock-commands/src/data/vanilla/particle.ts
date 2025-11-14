import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The particle command */
export const particle: CommandInfo[] = [
  {
    name: "particle",
    documentation: "Creates a particle emitter",
    permission_level: 1,
    parameters: [
      { text: "particle", type: ParameterType.keyword, required: true },
      { text: "effect", type: ParameterType.particle, required: true },
      { text: "position x", type: ParameterType.coordinate, required: false },
      { text: "position y", type: ParameterType.coordinate, required: false },
      { text: "position z", type: ParameterType.coordinate, required: false },
    ],
  },
];