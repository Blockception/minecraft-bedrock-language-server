"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const jsonData = `{
  "format_version": "1.17.0",
  "minecraft:entity": {
    "description": {
      "identifier": "example:foo",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {},
    "components": {
      "minecraft:type_family": { "family": ["foo"] },
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:damage_sensor": {
        "triggers": { "cause": "all", "deals_damage": false }
      }
    },
    "events": {}
  }
}
`;
const identifierKey = "identifier";
const identifierPos = _1.Position.create(4, 7);
const identifierOffset = jsonData.indexOf(identifierKey);
describe("Position", () => {
    it("Const Check", () => {
        const p = jsonData.slice(identifierOffset, identifierKey.length + identifierOffset);
        expect(p).toEqual(p);
    });
    it("toPosition", () => {
        const P = _1.Position.toPosition(identifierOffset, jsonData);
        expect(P).toEqual(identifierPos);
    });
    it("toOffset", () => {
        const offset = _1.Position.toOffset(identifierPos, jsonData);
        expect(offset).toEqual(identifierOffset);
    });
    it("is", () => {
        expect(_1.Position.is({ character: 0, line: 0 })).toBeTruthy();
        expect(_1.Position.is({ character: -15, line: 135 })).toBeTruthy();
        expect(_1.Position.is({ character: "false", line: 135 })).toBeFalsy();
        expect(_1.Position.is({ character: -15, line: "135" })).toBeFalsy();
        expect(_1.Position.is({ character: false, line: "135" })).toBeFalsy();
        expect(_1.Position.is({ line: 135 })).toBeFalsy();
        expect(_1.Position.is({ character: 0 })).toBeFalsy();
    });
});
//# sourceMappingURL=position.test.js.map