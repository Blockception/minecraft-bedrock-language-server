import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The permission command */
export const permission: CommandInfo[] = [
  {
    name: "permission",
    documentation: "Reloads and applies permissions.",
    permission_level: 4,
    parameters: [
      { text: "permission", type: ParameterType.keyword, required: true },
      { text: "list", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "permission",
    documentation: "Reloads and applies permissions.",
    permission_level: 4,
    parameters: [
      { text: "permission", type: ParameterType.keyword, required: true },
      { text: "reload", type: ParameterType.keyword, required: true },
    ],
  },
];