import { ModeCollection } from "./mode-collection";

/** */
export const PermissionMode: ModeCollection = {
  name: "Permission",
  modes: [
    { name: "camera", documentation: "The permission that enables/disables the player can use the camera view" },
    { name: "dismount", documentation: "The permission that enables/disables the player's ability to dismount" },
    { name: "jump", documentation: "The permission that enables/disables the player's ability to jump" },
    { name: "lateral_movement", documentation: "The permission that enables/disables the player's ability to move sideways" },
    { name: "mount", documentation: "The permission that enables/disables the player's ability to mount an entity" },
    { name: "move_backward", documentation: "The permission that enables/disables the player's ability to move backwards" },
    { name: "move_forward", documentation: "The permission that enables/disables the player's ability to move forwards" },
    { name: "move_left", documentation: "The permission that enables/disables the player's ability to move left" },
    { name: "move_right", documentation: "The permission that enables/disables the player's ability to move right" },
    { name: "movement", documentation: "The permission that enables/disables the players movement." },
    { name: "sneak", documentation: "The permission that enables/disables the player's ability to sneak" },
  ],
};

export const PermissionStateMode: ModeCollection = {
  name: "Permission State",
  modes: [
    { name: "enabled", documentation: "Enables the permission" },
    { name: "disabled", documentation: "Disables the permission" },
  ],
};