import { Mode, ModeCollection } from "./mode-collection";

/** */
export interface SlotTypeModeCollection extends ModeCollection {
  /** */
  modes: SlotTypeMode[];
}

/** */
export interface SlotTypeMode extends Mode {
  /** */
  range?: {
    /** */
    min: number;
    /** */
    max: number;
  };
}

/** */
export const SlotTypeModes: SlotTypeModeCollection = {
  name: "Slot Type",
  modes: [
    { name: "slot.armor.chest", documentation: "The slot that targets the chest area of armor" },
    { name: "slot.armor.feet", documentation: "The slot that targets the feet area of armor" },
    { name: "slot.armor.head", documentation: "The slot that targets the helemt/head area of armor" },
    { name: "slot.armor.legs", documentation: "The slot that targets the legs/leggings area of armor" },
    { name: "slot.chest", documentation: "The slot that targets the chest, such as on donkeys", range: { min: 0, max: 14 } },
    { name: "slot.container", documentation: "Only used for /replaceitem block", range: { min: 0, max: 53 } },
    { name: "slot.enderchest", documentation: "", range: { min: 0, max: 26 } },
    { name: "slot.hotbar", documentation: "", range: { min: 0, max: 8 } },
    { name: "slot.inventory", documentation: "", range: { min: 0, max: 26 } },
    { name: "slot.saddle", documentation: "" },
    { name: "slot.weapon.mainhand", documentation: "" },
    { name: "slot.weapon.offhand", documentation: "" },
  ],
};
