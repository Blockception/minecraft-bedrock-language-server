import { process } from "./process";

describe("Resourcepack - Animation Controller", () => {
  const data = `{
    "format_version": "1.8.0",
    "animation_controllers": {
      "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": [] }] } } }
    }
  }`;

  test("process", () => {
    const controllers = process({ getText: () => data, uri: "example" });
    expect(controllers).toMatchSnapshot();
  });
});
