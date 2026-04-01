import { TextDocument } from "bc-minecraft-bedrock-project";
import path from "path";
import { diagnose_mcfunction_commands_document } from "../src/diagnostics/behavior-pack/mcfunction";
import { TestDiagnoser } from "./diagnoser";

describe("Execute command diagnostics", () => {
  const testCases = [
    { command: "kill @notreal", expectError: true, desc: "kill with invalid selector" },
    { command: "execute run kill @notreal", expectError: true, desc: "execute run with invalid selector" },
    { command: "execute fake run kill @notreal", expectError: true, desc: "execute with fake subcommand" },
    { command: "execute if fake run kill @notreal", expectError: true, desc: "execute if with invalid args" },
    { command: "execute positioned fake run kill @notreal", expectError: true, desc: "execute positioned with invalid args" },
  ];

  for (const tc of testCases) {
    it(tc.desc, () => {
      const doc: TextDocument = {
        uri: path.join("behavior_pack", "functions", "test.mcfunction"),
        getText() { return tc.command; }
      };
      
      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_mcfunction_commands_document(diagnoser);
      
      console.log(`Command: "${tc.command}"`);
      console.log(`Errors: ${JSON.stringify(diagnoser.items.map(i => i.message))}`);
      
      if (tc.expectError) {
        expect(diagnoser.items.length).toBeGreaterThan(0);
      } else {
        expect(diagnoser.items.length).toBe(0);
      }
    });
  }
});
