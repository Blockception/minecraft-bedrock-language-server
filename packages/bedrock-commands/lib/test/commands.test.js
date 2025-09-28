"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_data_1 = require("../src/lib/data/command-data");
describe("Data/Commands", () => {
    const { VanillaCommands, EduCommands } = command_data_1.CommandData;
    describe("Check General", () => {
        CheckCommandContainer(command_data_1.CommandData.Edu);
        CheckCommandContainer(command_data_1.CommandData.Vanilla);
        CheckCommandContainer(command_data_1.CommandData.ExecuteSubcommands);
    });
    it("Dialogue Check", () => {
        expect(command_data_1.CommandData.Edu["dialogue"]).toBeUndefined();
        expect(command_data_1.CommandData.Vanilla["dialogue"]).toBeDefined();
    });
    it("Inventory Check", () => {
        VanillaCommands.forEach((item) => {
            if (command_data_1.CommandData.Vanilla == undefined && command_data_1.CommandData.Vanilla[item] == undefined) {
                throw new Error("missing command: " + item);
            }
        });
        EduCommands.forEach((item) => {
            if (command_data_1.CommandData.Edu == undefined && command_data_1.CommandData.Edu[item] == undefined) {
                throw new Error("missing command: " + item);
            }
        });
        const ExecuteSubcommand = Object.keys(command_data_1.CommandData.ExecuteSubcommands);
        ExecuteSubcommand.forEach((item) => {
            if (command_data_1.CommandData.ExecuteSubcommands == undefined && command_data_1.CommandData.ExecuteSubcommands[item] == undefined) {
                throw new Error("missing command: " + item);
            }
        });
    });
});
function CheckCommandContainer(value) {
    const keys = Object.getOwnPropertyNames(value);
    it("More then one key", () => {
        expect(keys.length).toBeGreaterThan(0);
    });
    for (let I = 0; I < keys.length; I++) {
        const name = keys[I];
        const items = value[name];
        describe(`Command ${name}`, () => {
            it("Has atleast one item", () => {
                expect(items.length).toBeGreaterThan(0);
            });
            for (let J = 0; J < items.length; J++) {
                describe(`${name} ${J}`, () => {
                    const value = items[J];
                    it("Has documentation", () => {
                        expect(value.documentation.length).toBeGreaterThan(0);
                    });
                    it("Has a valid name", () => {
                        expect(value.name.length).toBeGreaterThan(0);
                    });
                    it("Has parameters", () => {
                        expect(value.parameters.length).toBeGreaterThan(0);
                        value.parameters.forEach((p) => {
                            expect(p).toEqual(expect.objectContaining({
                                required: expect.any(Boolean),
                                type: expect.any(Number),
                                text: expect.any(String),
                            }));
                        });
                    });
                });
            }
        });
    }
}
//# sourceMappingURL=commands.test.js.map