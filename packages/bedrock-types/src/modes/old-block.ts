import { ModeCollection } from "./mode-collection";

/** */
export const OldBlockMode: ModeCollection = {
  name: "Old Block",
  modes: [
    { name: "destroy", documentation: "Destroys the old block" },
    { name: "replace", documentation: "Replaces the old block without destroying it" },
    { name: "keep", documentation: "Keeps the old block if its not air" },
  ],
};
