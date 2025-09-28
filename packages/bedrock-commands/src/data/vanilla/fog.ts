import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The fog command */
export const fog: CommandInfo[] = [
  {
    name: "fog",
    documentation: "Add or remove fog settings file",
    permission_level: 1,
    parameters: [
      { text: "fog", type: ParameterType.keyword, required: true },
      { text: "victim", type: ParameterType.selector, required: true },
      { text: "pop", type: ParameterType.keyword, required: true },
      { text: "user provided id", type: ParameterType.string, required: true },
    ],
  },
  {
    name: "fog",
    documentation: "Add or remove fog settings file",
    permission_level: 1,
    parameters: [
      { text: "fog", type: ParameterType.keyword, required: true },
      { text: "victim", type: ParameterType.selector, required: true },
      { text: "push", type: ParameterType.keyword, required: true },
      { text: "fog id", type: ParameterType.fog, required: true },
      { text: "user provided id", type: ParameterType.string, required: true },
    ],
  },
  {
    name: "fog",
    documentation: "Add or remove fog settings file",
    permission_level: 1,
    parameters: [
      { text: "fog", type: ParameterType.keyword, required: true },
      { text: "victim", type: ParameterType.selector, required: true },
      { text: "remove", type: ParameterType.keyword, required: true },
      { text: "user provided id", type: ParameterType.string, required: true },
    ],
  },
];