import { ModeCollection } from "./mode-collection";

/** */
export const StructureAnimationMode: ModeCollection = {
  name: "Structure Animation",
  modes: [
    { name: "block_by_block", documentation: "Animate the whole process block by block" },
    { name: "layer_by_layer", documentation: "Animate the whole process layer by layer" },
  ],
};
