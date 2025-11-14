import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The w command */
export const w: CommandInfo[] = [
  {
    name: "w",
    documentation: "Sends a private message to one or more players.",
    permission_level: 0,
    parameters: [
      { text: "w", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "message", type: ParameterType.message, required: true },
    ],
  },
];