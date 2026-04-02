import { TextDocument } from "bc-minecraft-bedrock-project";
import path from "path";
import { diagnose_mcfunction_commands_document } from "../../../../../../src/diagnostics/behavior-pack/mcfunction";
import { TestDiagnoser } from "../../../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Mcfunctions", () => {
    describe("Execute commands", () => {
      // Valid execute commands should produce no errors
      const validCommands: string[] = [
        "execute run say hello",
        "execute if entity @s run say hello",
        "execute as @a run kill @s",
        "execute positioned ~ ~ ~ run say hello",
      ];

      // Invalid execute subcommand syntax should produce specific "Unknown syntax" errors
      const invalidCommands: { command: string; expectedMessage: string }[] = [
        {
          command: "execute fake run kill @a",
          expectedMessage: 'Unknown syntax for: "execute"',
        },
        {
          command: "execute if fake run kill @a",
          expectedMessage: 'Unknown syntax for: "if"',
        },
        {
          command: "execute positioned fake run kill @a",
          expectedMessage: 'Unknown syntax for: "positioned"',
        },
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

      for (const { command, expectedMessage } of invalidCommands) {
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
          expect(diagnoser.hasMessage(expectedMessage)).toBe(true);
        });
      }
    });
  });
});
