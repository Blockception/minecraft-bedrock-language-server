import { Json } from "../json";
import { Internal } from "../../main";


describe("RP Animation", () => {
  const correct_animations : string[]= [
    "{}",
    `{
      "loop": true,
      "bones": {
        "body": {
          "rotation": [ "25 * math.sin(variable.attack_time * 30)", 0, 0 ]
        }
      }
    }`
  ]


  correct_animations.forEach((anim, index) => {
    describe("correct " + index, () => {
      const obj = Json.To<Internal.ResourcePack.Animation>(anim);

      it("not undefined", () => {
        expect(obj).toBeDefined();
      });

      if (!obj) return;

      it("is animation", () => {
        expect(Internal.ResourcePack.Animation.is(obj)).toBeTruthy();
      });
    });
  });
});