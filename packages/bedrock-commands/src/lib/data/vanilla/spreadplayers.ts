import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The spreadplayers command */
export const spreadplayers: CommandInfo[] = [
  {
    name: "spreadplayers",
    documentation: "Teleports entities to random locations.",
    permission_level: 1,
    parameters: [
      { text: "spreadplayers", type: ParameterType.keyword, required: true },
      { text: "x", type: ParameterType.coordinate, required: true },
      { text: "z", type: ParameterType.coordinate, required: true },
      { text: "spread distance", type: ParameterType.float, required: true },
      { text: "max range", type: ParameterType.float, required: true },
      { text: "victim", type: ParameterType.selector, required: true },
      { text: "max height", type: ParameterType.rotation, required: false },
    ],
  },
];