import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The title command */
export const title: CommandInfo[] = [
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "actionbar", type: ParameterType.keyword, required: true },
      { text: "title text", type: ParameterType.message, required: true },
    ],
  },
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "clear", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "reset", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "subtitle", type: ParameterType.keyword, required: true },
      { text: "title text", type: ParameterType.message, required: true },
    ],
  },
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "times", type: ParameterType.keyword, required: true },
      { text: "fade in", type: ParameterType.integer, required: true },
      { text: "stay", type: ParameterType.integer, required: true },
      { text: "fade out", type: ParameterType.integer, required: true },
    ],
  },
  {
    name: "title",
    documentation: "Controls screen titles.",
    permission_level: 1,
    parameters: [
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "title", type: ParameterType.keyword, required: true },
      { text: "title text", type: ParameterType.message, required: true },
    ],
  },
];