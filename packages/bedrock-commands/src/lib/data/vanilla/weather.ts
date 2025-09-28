import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The weather command */
export const weather: CommandInfo[] = [
  {
    name: "weather",
    documentation: "Clears the weather.",
    permission_level: 1,
    parameters: [
      { text: "weather", type: ParameterType.keyword, required: true },
      { text: "clear", type: ParameterType.keyword, required: true },
      { text: "duration", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "weather",
    documentation: "Sets the weather.",
    permission_level: 1,
    parameters: [
      { text: "weather", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "weather",
    documentation: "Sets the weather.",
    permission_level: 1,
    parameters: [
      { text: "weather", type: ParameterType.keyword, required: true },
      { text: "rain", type: ParameterType.keyword, required: true },
      { text: "duration", type: ParameterType.integer, required: false },
    ],
  },
  {
    name: "weather",
    documentation: "Sets the weather.",
    permission_level: 1,
    parameters: [
      { text: "weather", type: ParameterType.keyword, required: true },
      { text: "thunder", type: ParameterType.keyword, required: true },
      { text: "duration", type: ParameterType.integer, required: false },
    ],
  },
];