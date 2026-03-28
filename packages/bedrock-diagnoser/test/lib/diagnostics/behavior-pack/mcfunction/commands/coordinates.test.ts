import { TextDocument } from "bc-minecraft-bedrock-project";
import path from 'path';
import { diagnose_mcfunction_commands_document } from "../../../../../../src/diagnostics/behavior-pack/mcfunction";
import { TestDiagnoser } from "../../../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Mcfunctions", () => {
    describe("Coordinate validation", () => {
      // Commands with complete and valid coordinate sets
      const validCommands: string[] = [
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
      ];

      // Commands with invalid coordinate usage
      const invalidCommands: string[] = [
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
      ];

      for (const command of validCommands) {
        it(`valid: ${command}`, () => {
          const doc: TextDocument = {
            uri: path.join("behavior_pack", "functions", "test.mcfunction"),
            getText() {
              return command;
            },
          };

          const diagnoser = TestDiagnoser.createDocument(undefined, doc);
          diagnose_mcfunction_commands_document(diagnoser);
          diagnoser.expectEmpty();
        });
      }

      for (const command of invalidCommands) {
        it(`invalid: ${command}`, () => {
          const doc: TextDocument = {
            uri: path.join("behavior_pack", "functions", "test.mcfunction"),
            getText() {
              return command;
            },
          };

          const diagnoser = TestDiagnoser.createDocument(undefined, doc);
          diagnose_mcfunction_commands_document(diagnoser);
          diagnoser.expectAny();
        });
      }
    });
  });
});
