import { Modes } from "../main";
import { Mode, ModeCollection } from "./mode-collection";

describe("Mode", () => {
  const tests = [
    Modes.CameraShake,
    Modes.Clone,
    Modes.Difficulty,
    Modes.Fill,
    Modes.Gamemode,
    Modes.LocateFeature,
    Modes.Mask,
    Modes.Mirror,
    Modes.MusicRepeat,
    Modes.OldBlock,
    Modes.Operation,
    Modes.Replace,
    Modes.RideFill,
    Modes.RideRules,
    Modes.Rotation,
    Modes.Save,
    Modes.SelectorAttribute,
    Modes.SelectorType,
    Modes.SlotType,
    Modes.StructureAnimation,
    Modes.TeleportRules,
  ];

  describe.each(tests)("$name", (mode) => {
    it("SanityCheck should pass", () => SanityCheckMode(mode));
    it("is should be true", () => expect(ModeCollection.is(mode)).toBeTruthy());
    it("Values check", () => values(mode));
  });
});

function SanityCheckMode(mode: ModeCollection): void {
  expect(mode).toEqual(
    expect.objectContaining({
      name: expect.any(String),
      modes: expect.anything(),
    })
  );

  mode.modes.forEach((m) => {
    expect(m).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        documentation: expect.any(String),
      })
    );
  });
}

function values(mode: ModeCollection): void {
  for (let I = 0; I < mode.modes.length; I++) {
    const value = mode.modes[I];

    expect(Mode.is(value)).toBeTruthy();
  }
}
