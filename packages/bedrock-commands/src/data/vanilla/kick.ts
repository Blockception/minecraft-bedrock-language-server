import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The kick command */
export const kick: CommandInfo[] = [
  {
    name: "kick",
    documentation: "Kicks a player from the server.",
    permission_level: 1,
    parameters: [
      { text: "kick", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: true },
      { text: "reason", type: ParameterType.message, required: true },
    ],
  },
];