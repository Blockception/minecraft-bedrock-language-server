"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
describe("checking valid context", () => {
    const lines = valid().split("\n").filter((item) => item.trim().length > 0);
    test.each(lines)("should be valid syntax: %p", (line) => {
        const comm = main_1.Command.parse(line, 0);
        const data = comm.getCommandData(true);
        expect(data).not.toHaveLength(0);
        const match = comm.getBestMatch(true);
        expect(match).not.toHaveLength(0);
    });
});
function valid() {
    return `
aimassist @a clear

effect @s speed 10 1 true
effect @s clear

execute run function test
execute as @initiator unless entity @s[scores={foo=1..}] run scoreboard players add bar q 1
execute as @initiator unless entity @s[scores={foo=1..}] run scoreboard players operation @s foo = bar q
execute as @s at @s run scoreboard players set @s foo 1

give @p foo:bar

kill @s

scoreboard objectives add bar dummy
scoreboard objectives add foo dummy
scoreboard players set @a[scores={foo=1..}] foo 1

say debug 1
say debug 2
say debug 3
say debug 4
say debug 5
say debug 6

tp @s ~ -40 ~
`;
}
//# sourceMappingURL=valid-syntax.test.js.map