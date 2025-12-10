import { TextDocument } from "bc-minecraft-bedrock-project";
import path from 'path';
import { diagnose_mcfunction_commands_document } from "../../../../../../src/diagnostics/behavior-pack/mcfunction";
import { TestDiagnoser } from "../../../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Mcfunctions", () => {
    describe("Commands", () => {
      //Correct commands
      const correctsCommands: string[] = [
        'setblock ~ ~ ~ spruce_log["pillar_axis"="x"]',
        "setblock ~ ~ ~ spruce_log []",
        'setblock ~ ~ ~ spruce_log ["pillar_axis"="x"]', // with space before states
      ];

      //Incorrect commands
      const incorrectCommands: string[] = [
        "setblock ~ ~ ~ spruce_log [pillar_axis:x]", // with space - invalid syntax (colon instead of equals)
        "setblock ~ ~ ~ stone [pillar_axis:x]", // with space - invalid state on block
      ];

      for (let I = 0; I < correctsCommands.length; I++) {
        const command = correctsCommands[I];

        it(`correct ${command}`, () => {
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

      for (let I = 0; I < incorrectCommands.length; I++) {
        const command = incorrectCommands[I];

        it(`incorrect ${command}`, () => {
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
