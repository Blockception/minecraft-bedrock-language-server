import { ModeCollection } from "./mode-collection";

/** */
export const RotationMode: ModeCollection = {
  name: "Rotation",
  modes: [
    { name: "0_degrees", documentation: "Do not rotate the structure" },
    { name: "90_degrees", documentation: "Rotates the structure clockwise 90 degrees" },
    { name: "180_degrees", documentation: "Rotates the structure clockwise 180 degrees" },
    { name: "270_degrees", documentation: "Rotates the structure clockwise 270 degrees" },
  ],
};
