import { getJsonPath, getSiblingPropertyValue } from './path';

interface TestCase {
  element: string;
  expectedPath: string;
}

describe('JsonPath', () => {
  const json = `{
    "format_version": "1.20.41",
    "minecraft:volume": {
      "description": {
        "identifier": "bar:foo"
      },
      "components": {
        "minecraft:bounds": {
          "min": [-50, 0, -50],
          "max": [50, 256, 50]
        },
        "minecraft:fog": {
          "fog_identifier": "minecraft:fog_savanna",
          "priority": 1
        }
      }
    }
  }`;

  const properties: TestCase[] = [
    {
      element: 'fog_identifier',
      expectedPath: 'minecraft:volume/components/minecraft:fog/fog_identifier',
    },
    {
      element: 'min',
      expectedPath: 'minecraft:volume/components/minecraft:bounds/min',
    },
    {
      element: 'max',
      expectedPath: 'minecraft:volume/components/minecraft:bounds/max',
    },
    {
      element: 'identifier',
      expectedPath: 'minecraft:volume/description/identifier',
    },
    {
      element: 'format_version',
      expectedPath: 'format_version',
    },
  ];

  properties.forEach(({ element, expectedPath }) => {
    const search = `"${element}":`;
    const index = json.indexOf(search);

    test(`should return the correct path for ${element}`, () => {
      const result = getJsonPath(index, json);
      expect(result.path).toEqual(expectedPath);
      expect(result.isProperty).toBeFalsy();
    });

    test(`should return the correct path for ${element}, if the cursor is after it`, () => {
      const result = getJsonPath(index + search.length, json);
      expect(result.path).toEqual(expectedPath);
      expect(result.isProperty).toBeTruthy();
    });

    test(`should return the correct path for the cursor if before the property: ${element}`, () => {
      const result = getJsonPath(index - 1, json);
      expect(result.path).not.toEqual(expectedPath);
      expect(expectedPath).toContain(result.path);
      expect(result.isProperty).toBeFalsy();
    });
  });
});

describe('getSiblingPropertyValue', () => {
  const json = `{
    "minecraft:feature_rules": {
      "conditions": {
        "minecraft:biome_filter": [
          {
            "test": "has_biome_tag",
            "operator": "==",
            "value": "overworld"
          }
        ]
      }
    }
  }`;

  test('finds the sibling value next to the cursor', () => {
    const cursor = json.indexOf('"overworld"') + 2;

    expect(getSiblingPropertyValue(cursor, json, 'test')).toEqual('has_biome_tag');
  });

  test('finds the sibling value while the value is still being typed', () => {
    const incomplete = `{
      "test": "has_biome_tag",
      "operator": "==",
      "value": "ov`;
    const cursor = incomplete.length;

    expect(getSiblingPropertyValue(cursor, incomplete, 'test')).toEqual('has_biome_tag');
  });

  test('returns undefined if the sibling property does not exist', () => {
    const cursor = json.indexOf('"overworld"') + 2;

    expect(getSiblingPropertyValue(cursor, json, 'domain')).toBeUndefined();
  });

  test('returns undefined if the cursor is not inside an object', () => {
    expect(getSiblingPropertyValue(0, '[]', 'test')).toBeUndefined();
  });
});
