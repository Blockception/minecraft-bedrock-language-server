import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The camerashake command */
export const camerashake: CommandInfo[] = [
  {
    name: "camerashake",
    documentation: "Applies shaking to the players' camera with a specified intensity and duration.",
    permission_level: 1,
    parameters: [
      { text: "camerashake", type: ParameterType.keyword, required: true },
      { text: "add", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true, options: { playerOnly: true } },
      { text: "intensity", type: ParameterType.float, required: false, options: { minimum: 0, maximum: 4 } },
      { text: "seconds", type: ParameterType.float, required: false, options: { minimum: 0 } },
      { text: "shake type", type: ParameterType.cameraShakeType, required: false },
    ],
  },
  {
    name: "camerashake",
    documentation: "Applies shaking to the players' camera with a specified intensity and duration.",
    permission_level: 1,
    parameters: [
      { text: "camerashake", type: ParameterType.keyword, required: true },
      { text: "stop", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: false, options: { playerOnly: true } },
    ],
  },
];