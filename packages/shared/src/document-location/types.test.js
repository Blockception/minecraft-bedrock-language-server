"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("../position");
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
const identifierPos = position_1.Position.create(4, 7);
const identifierOffset = jsonData.indexOf(identifierKey);
const jsonWrapper = {
    getText() {
        return jsonData;
    },
};
describe('DocumentLocation', () => {
    it('Const Check', () => {
        const p = jsonData.slice(identifierOffset, identifierKey.length + identifierOffset);
        expect(p).toEqual(p);
    });
    it('toOffset - number', () => {
        //Rolled 10d20 = 72
        for (let I = 0; I < 1000; I += 72) {
            const offset = types_1.DocumentLocation.toOffset(I, jsonData);
            expect(offset).toEqual(I);
        }
    });
    it('toOffset - number2', () => {
        //Rolled 10d20 = 72
        for (let I = 0; I < 1000; I += 72) {
            const offset = types_1.DocumentLocation.toOffset(I, jsonWrapper);
            expect(offset).toEqual(I);
        }
    });
    it('toOffset - JsonPath', () => {
        const offset = types_1.DocumentLocation.toOffset('minecraft:entity/description/identifier', jsonData);
        expect(offset).toEqual(identifierOffset);
    });
    it('toOffset - Position', () => {
        const offset = types_1.DocumentLocation.toOffset({ character: 7, line: 4 }, jsonData);
        expect(offset).toEqual(identifierOffset);
    });
    it('toPosition - JsonPath', () => {
        const P = types_1.DocumentLocation.toPosition('minecraft:entity/description/identifier', jsonData);
        expect(P).toEqual(identifierPos);
    });
    it('toPosition - JsonPath', () => {
        const P = types_1.DocumentLocation.toPosition(identifierPos, jsonData);
        expect(P).toEqual(identifierPos);
    });
    it('toPosition - offset', () => {
        const P = types_1.DocumentLocation.toPosition(identifierOffset, jsonData);
        expect(P).toEqual(identifierPos);
    });
    it('toOffset - OffsetWord', () => {
        const offsetWord = { text: 'example', offset: 100 };
        const offset = types_1.DocumentLocation.toOffset(offsetWord);
        expect(offset).toEqual(100);
    });
    it('toOffset - unknown type defaults to 0', () => {
        // Pass a boolean which doesn't match any case in the switch statement
        const offset = types_1.DocumentLocation.toOffset(true, jsonData);
        expect(offset).toEqual(0);
    });
    it('toPosition - OffsetWord', () => {
        const text = 'identifier';
        const offsetWord = { text: text, offset: 0 };
        const P = types_1.DocumentLocation.toPosition(offsetWord, text);
        expect(P).toEqual(position_1.Position.create(0, 0));
    });
    it('toPosition - default case', () => {
        const P = types_1.DocumentLocation.toPosition(undefined, jsonData);
        expect(P).toEqual(position_1.Position.create(0, 0));
    });
    it('toRange - OffsetWord', () => {
        const text = 'identifier';
        const offsetWord = { text: text, offset: 0 };
        const range = types_1.DocumentLocation.toRange(offsetWord);
        expect(range.start).toEqual(position_1.Position.create(0, 0));
        expect(range.end).toEqual(position_1.Position.create(0, text.length));
    });
    it('toRange - number with text and length', () => {
        const range = types_1.DocumentLocation.toRange(identifierOffset, jsonData, identifierKey.length);
        expect(range.start).toEqual(identifierPos);
        expect(range.end.line).toEqual(4);
        expect(range.end.character).toEqual(17);
    });
    it('toRange - throws error without text', () => {
        expect(() => types_1.DocumentLocation.toRange(identifierOffset, undefined, identifierKey.length)).toThrow('requires text or document');
    });
    it('toRange - throws error without length', () => {
        expect(() => types_1.DocumentLocation.toRange(identifierOffset, jsonData, undefined)).toThrow('requires length');
    });
});
//# sourceMappingURL=types.test.js.map