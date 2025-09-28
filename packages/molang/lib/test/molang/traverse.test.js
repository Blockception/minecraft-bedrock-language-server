"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const molang_1 = require("../../src/molang");
const vanilla_player_1 = require("../vanilla-player");
describe("Traverse", () => {
    it("rp", () => {
        const obj = vanilla_player_1.VanillaPlayer.DataObject;
        let count = 0;
        (0, molang_1.traverse)(obj, () => {
            count++;
        });
        expect(count).toBeGreaterThan(20);
    });
    it("anim", () => {
        const obj = {
            "animation.billy_robot.temp_deactivate": {
                animation_length: 4.5,
                loop: false,
                timeline: {
                    "0.0": ["/effect @s instant_health 1 3 true", "/tag @s remove vulnerable"],
                    "4.0": ["@s self:activate", "variable.temp=query.variant;"],
                },
            },
        };
        let commands = 0;
        let events = 0;
        let molang = 0;
        (0, molang_1.traverse)(obj, (value, type) => {
            switch (type) {
                case molang_1.MolangType.command:
                    commands++;
                    break;
                case molang_1.MolangType.event:
                    events++;
                    break;
                case molang_1.MolangType.molang:
                    molang++;
                    break;
            }
        });
        expect(commands).toEqual(2);
        expect(events).toEqual(1);
        expect(molang).toEqual(1);
    });
});
//# sourceMappingURL=traverse.test.js.map