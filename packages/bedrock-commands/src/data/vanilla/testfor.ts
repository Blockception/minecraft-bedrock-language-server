import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The testfor command */
export const testfor: CommandInfo[] = [
  {
    name: "testfor",
    documentation: "Counts entities (players, mobs, items, etc.) matching specified conditions.",
    permission_level: 1,
    parameters: [
      { text: "testfor", type: ParameterType.keyword, required: true },
      { text: "victim", type: ParameterType.selector, required: true },
    ],
  },
];