import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The inputpermission command */
export const inputpermission: CommandInfo[] = [
  {
    name: "inputpermission",
    documentation: "Sets whether or not a player's input can affect their character.",
    permission_level: 1,
    parameters: [
      { text: "inputpermission", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
      { text: "targets", type: ParameterType.selector, required: true },
      { text: "permission", type: ParameterType.permission, required: true },
      { text: "disabled", type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: "inputpermission",
    documentation: "Sets whether or not a player's input can affect their character.",
    permission_level: 1,
    parameters: [
      { text: "inputpermission", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
      { text: "targets", type: ParameterType.selector, required: true },
      { text: "permission", type: ParameterType.permission, required: true },
      { text: "enabled", type: ParameterType.keyword, required: false },
    ],
  },
  {
    name: "inputpermission",
    documentation: "Sets whether or not a player's input can affect their character.",
    permission_level: 1,
    parameters: [
      { text: "inputpermission", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "targets", type: ParameterType.selector, required: true },
      { text: "permission", type: ParameterType.permission, required: true },
      { text: "disabled", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "inputpermission",
    documentation: "Sets whether or not a player's input can affect their character.",
    permission_level: 1,
    parameters: [
      { text: "inputpermission", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "targets", type: ParameterType.selector, required: true },
      { text: "permission", type: ParameterType.permission, required: true },
      { text: "enabled", type: ParameterType.keyword, required: true },
    ],
  },
];