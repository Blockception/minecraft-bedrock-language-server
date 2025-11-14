import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The save command */
export const save: CommandInfo[] = [
  {
    name: "save",
    documentation: "Control or check how the game saves data to disk.",
    permission_level: 4,
    parameters: [
      { text: "save", type: ParameterType.keyword, required: true },
      { text: "mode", type: ParameterType.saveMode, required: true },
    ],
  },
];