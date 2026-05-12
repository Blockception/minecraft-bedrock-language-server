"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const mode_collection_1 = require("./mode-collection");
describe('Mode', () => {
    const tests = [
        __1.Modes.CameraShake,
        __1.Modes.Clone,
        __1.Modes.Difficulty,
        __1.Modes.Fill,
        __1.Modes.Gamemode,
        __1.Modes.LocateFeature,
        __1.Modes.Mask,
        __1.Modes.Mirror,
        __1.Modes.MusicRepeat,
        __1.Modes.OldBlock,
        __1.Modes.Operation,
        __1.Modes.Replace,
        __1.Modes.RideFill,
        __1.Modes.RideRules,
        __1.Modes.Rotation,
        __1.Modes.Save,
        __1.Modes.SelectorAttribute,
        __1.Modes.SelectorType,
        __1.Modes.SlotType,
        __1.Modes.StructureAnimation,
        __1.Modes.TeleportRules,
    ];
    describe.each(tests)('$name', (mode) => {
        it('SanityCheck should pass', () => SanityCheckMode(mode));
        it('is should be true', () => expect(mode_collection_1.ModeCollection.is(mode)).toBeTruthy());
        it('Values check', () => values(mode));
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