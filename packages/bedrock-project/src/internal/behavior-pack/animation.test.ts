import { Json } from "../json";
import { Animation } from "./animation";

describe("BP Animation", () => {
  const correct_animations: string[] = [
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
      const obj = Json.To<Animation>(anim);

      it("not undefined", () => {
        expect(obj).toBeDefined();
      });

      if (!obj) return;

      it("is animation", () => {
        expect(Animation.is(obj)).toBeTruthy();
      });
    });
  });
});
