import { Command } from "../src";

describe("subcommand", () => {
  test("function subcommand should be retrievable", () => {
    const c = Command.parse("execute run function test");

    let sub = c.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("run");

    sub = sub?.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("function");
  });

  test("say subcommand should be retrievable", () => {
    const c = Command.parse("execute run say hi");

    let sub = c.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("run");

    sub = sub?.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("say");
  });

  test("function subcommand should be retrievable", () => {
    const c = Command.parse("execute as @s at @s run function test");

    let sub = c.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("as");

    sub = sub?.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("at");

    sub = sub?.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("run");

    sub = sub?.getSubCommand(true);
    expect(sub).toBeDefined();
    expect(sub?.getKeyword()).toEqual("function");
  });
});
