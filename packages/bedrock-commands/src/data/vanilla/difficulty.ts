import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The difficulty command */
export const difficulty: CommandInfo[] = [
  {
    name: "difficulty",
    documentation: "Sets the difficulty level.",
    permission_level: 1,
    parameters: [
      { text: "difficulty", type: ParameterType.keyword, required: true },
      { text: "difficulty", type: ParameterType.difficulty, required: true },
    ],
  },
  {
    name: "difficulty",
    documentation: "Sets the difficulty level.",
    permission_level: 1,
    parameters: [
      { text: "difficulty", type: ParameterType.keyword, required: true },
      { text: "difficulty", type: ParameterType.integer, required: true },
    ],
  },
];