import { ModeCollection } from "./mode-collection";

/** */
export const TimeMode: ModeCollection = {
  name: "Time",
  modes: [
    { name: "day", documentation: "Sets the time to 1000" },
    { name: "midnight", documentation: "Sets the time to 18000" },
    { name: "night", documentation: "Sets the time to 13000" },
    { name: "noon", documentation: "Sets the time to 6000" },
    { name: "sunrise", documentation: "Sets the time to 23000" },
    { name: "sunset", documentation: "Sets the time to 12000" },
  ],
};
