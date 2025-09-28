import { JsonPath } from "./json-path";

const entity = `{
  "format_version": "1.16.0",
  "minecraft:entity": {
    "description": {
      "identifier": "blockception:example",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:behavior.look_at_player": { "probability": 1.0, "target_distance": 16 },
      "minecraft:damage_sensor": {
        "triggers": [
          { "cause": "all"}
        ]
      }
    },
    "events": {
    }
  }
}`;

describe("JsonPath", () => {
  const paths: { path: string; result: string }[] = [
    { path: "minecraft:entity", result: "minecraft:entity" },
    { path: "minecraft:entity/description", result: "description" },
    { path: "minecraft:entity/description/identifier", result: "identifier" },
    { path: "minecraft:entity\\description", result: "description" },
    { path: "minecraft:entity\\description/identifier", result: "identifier" },
  ];

  paths.forEach(item=>{
    it(`should parse ${item.path} to location of ${item.result}`, () => {
      const offset = JsonPath.resolve(entity, item.path);
      const actual = entity.indexOf(item.result);
      expect(offset).toEqual(actual);
    });
  })
});
