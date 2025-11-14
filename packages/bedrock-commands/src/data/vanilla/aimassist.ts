import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The aimassist command */
export const aimassist: CommandInfo[] = [
  {
    name: "aimassist",
    documentation: "Enable Aim Assist",
    permission_level: 1,
    parameters: [
      { text: "aimassist", type: ParameterType.keyword, required: true },
      { text: "players", type: ParameterType.selector, required: true },
      { text: "clear", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "aimassist",
    documentation: "Enable Aim Assist",
    permission_level: 1,
    parameters: [
      { text: "aimassist", type: ParameterType.keyword, required: true },
      { text: "players", type: ParameterType.selector, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "x angle", type: ParameterType.float, required: false },
      { text: "y angle", type: ParameterType.float, required: false },
      { text: "max distance", type: ParameterType.float, required: false },
      { text: "angle", type: ParameterType.keyword, required: false },
      { text: "preset id", type: ParameterType.string, required: false },
    ],
  },
  {
    name: "aimassist",
    documentation: "Enable Aim Assist",
    permission_level: 1,
    parameters: [
      { text: "aimassist", type: ParameterType.keyword, required: true },
      { text: "players", type: ParameterType.selector, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "x angle", type: ParameterType.float, required: false },
      { text: "y angle", type: ParameterType.float, required: false },
      { text: "max distance", type: ParameterType.float, required: false },
      { text: "distance", type: ParameterType.keyword, required: false },
      { text: "preset id", type: ParameterType.string, required: false },
    ],
  },
];