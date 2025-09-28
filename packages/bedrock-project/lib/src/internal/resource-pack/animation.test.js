"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../json");
const main_1 = require("../../main");
describe("RP Animation", () => {
    const correct_animations = [
        "{}",
        `{
      "loop": true,
      "bones": {
        "body": {
          "rotation": [ "25 * math.sin(variable.attack_time * 30)", 0, 0 ]
        }
      }
    }`
    ];
    correct_animations.forEach((anim, index) => {
        describe("correct " + index, () => {
            const obj = json_1.Json.To(anim);
            it("not undefined", () => {
                expect(obj).toBeDefined();
            });
            if (!obj)
                return;
            it("is animation", () => {
                expect(main_1.Internal.ResourcePack.Animation.is(obj)).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=animation.test.js.map