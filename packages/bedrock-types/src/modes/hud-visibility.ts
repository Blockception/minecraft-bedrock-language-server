import { ModeCollection } from "./mode-collection";

/** */
export const HudVisibilityMode: ModeCollection = {
  name: "hud-visiblity",
  modes: [
    { name: "hide", documentation: "Hides the HUD element." },
    {
      name: "reset",
      documentation:
        "Resets the HUD element visibility back to its default state (which is that HUD elements should be visible if no options are toggled in settings.)",
    },
  ],
};
