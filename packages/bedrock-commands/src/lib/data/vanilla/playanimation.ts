import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The playanimation command */
export const playanimation: CommandInfo[] = [
  {
    name: "playanimation",
    documentation: "Makes one or more entities play a one-off animation. Assumes all variables are setup correctly.",
    permission_level: 1,
    parameters: [
      { text: "playanimation", type: ParameterType.keyword, required: true },
      { text: "entity", type: ParameterType.selector, required: true },
      { text: "animation", type: ParameterType.animation, required: true },
      { text: "next state", type: ParameterType.string, required: false },
      { text: "blend out time", type: ParameterType.float, required: false },
      { text: "stop expression", type: ParameterType.string, required: false },
      { text: "controller", type: ParameterType.string, required: false },
    ],
  },
];