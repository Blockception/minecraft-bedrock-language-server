import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The time command */
export const time: CommandInfo[] = [
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "add", type: ParameterType.keyword, required: true },
      { text: "amount", type: ParameterType.integer, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
      { text: "day", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
      { text: "daytime", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "query", type: ParameterType.keyword, required: true },
      { text: "gametime", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "amount", type: ParameterType.integer, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "day", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "midnight", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "night", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "noon", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "sunrise", type: ParameterType.keyword, required: true },
    ],
  },
  {
    name: "time",
    documentation: "Changes or queries the world's game time.",
    permission_level: 1,
    parameters: [
      { text: "time", type: ParameterType.keyword, required: true },
      { text: "set", type: ParameterType.keyword, required: true },
      { text: "sunset", type: ParameterType.keyword, required: true },
    ],
  },
];