import { CommandData } from "../src/data/command-data";
import { CommandContainer } from "../src";

describe("Data/Commands", () => {
  const { VanillaCommands, EduCommands } = CommandData;

  describe("Check General", () => {
    CheckCommandContainer(CommandData.Edu);
    CheckCommandContainer(CommandData.Vanilla);
    CheckCommandContainer(CommandData.ExecuteSubcommands);
  });

  it("Dialogue Check", () => {
    expect(CommandData.Edu["dialogue"]).toBeUndefined();
    expect(CommandData.Vanilla["dialogue"]).toBeDefined();
  });

  it("Inventory Check", () => {
    VanillaCommands.forEach((item) => {
      if (CommandData.Vanilla == undefined && CommandData.Vanilla[item] == undefined) {
        throw new Error("missing command: " + item);
      }
    });

    EduCommands.forEach((item) => {
      if (CommandData.Edu == undefined && CommandData.Edu[item] == undefined) {
        throw new Error("missing command: " + item);
      }
    });

    const ExecuteSubcommand = Object.keys(CommandData.ExecuteSubcommands);
    ExecuteSubcommand.forEach((item) => {
      if (CommandData.ExecuteSubcommands == undefined && CommandData.ExecuteSubcommands[item] == undefined) {
        throw new Error("missing command: " + item);
      }
    });
  });
});

function CheckCommandContainer(value: CommandContainer) {
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
              expect(p).toEqual(
                expect.objectContaining({
                  required: expect.any(Boolean),
                  type: expect.any(Number),
                  text: expect.any(String),
                })
              );
            });
          });
        });
      }
    });
  }
}
