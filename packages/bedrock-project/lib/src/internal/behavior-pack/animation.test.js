"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../json");
const animation_1 = require("./animation");
describe("BP Animation", () => {
    const correct_animations = [
        "{}",
        `{
      "animation_length": 3.0,
      "loop": false,
      "timeline": {
        "0.0": ["/function example/something"]
      }
    }`,
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
                expect(animation_1.Animation.is(obj)).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=animation.test.js.map