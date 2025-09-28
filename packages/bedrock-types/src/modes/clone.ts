import { ModeCollection } from "./mode-collection";

/** */
export const CloneMode: ModeCollection = {
  name: "Clone",
  modes: [
    { name: "force", documentation: "Forces the clone even if the source and destination regions overlap." },
    {
      name: "move",
      documentation:
        "Clone the source region to the destination region, then replace the source region with air. When used in filtered mask mode, only the cloned blocks are replaced with air.",
    },
    { name: "normal", documentation: "Execute the clone under default operations." },
  ],
};
