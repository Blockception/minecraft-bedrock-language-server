import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The stopsound command */
export const stopsound: CommandInfo[] = [
  {
    name: "stopsound",
    documentation: "Stops all playing sounds on the given players.",
    permission_level: 1,
    parameters: [
      { text: "stopsound", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true, options: { playerOnly: true } },
      { text: "sound", type: ParameterType.sound, required: false },
    ],
  },
];