import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The tell command */
export const tell: CommandInfo[] = [
  {
    name: "tell",
    documentation: "Sends a private message to one or more players.",
    permission_level: 0,
    parameters: [
      { text: "tell", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "message", type: ParameterType.message, required: true },
    ],
  },
];