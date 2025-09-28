import { ModeCollection } from "./mode-collection";

/** */
export const HudElementMode: ModeCollection = {
  name: "hud-element",
  modes: [
    { name: "air_bubbles", documentation: "Air bubble status element of the HUD." },
    { name: "all", documentation: "All elements of the HUD." },
    { name: "armor", documentation: "Armor element on the HUD." },
    { name: "crosshair", documentation: "Cross-hair section of the HUD." },
    { name: "health", documentation: "Health element of the HUD." },
    { name: "horse_health", documentation: "Visual representation of the players' ride element of the HUD." },
    { name: "hotbar", documentation: "Hotbar inventory area element of the HUD." },
    { name: "hunger", documentation: "Hunger bar element." },
    { name: "item_text", documentation: "Text representation of the item in the players' hand." },
    { name: "paperdoll", documentation: "'Paper doll' on-screen representation of the player." },
    { name: "progress_bar", documentation: "Progress bar element of the HUD." },
    { name: "status_effects", documentation: "The icons representing the status effects of the player." },
    { name: "tooltips", documentation: "Tool tip elements of the HUD." },
    {
      name: "touch_controls",
      documentation:
        "Touch controls elements of the HUD. Depending on the players' platform, these elements may never show up.",
    },
  ],
};
