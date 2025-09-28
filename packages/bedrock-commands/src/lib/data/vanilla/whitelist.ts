import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The whitelist command */
export const whitelist: CommandInfo[] = [
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "add", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "list", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "off", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "on", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "reload", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
  {
    name: "whitelist",
    documentation: "Manages the server allowlist.",
    permission_level: 4,
    parameters: [
      { text: "whitelist", type: ParameterType.keyword, required: true },
      { text: "remove", type: ParameterType.keyword, required: true },
      { text: "name", type: ParameterType.selector, required: false },
    ],
  },
];