import { ModeCollection } from "./mode-collection";

/** */
export const ReplaceMode: ModeCollection = {
  name: "Replace",
  modes: [
    { name: "destroy", documentation: "Destroy the old" },
    { name: "keep", documentation: "Keeps the old if there is any" },
  ],
};
