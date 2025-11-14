import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The spawnpoint command */
export const spawnpoint: CommandInfo[] = [
  {
    name: "spawnpoint",
    documentation: "Sets the spawn point for a player.",
    permission_level: 1,
    parameters: [
      { text: "spawnpoint", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: false },
      { text: "spawnPos x", type: ParameterType.coordinate, required: false },
      { text: "spawnPos y", type: ParameterType.coordinate, required: false },
      { text: "spawnPos z", type: ParameterType.coordinate, required: false },
    ],
  },
];