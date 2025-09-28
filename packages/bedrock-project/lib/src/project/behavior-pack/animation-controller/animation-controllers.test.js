"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
describe("BehaviorPack - Animation Controller", () => {
    const data = `{
      "format_version": "1.8.0",
      "animation_controllers": {
        "controller.animation.example.base_pose": { "states": { "default": {
          "animations": [{ "base_pose": 0 }],
          "on_entry": ["/say hi", "@s minecraft:entity_spawned"],
          "on_exit": ["/say bye", "@s minecraft:entity_spawned", "@s minecraft:entity_born"] 
        } } }
      }
    }`;
    test("process", () => {
        const controllers = (0, process_1.process)({
            getText: () => data,
            uri: "example",
        });
        expect(controllers).toMatchSnapshot();
    });
});
//# sourceMappingURL=animation-controllers.test.js.map