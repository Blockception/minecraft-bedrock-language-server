"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
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
const identifierKey = 'identifier';
const identifierPos = types_1.Position.create(4, 7);
const identifierOffset = jsonData.indexOf(identifierKey);
describe('Position', () => {
    it('Const Check', () => {
        const p = jsonData.slice(identifierOffset, identifierKey.length + identifierOffset);
        expect(p).toEqual(p);
    });
    it('toPosition', () => {
        const P = types_1.Position.toPosition(identifierOffset, jsonData);
        expect(P).toEqual(identifierPos);
    });
    it('toOffset', () => {
        const offset = types_1.Position.toOffset(identifierPos, jsonData);
        expect(offset).toEqual(identifierOffset);
    });
    it('is', () => {
        expect(types_1.Position.is({ character: 0, line: 0 })).toBeTruthy();
        expect(types_1.Position.is({ character: -15, line: 135 })).toBeTruthy();
        expect(types_1.Position.is({ character: 'false', line: 135 })).toBeFalsy();
        expect(types_1.Position.is({ character: -15, line: '135' })).toBeFalsy();
        expect(types_1.Position.is({ character: false, line: '135' })).toBeFalsy();
        expect(types_1.Position.is({ line: 135 })).toBeFalsy();
        expect(types_1.Position.is({ character: 0 })).toBeFalsy();
    });
    it('create', () => {
        const pos = types_1.Position.create(5, 10);
        expect(pos.line).toEqual(5);
        expect(pos.character).toEqual(10);
    });
    it('toOffset with position beyond all lines', () => {
        const simpleText = 'hello world';
        const pos = types_1.Position.create(5, 3);
        const offset = types_1.Position.toOffset(pos, simpleText);
        // Since there are no newlines, should return the character position
        expect(offset).toEqual(3);
    });
    it('toOffset with object implementing offsetAt', () => {
        const mockDoc = {
            offsetAt: (position) => {
                return position.line * 100 + position.character;
            },
        };
        const pos = types_1.Position.create(2, 5);
        const offset = types_1.Position.toOffset(pos, mockDoc);
        expect(offset).toEqual(205);
    });
    it('toPosition with object implementing positionAt', () => {
        const mockDoc = {
            positionAt: (offset) => {
                return types_1.Position.create(Math.floor(offset / 100), offset % 100);
            },
        };
        const position = types_1.Position.toPosition(205, mockDoc);
        expect(position.line).toEqual(2);
        expect(position.character).toEqual(5);
    });
});
//# sourceMappingURL=types.test.js.map