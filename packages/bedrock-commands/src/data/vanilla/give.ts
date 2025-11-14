import { ParameterType } from "../../types/parameter-type";
import { CommandInfo } from "../command-info";

/**The give command */
export const give: CommandInfo[] = [
  {
    name: "give",
    documentation: "Gives an item to a player.",
    permission_level: 1,
    parameters: [
      { text: "give", type: ParameterType.keyword, required: true },
      { text: "player", type: ParameterType.selector, required: true },
      { text: "item name", type: ParameterType.item, required: true },
      { text: "amount", type: ParameterType.integer, required: false },
      { text: "data", type: ParameterType.integer, required: false },
      { text: "components", type: ParameterType.jsonItem, required: false },
    ],
  },
];