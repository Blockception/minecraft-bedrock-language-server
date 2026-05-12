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
        describe("Execute commands", () => {
            // Valid execute commands should produce no errors
            const validCommands = [
                "execute run say hello",
                "execute if entity @s run say hello",
                "execute as @a run kill @s",
                "execute positioned ~ ~ ~ run say hello",
            ];
            // Invalid execute subcommand syntax should produce specific "Unknown syntax" errors
            const invalidCommands = [
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
            for (const { command, expectedMessage } of invalidCommands) {
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
                    expect(diagnoser.hasMessage(expectedMessage)).toBe(true);
                });
            }
        });
    });
});
//# sourceMappingURL=execute-commands.test.js.map