import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The event command */
export const event: CommandInfo[] = [
  {
    name: "event",
    documentation: "Triggers an event for the specified object(s)",
    permission_level: 1,
    parameters: [
      { text: "event", type: ParameterType.keyword, required: true },
      { text: "entity", type: ParameterType.keyword, required: true },
      { text: "target", type: ParameterType.selector, required: true },
      { text: "event name", type: ParameterType.event, required: true },
    ],
  },
];