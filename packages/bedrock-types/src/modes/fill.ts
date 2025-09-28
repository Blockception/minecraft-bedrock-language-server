import { ModeCollection } from "./mode-collection";

/** */
export const FillMode: ModeCollection = {
  name: "Fill",
  modes: [
    { name: "destroy", documentation: "Destroy the old block, if tile drops is on, they all will drop an item" },
    { name: "hollow", documentation: "Create a hollow cube" },
    { name: "keep", documentation: "Keeps the old blocks, replaces only air" },
    { name: "outline", documentation: "Just sets the outline" },
    { name: "replace", documentation: "Replaces a specified block with the given block" },
  ],
};
