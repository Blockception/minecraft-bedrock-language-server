import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The function command */
export const function: CommandInfo[] = [
  {
    name: "function",
    documentation: "Runs commands found in the corresponding function file.",
    permission_level: 1,
    parameters: [
      { text: "function", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.function, required: true },
    ],
  },
];