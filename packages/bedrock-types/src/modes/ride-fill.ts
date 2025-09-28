import { ModeCollection } from "./mode-collection";

/** */
export const RideFillMode: ModeCollection = {
  name: "Ride Fill",
  modes: [
    { name: "if_group_fits", documentation: "If the entity fits then its placed" },
    { name: "until_full", documentation: "Keep adding entities until full" },
  ],
};
