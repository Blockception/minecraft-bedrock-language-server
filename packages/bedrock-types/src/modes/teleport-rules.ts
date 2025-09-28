import { ModeCollection } from "./mode-collection";

/** */
export const TeleportRulesMode: ModeCollection = {
  name: "Teleport Rules",
  modes: [
    { name: "teleport_ride", documentation: "Teleports the ride to the rider" },
    { name: "teleport_rider", documentation: "Teleports the rider to the ride" },
  ],
};
