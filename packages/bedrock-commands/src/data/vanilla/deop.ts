import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The deop command */
export const deop: CommandInfo[] = [
  {
    name: "deop",
    documentation: "Revokes operator status from a player.",
    permission_level: 2,
    parameters: [
      { text: "deop", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
    ],
  },
];