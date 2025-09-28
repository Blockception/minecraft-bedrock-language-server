"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
describe("Resourcepack - Animation Controller", () => {
    const data = `{
    "format_version": "1.8.0",
    "animation_controllers": {
      "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": [] }] } } }
    }
  }`;
    test("process", () => {
        const controllers = (0, process_1.process)({ getText: () => data, uri: "example" });
        expect(controllers).toMatchSnapshot();
    });
});
//# sourceMappingURL=animation-controllers.test.js.map