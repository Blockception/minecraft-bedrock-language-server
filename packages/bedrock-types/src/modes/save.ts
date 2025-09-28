import { ModeCollection } from "./mode-collection";

/** */
export const SaveMode: ModeCollection = {
  name: "Save",
  modes: [
    { name: "disk", documentation: "Saves to the disk" },
    { name: "memory", documentation: "Saves to memory" },
  ],
};
