import { Position } from '../position';
import { DocumentLocation } from './types';

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
const identifierPos = Position.create(4, 7);
const identifierOffset = jsonData.indexOf(identifierKey);

const jsonWrapper = {
  getText(): string {
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
      const offset = DocumentLocation.toOffset(I, jsonData);

      expect(offset).toEqual(I);
    }
  });

  it('toOffset - number2', () => {
    //Rolled 10d20 = 72
    for (let I = 0; I < 1000; I += 72) {
      const offset = DocumentLocation.toOffset(I, jsonWrapper);

      expect(offset).toEqual(I);
    }
  });

  it('toOffset - JsonPath', () => {
    const offset = DocumentLocation.toOffset('minecraft:entity/description/identifier', jsonData);

    expect(offset).toEqual(identifierOffset);
  });

  it('toOffset - Position', () => {
    const offset = DocumentLocation.toOffset({ character: 7, line: 4 }, jsonData);

    expect(offset).toEqual(identifierOffset);
  });

  it('toPosition - JsonPath', () => {
    const P = DocumentLocation.toPosition('minecraft:entity/description/identifier', jsonData);

    expect(P).toEqual(identifierPos);
  });

  it('toPosition - JsonPath', () => {
    const P = DocumentLocation.toPosition(identifierPos, jsonData);

    expect(P).toEqual(identifierPos);
  });

  it('toPosition - offset', () => {
    const P = DocumentLocation.toPosition(identifierOffset, jsonData);

    expect(P).toEqual(identifierPos);
  });

  it('toOffset - OffsetWord', () => {
    const offsetWord = { text: 'example', offset: 100 };
    const offset = DocumentLocation.toOffset(offsetWord);

    expect(offset).toEqual(100);
  });

  it('toOffset - unknown type defaults to 0', () => {
    // Pass a boolean which doesn't match any case in the switch statement
    const offset = DocumentLocation.toOffset(true as any, jsonData);

    expect(offset).toEqual(0);
  });

  it('toPosition - OffsetWord', () => {
    const text = 'identifier';
    const offsetWord = { text: text, offset: 0 };
    const P = DocumentLocation.toPosition(offsetWord, text);

    expect(P).toEqual(Position.create(0, 0));
  });

  it('toPosition - default case', () => {
    const P = DocumentLocation.toPosition(undefined as any, jsonData);

    expect(P).toEqual(Position.create(0, 0));
  });

  it('toRange - OffsetWord', () => {
    const text = 'identifier';
    const offsetWord = { text: text, offset: 0 };
    const range = DocumentLocation.toRange(offsetWord);

    expect(range.start).toEqual(Position.create(0, 0));
    expect(range.end).toEqual(Position.create(0, text.length));
  });

  it('toRange - number with text and length', () => {
    const range = DocumentLocation.toRange(identifierOffset, jsonData, identifierKey.length);

    expect(range.start).toEqual(identifierPos);
    expect(range.end.line).toEqual(4);
    expect(range.end.character).toEqual(17);
  });

  it('toRange - throws error without text', () => {
    expect(() => DocumentLocation.toRange(identifierOffset, undefined as any, identifierKey.length)).toThrow(
      'requires text or document',
    );
  });

  it('toRange - throws error without length', () => {
    expect(() => DocumentLocation.toRange(identifierOffset, jsonData, undefined as any)).toThrow('requires length');
  });
});
