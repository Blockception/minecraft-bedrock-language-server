import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The tellraw command */
export const tellraw: CommandInfo[] = [
  {
    name: "tellraw",
    documentation: "Sends a JSON message to players.",
    permission_level: 1,
    parameters: [
      { text: "tellraw", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "raw json message", type: ParameterType.jsonRawText, required: true },
    ],
  },
];