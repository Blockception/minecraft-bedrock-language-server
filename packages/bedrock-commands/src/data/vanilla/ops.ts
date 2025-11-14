import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The ops command */
export const ops: CommandInfo[] = [
  {
    name: "ops",
    documentation: "Reloads and applies permissions.",
    permission_level: 4,
    parameters: [
      { text: "ops", type: ParameterType.keyword, required: true },
      { text: "list", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "ops",
    documentation: "Reloads and applies permissions.",
    permission_level: 4,
    parameters: [
      { text: "ops", type: ParameterType.keyword, required: true },
      { text: "reload", type: ParameterType.keyword, required: true },
    ],
  },
];