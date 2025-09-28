import { ModeCollection } from "./mode-collection";

/** */
export const MaskMode: ModeCollection = {
  name: "Mask",
  modes: [
    { name: "filtered", documentation: "Using a filtered setting" },
    { name: "masked", documentation: "Clones the area using a mask" },
    { name: "replace", documentation: "Replaces the specified block" },
  ],
};
