import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The execute command */
export const execute: CommandInfo[] = [
  {
    name: "execute",
    documentation: "Executes another command.",
    permission_level: 1,
    parameters: [
      { text: "execute", type: ParameterType.keyword, required: true },
      { text: "next", type: ParameterType.executeSubcommand, required: true },
    ],
  },
  {
    name: "execute",
    documentation: "Executes another command.",
    permission_level: 1,
    obsolete: {
      code: "minecraft.commands.execute.deprecated",
      message: "This version of the execute command has been deprecated, use the new version instead.",
      format_version: "1.19.50",
    },
    parameters: [
      { text: "execute", type: ParameterType.keyword, required: true },
      { text: "origin", type: ParameterType.selector, required: true },
      { text: "position x", type: ParameterType.coordinate, required: true },
      { text: "position y", type: ParameterType.coordinate, required: true },
      { text: "position z", type: ParameterType.coordinate, required: true },
      { text: "command", type: ParameterType.command, required: true },
    ],
  },
  {
    name: "execute",
    documentation: "Executes another command.",
    permission_level: 1,
    obsolete: {
      code: "minecraft.commands.execute.deprecated",
      message: "This version of the execute command has been deprecated, use the new version instead.",
      format_version: "1.19.50",
    },
    parameters: [
      { text: "execute", type: ParameterType.keyword, required: true },
      { text: "origin", type: ParameterType.selector, required: true },
      { text: "position x", type: ParameterType.coordinate, required: true },
      { text: "position y", type: ParameterType.coordinate, required: true },
      { text: "position z", type: ParameterType.coordinate, required: true },
      { text: "detect", type: ParameterType.keyword, required: true },
      { text: "detect pos x", type: ParameterType.coordinate, required: true },
      { text: "detect pos y", type: ParameterType.coordinate, required: true },
      { text: "detect pos z", type: ParameterType.coordinate, required: true },
      { text: "block", type: ParameterType.block, required: true },
      { text: "data", type: ParameterType.integer, required: true },
      { text: "command", type: ParameterType.command, required: true },
    ],
  },
];
