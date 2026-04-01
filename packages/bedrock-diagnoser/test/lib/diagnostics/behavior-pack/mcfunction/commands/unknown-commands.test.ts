import { TextDocument } from "bc-minecraft-bedrock-project";
import path from "path";
import { diagnose_mcfunction_commands_document } from "../../../../../../src/diagnostics/behavior-pack/mcfunction";
import { TestDiagnoser } from "../../../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Mcfunctions", () => {
    describe("Unknown commands", () => {
      // Known valid commands should produce no errors
      const validCommands: string[] = [
        "say hello",
        "kill @a",
        "tp @s ~ ~ ~",
      ];

      // Completely unknown top-level commands should produce errors
      const unknownCommands: string[] = [
        "fake command",
        "notacommand",
        "foobar @a",
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

      for (const command of unknownCommands) {
        it(`unknown: ${command}`, () => {
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
