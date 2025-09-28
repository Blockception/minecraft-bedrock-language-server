import { ModeCollection } from "./mode-collection";

/** */
export const OperationMode: ModeCollection = {
  name: "Operation",
  modes: [
    { name: "=", documentation: "Assigns the targets score to that of the source" },
    { name: ">", documentation: "Calculates the maximum value of the sources and the target and stores it in the target" },
    { name: "<", documentation: "Calculates the minimum value of the sources and the target" },
    { name: "><", documentation: "Swaps the scores between the given source and the target" },
    { name: "+=", documentation: "Adds the sources score to the target" },
    { name: "-=", documentation: "Substracts the sources score to the target" },
    { name: "*=", documentation: "Multiplies the sources score to the target" },
    { name: "%=", documentation: "Modulus divide target's score by source's score, and use the remainder to set the target score" },
    { name: "/=", documentation: "Divides the source score to the target" },
  ],
};
