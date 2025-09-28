import { ModeCollection } from "./mode-collection";

/** */
export const SelectorAttributeMode: ModeCollection = {
  name: "Selector Attribute",
  modes: [
    { name: "c", documentation: "limits the amount of entities/player to be targeted" },
    { name: "dx", documentation: "The length of the box over the axis X" },
    { name: "dy", documentation: "The length of the box over the axis Y" },
    { name: "dz", documentation: "The length of the box over the axis Z" },
    { name: "family", documentation: "Tests whether or not the target has a given family type. Can be either string or single word" },
    { name: "has_property", documentation: "The entity property to test for" },
    { name: "hasitem", documentation: "Tests the inventory of the entity" },
    { name: "l", documentation: "The maximum amount of XP the target has" },
    { name: "lm", documentation: "The minimum amount of XP the target has" },
    { name: "m", documentation: "The gamemode of the player" },
    { name: "name", documentation: "Tests whether or not the target has a given name. Can be either string or single word" },
    { name: "r", documentation: "The maximum distance to the target" },
    { name: "rm", documentation: "The minimum distance to the target" },
    { name: "rx", documentation: "The maximum vertical rotation" },
    { name: "rxm", documentation: "The minimum vertical rotation" },
    { name: "ry", documentation: "The maximum horizontal rotation" },
    { name: "rym", documentation: "The minimum horizontal rotation" },
    { name: "scores", documentation: "The testing of scores" },
    { name: "tag", documentation: "Tests if the target has or does not have the specified tag" },
    { name: "type", documentation: "Tests if the target has the specified entity type or not" },
    { name: "x", documentation: "The x coordinate this selector works from, can be relative, but not local" },
    { name: "y", documentation: "The y coordinate this selector works from, can be relative, but not local" },
    { name: "z", documentation: "The z coordinate this selector works from, can be relative, but not local" },
  ],
};