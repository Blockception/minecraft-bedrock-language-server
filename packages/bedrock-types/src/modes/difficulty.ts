import { ModeCollection } from "./mode-collection";

/** */
export const DifficultyMode: ModeCollection = {
  name: "Difficulty",
  modes: [
    { name: "1", documentation: "Easy mode, mobs will attack in this mode. but at a minimum." },
    { name: "e", documentation: "Easy mode, mobs will attack in this mode. but at a minimum." },
    { name: "easy", documentation: "Easy mode, mobs will attack in this mode. but at a minimum." },

    { name: "2", documentation: "The default difficulty mode for minecraft, mobs will attack." },
    { name: "n", documentation: "The default difficulty mode for minecraft, mobs will attack." },
    { name: "normal", documentation: "The default difficulty mode for minecraft, mobs will attack." },

    { name: "3", documentation: "The most difficult mode for minecraft, mobs will attack somewhat harder." },
    { name: "h", documentation: "The most difficult mode for minecraft, mobs will attack somewhat harder." },
    { name: "hard", documentation: "The most difficult mode for minecraft, mobs will attack somewhat harder." },

    { name: "0", documentation: "The relaxed mode, no mobs with attacking behavior can be spawned" },
    { name: "p", documentation: "The relaxed mode, no mobs with attacking behavior can be spawned" },
    { name: "peaceful", documentation: "The relaxed mode, no mobs with attacking behavior can be spawned" },
  ],
};
