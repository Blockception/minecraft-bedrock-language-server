"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dialogue_1 = require("../../../../../src/diagnostics/behavior-pack/dialogue");
const diagnoser_1 = require("../../../../diagnoser");
function makeDialogueDoc(content) {
    return {
        uri: path_1.default.join("behavior_pack", "dialogue", "test.dialogue.json"),
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
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            (0, dialogue_1.diagnose_dialogue_document)(diagnoser);
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
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            (0, dialogue_1.diagnose_dialogue_document)(diagnoser);
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
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            (0, dialogue_1.diagnose_dialogue_document)(diagnoser);
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
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            (0, dialogue_1.diagnose_dialogue_document)(diagnoser);
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
            const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
            (0, dialogue_1.diagnose_dialogue_document)(diagnoser);
            diagnoser.expectEmpty();
        });
    });
});
//# sourceMappingURL=commands.test.js.map