import { ModeCollection } from "./mode-collection";

/** */
export const RideRulesMode: ModeCollection = {
  name: "Ride Rules",
  modes: [
    { name: "no_ride_change", documentation: "Does not change riders positions" },
    { name: "reassign_rides", documentation: "Does change riders positions" },
    { name: "skip_riders", documentation: "Skips riders" },
  ],
};
