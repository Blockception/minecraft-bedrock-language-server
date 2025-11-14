import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The music command */
export const music: CommandInfo[] = [
  {
    name: "music",
    documentation: "Allows you to control playing music tracks.",
    permission_level: 1,
    parameters: [
      { text: "music", type: ParameterType.keyword, required: true },
      { text: "play", type: ParameterType.keyword, required: true },
      { text: "track name", type: ParameterType.music, required: true },
      { text: "volume", type: ParameterType.float, required: false },
      { text: "fade seconds", type: ParameterType.float, required: false },
      { text: "repeat mode", type: ParameterType.musicRepeatMode, required: false },
    ],
  },
  {
    name: "music",
    documentation: "Allows you to control playing music tracks.",
    permission_level: 1,
    parameters: [
      { text: "music", type: ParameterType.keyword, required: true },
      { text: "queue", type: ParameterType.keyword, required: true },
      { text: "track name", type: ParameterType.music, required: true },
      { text: "volume", type: ParameterType.float, required: false },
      { text: "fade seconds", type: ParameterType.float, required: false },
      { text: "repeat mode", type: ParameterType.musicRepeatMode, required: false },
    ],
  },
  {
    name: "music",
    documentation: "Allows you to control playing music tracks.",
    permission_level: 1,
    parameters: [
      { text: "music", type: ParameterType.keyword, required: true },
      { text: "stop", type: ParameterType.keyword, required: true },
      { text: "fade seconds", type: ParameterType.float, required: false },
    ],
  },
  {
    name: "music",
    documentation: "Allows you to control playing music tracks.",
    permission_level: 1,
    parameters: [
      { text: "music", type: ParameterType.keyword, required: true },
      { text: "volume", type: ParameterType.keyword, required: true },
      { text: "volume", type: ParameterType.float, required: true },
    ],
  },
];