import { TestTextDocument } from "../../../types";
import { process } from "./process";

describe("Models", () => {
  test("can process old format", () => {
    const doc = TestTextDocument.create("foo.json", old_format);
    const result = process(doc);

    expect(result).toMatchSnapshot();
  });

  test("can process new format", () => {
    const doc = TestTextDocument.create("foo.json", new_format);
    const result = process(doc);

    expect(result).toMatchSnapshot();
  });
});

const old_format = `{
  "format_version": "1.8.0",
  "geometry.example.v1.8": {
    "visible_bounds_width": 5,
    "visible_bounds_height": 4,
    "visible_bounds_offset": [ 0, 0.5, 0 ],
    "texturewidth": 64,
    "textureheight": 64,
    "bones": [
      {
        "name": "head",
        "pivot": [ 0.0, 0.0, 0.0 ],
        "mirror": true,
        "cubes": []
      },
      {
        "name": "eye",
        "parent": "head",
        "pivot": [ 0.0, 24.0, 0.0 ],
        "cubes": []
      }
    ]
  }
}`;

const new_format = `{
  "format_version": "1.12.0",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "geometry.example",
        "texture_width": 64,
        "texture_height": 64,
        "visible_bounds_width": 1.5,
        "visible_bounds_height": 0.25,
        "visible_bounds_offset": [0, 0.75, 0]
      },
      "bones": [
        {
          "name": "root",
          "pivot": [0, -4, 0]
        },
        {
          "name": "body",
          "parent": "root",
          "pivot": [0, 3, 4],
          "cubes": [],
          "locators": {
            "lead": [0, 0, -5]
          }
        },
        {
          "name": "right_arm",
          "parent": "body",
          "pivot": [-4, 1, -4],
          "rotation": [0, -90, 0],
          "cubes": []
        }
      ]
    }
  ]
}`;
