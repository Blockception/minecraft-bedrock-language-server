"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const mode_collection_1 = require("./mode-collection");
describe("Mode", () => {
    const tests = [
        main_1.Modes.CameraShake,
        main_1.Modes.Clone,
        main_1.Modes.Difficulty,
        main_1.Modes.Fill,
        main_1.Modes.Gamemode,
        main_1.Modes.LocateFeature,
        main_1.Modes.Mask,
        main_1.Modes.Mirror,
        main_1.Modes.MusicRepeat,
        main_1.Modes.OldBlock,
        main_1.Modes.Operation,
        main_1.Modes.Replace,
        main_1.Modes.RideFill,
        main_1.Modes.RideRules,
        main_1.Modes.Rotation,
        main_1.Modes.Save,
        main_1.Modes.SelectorAttribute,
        main_1.Modes.SelectorType,
        main_1.Modes.SlotType,
        main_1.Modes.StructureAnimation,
        main_1.Modes.TeleportRules,
    ];
    describe.each(tests)("$name", (mode) => {
        it("SanityCheck should pass", () => SanityCheckMode(mode));
        it("is should be true", () => expect(mode_collection_1.ModeCollection.is(mode)).toBeTruthy());
        it("Values check", () => values(mode));
    });
});
function SanityCheckMode(mode) {
    expect(mode).toEqual(expect.objectContaining({
        name: expect.any(String),
        modes: expect.anything(),
    }));
    mode.modes.forEach((m) => {
        expect(m).toEqual(expect.objectContaining({
            name: expect.any(String),
            documentation: expect.any(String),
        }));
    });
}
function values(mode) {
    for (let I = 0; I < mode.modes.length; I++) {
        const value = mode.modes[I];
        expect(mode_collection_1.Mode.is(value)).toBeTruthy();
    }
}
//# sourceMappingURL=mode.test.js.map