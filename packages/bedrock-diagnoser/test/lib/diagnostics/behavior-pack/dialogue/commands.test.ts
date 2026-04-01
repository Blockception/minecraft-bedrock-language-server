import { TextDocument } from "bc-minecraft-bedrock-project";
import path from "path";
import { diagnose_dialogue_document } from "../../../../../src/diagnostics/behavior-pack/dialogue";
import { TestDiagnoser } from "../../../../diagnoser";

function makeDialogueDoc(content: object): TextDocument {
  return {
    uri: path.join("behavior_pack", "dialogue", "test.dialogue.json"),
    getText() {
      return JSON.stringify(content);
    },
  };
}

describe("BehaviorPack", () => {
  describe("Dialogue", () => {
    it("no errors for valid commands", () => {
      const doc = makeDialogueDoc({
        format_version: "1.20.41",
        "minecraft:npc_dialogue": {
          scenes: [
            {
              scene_tag: "greeting",
              on_open_commands: ["/say hello", "/kill @a"],
              on_close_commands: ["/tp @s ~ ~ ~"],
              buttons: [{ name: "OK", commands: ["/say bye"] }],
            },
          ],
        },
      });

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_dialogue_document(diagnoser);
      diagnoser.expectEmpty();
    });

    it("reports errors for invalid commands in on_open_commands", () => {
      const doc = makeDialogueDoc({
        format_version: "1.20.41",
        "minecraft:npc_dialogue": {
          scenes: [
            {
              scene_tag: "greeting",
              on_open_commands: ["/kill @fake selector blah"],
            },
          ],
        },
      });

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_dialogue_document(diagnoser);
      diagnoser.expectAny();
    });

    it("reports errors for invalid commands in on_close_commands", () => {
      const doc = makeDialogueDoc({
        format_version: "1.20.41",
        "minecraft:npc_dialogue": {
          scenes: [
            {
              scene_tag: "farewell",
              on_close_commands: ["/notacommand @a"],
            },
          ],
        },
      });

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_dialogue_document(diagnoser);
      diagnoser.expectAny();
    });

    it("reports errors for invalid commands in button commands", () => {
      const doc = makeDialogueDoc({
        format_version: "1.20.41",
        "minecraft:npc_dialogue": {
          scenes: [
            {
              scene_tag: "shop",
              buttons: [{ name: "Buy", commands: ["/fakecommand arg1 arg2"] }],
            },
          ],
        },
      });

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_dialogue_document(diagnoser);
      diagnoser.expectAny();
    });

    it("handles scenes with no commands without error", () => {
      const doc = makeDialogueDoc({
        format_version: "1.20.41",
        "minecraft:npc_dialogue": {
          scenes: [
            {
              scene_tag: "info",
              npc_name: "Merchant",
              text: "Hello traveler!",
            },
          ],
        },
      });

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnose_dialogue_document(diagnoser);
      diagnoser.expectEmpty();
    });
  });
});
