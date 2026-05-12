"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mcfunction_1 = require("../../../../../../src/diagnostics/behavior-pack/mcfunction");
const diagnoser_1 = require("../../../../../diagnoser");
describe("BehaviorPack", () => {
    describe("Mcfunctions", () => {
        describe("Coordinate validation", () => {
            // Commands with complete and valid coordinate sets
            const validCommands = [
                // All 3 absolute coordinates
                "particle minecraft:endrod 1 2 3",
                // All 3 relative coordinates
                "particle minecraft:endrod ~ ~ ~",
                // All 3 local coordinates
                "particle minecraft:endrod ^ ^ ^",
                // No coordinates (optional group omitted entirely)
                "particle minecraft:endrod",
                // Mixed relative and absolute (non-local mixing is valid)
                "particle minecraft:endrod ~ 2 ~",
                // setblock with complete coordinates
                "setblock ~ ~ ~ stone",
                "setblock 1 2 3 stone",
                "setblock ^ ^ ^ stone",
                // summon with entity + 3 coordinates (should not be treated as name-tag overload)
                "summon creeper 100 200 300",
                "summon creeper ~ ~ ~",
                "summon creeper ^ ^ ^",
                // spreadplayers with absolute coordinates (2-coord pair)
                "spreadplayers 100 200 1 10 @a",
                "spreadplayers ~ ~ 1 10 @a",
            ];
            // Commands with invalid coordinate usage
            const invalidCommands = [
                // Only 1 of 3 coordinates provided
                "particle minecraft:endrod 5",
                // Only 2 of 3 coordinates provided
                "particle minecraft:endrod 1 2",
                // Mixing local (^) with absolute
                "particle minecraft:endrod 1 ^2 3",
                // Mixing local (^) with relative (~)
                "particle minecraft:endrod ~1 ^2 ~3",
                // Mixing local (^) with absolute and relative
                "particle minecraft:endrod 1 ^2 ~3",
                // Only 1 coordinate for setblock
                "setblock ~ 5",
                // Only 2 coordinates for setblock
                "setblock ~ ~ stone",
                // spreadplayers with local coordinates (^ not valid for 2D position)
                "spreadplayers ^ ^ 1 10 @a",
                "spreadplayers ^1 ^2 1 10 @a",
                // spreadplayers with mixed local and non-local (also disallowed)
                "spreadplayers ^ ~ 1 10 @a",
                "spreadplayers ~ ^ 1 10 @a",
            ];
            for (const command of validCommands) {
                it(`valid: ${command}`, () => {
                    const doc = {
                        uri: path_1.default.join("behavior_pack", "functions", "test.mcfunction"),
                        getText() {
                            return command;
                        },
                    };
                    const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
                    (0, mcfunction_1.diagnose_mcfunction_commands_document)(diagnoser);
                    diagnoser.expectEmpty();
                });
            }
            for (const command of invalidCommands) {
                it(`invalid: ${command}`, () => {
                    const doc = {
                        uri: path_1.default.join("behavior_pack", "functions", "test.mcfunction"),
                        getText() {
                            return command;
                        },
                    };
                    const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
                    (0, mcfunction_1.diagnose_mcfunction_commands_document)(diagnoser);
                    diagnoser.expectAny();
                });
            }
        });
    });
});
//# sourceMappingURL=coordinates.test.js.map