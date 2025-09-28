import { ModeCollection } from "./mode-collection";

/** */
export const MusicRepeatMode: ModeCollection = {
  name: "Music Repeat",
  modes: [
    { name: "loop", documentation: "Loops the given track" },
    { name: "play_once", documentation: "Only plays the given track once" },
  ],
};
