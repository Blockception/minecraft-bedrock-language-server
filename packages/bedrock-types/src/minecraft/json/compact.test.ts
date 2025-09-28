import { CompactJsonReader } from "../../../src/minecraft/json";
import { CompactJson } from "../../../src/minecraft/json/compact";

interface TestData {
  text: string;
  offset: number;
  result: CompactJson.INode;
}

describe("Compact Json", () => {
  describe("Should parse string", () => {
    const data: TestData[] = [
      { text: "abc", offset: 0, result: { type: CompactJson.Type.String, offset: 0, negative: false, value: "abc" } },
      { text: "!abc", offset: 0, result: { type: CompactJson.Type.String, offset: 0, negative: true, value: "abc" } },
      { text: "abc", offset: 1, result: { type: CompactJson.Type.String, offset: 1, negative: false, value: "abc" } },
      { text: "!abc", offset: 1, result: { type: CompactJson.Type.String, offset: 1, negative: true, value: "abc" } },
    ];

    it.each(data)("Should be able to parse $test", (item) => {
      const result = CompactJson.parse(item.text, item.offset);
      expect(result).toEqual(expect.objectContaining(item.result));
    });
  });

  describe("Should parse object", () => {
    const data: TestData[] = [
      { text: "{}", offset: 0, result: { type: CompactJson.Type.Object, offset: 1, negative: false, value: [] } },
      { text: "!{}", offset: 0, result: { type: CompactJson.Type.Object, offset: 1, negative: true, value: [] } },
      { text: "{}", offset: 1, result: { type: CompactJson.Type.Object, offset: 2, negative: false, value: [] } },
      { text: "!{}", offset: 1, result: { type: CompactJson.Type.Object, offset: 2, negative: true, value: [] } },
    ];

    it.each(data)("Should be able to parse $test", (item) => {
      const result = CompactJson.parse(item.text, item.offset);
      expect(result).toEqual(expect.objectContaining(item.result));
    });
  });

  describe("Should parse array", () => {
    const data: TestData[] = [
      { text: "[]", offset: 0, result: { type: CompactJson.Type.Array, offset: 1, negative: false, value: [] } },
      { text: "![]", offset: 0, result: { type: CompactJson.Type.Array, offset: 1, negative: true, value: [] } },
      { text: "[]", offset: 1, result: { type: CompactJson.Type.Array, offset: 2, negative: false, value: [] } },
      { text: "![]", offset: 1, result: { type: CompactJson.Type.Array, offset: 2, negative: true, value: [] } },
    ];

    it.each(data)("Should be able to parse $test", (item) => {
      const result = CompactJson.parse(item.text, item.offset);
      expect(result).toEqual(expect.objectContaining(item.result));
    });
  });

  describe("Examples", () => {
    //Examples set
    const data: TestData[] = [
      {
        text: "{a=1,b=2}",
        offset: 0,
        result: {
          type: CompactJson.Type.Object,
          offset: 1,
          negative: false,
          value: [
            { key: "a", type: CompactJson.Type.String, offset: 1, negative: false, value: "1" },
            { key: "b", type: CompactJson.Type.String, offset: 5, negative: false, value: "2" },
          ],
        },
      },
      {
        text: "{data={a=1..2}}",
        offset: 15,
        result: {
          type: CompactJson.Type.Object,
          offset: 16,
          negative: false,
          value: [
            {
              key: "data",
              type: CompactJson.Type.Object,
              offset: 16,
              negative: false,
              value: [{ key: "a", type: CompactJson.Type.String, offset: 22, negative: false, value: "1..2" }],
            },
          ],
        },
      },
      {
        text: "[a=[b={c=!1}]]",
        offset: 12,
        result: {
          type: CompactJson.Type.Array,
          offset: 13,
          negative: false,
          value: [
            {
              key: "a",
              type: CompactJson.Type.Array,
              offset: 13,
              negative: false,
              value: [
                {
                  key: "b",
                  type: CompactJson.Type.Object,
                  offset: 16,
                  negative: false,
                  value: [{ key: "c", type: CompactJson.Type.String, offset: 19, negative: true, value: "1" }],
                },
              ],
            },
          ],
        },
      },
      {
        text: "[hasitem=[{item=minecraft:stone},{data=!1}]]",
        offset: 10,
        result: {
          type: CompactJson.Type.Array,
          negative: false,
          offset: 11,
          value: [
            {
              key: "hasitem",
              type: CompactJson.Type.Array,
              negative: false,
              offset: 11,
              value: [
                {
                  type: CompactJson.Type.Object,
                  negative: false,
                  offset: 21,
                  value: [
                    {
                      key: "item",
                      type: CompactJson.Type.String,
                      negative: false,
                      offset: 21,
                      value: "minecraft:stone",
                    },
                  ],
                },
                {
                  type: CompactJson.Type.Object,
                  negative: false,
                  offset: 44,
                  value: [
                    {
                      key: "data",
                      type: CompactJson.Type.String,
                      negative: true,
                      offset: 44,
                      value: "1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        text: "[a=1,b=2,hasitem=[{item=minecraft:stone},{data=1}],a=1..3,hasitem=[{item=!minecraft:dirt},{data=!2}]]",
        offset: 10,
        result: {
          type: CompactJson.Type.Array,
          offset: 11,
          negative: false,
          value: [
            { key: "a", type: CompactJson.Type.String, offset: 11, negative: false, value: "1" },
            { key: "b", type: CompactJson.Type.String, offset: 15, negative: false, value: "2" },
            {
              key: "hasitem",
              type: CompactJson.Type.Array,
              offset: 19,
              negative: false,
              value: [
                {
                  type: CompactJson.Type.Object,
                  offset: 29,
                  negative: false,
                  value: [
                    {
                      key: "item",
                      negative: false,
                      offset: 29,
                      type: CompactJson.Type.String,
                      value: "minecraft:stone",
                    },
                  ],
                },
                {
                  type: CompactJson.Type.Object,
                  offset: 52,
                  negative: false,
                  value: [
                    {
                      key: "data",
                      negative: false,
                      offset: 52,
                      type: CompactJson.Type.String,
                      value: "1",
                    },
                  ],
                },
              ],
            },
            { key: "a", type: CompactJson.Type.String, offset: 61, negative: false, value: "1..3" },
            {
              key: "hasitem",
              type: CompactJson.Type.Array,
              offset: 68,
              negative: false,
              value: [
                {
                  type: CompactJson.Type.Object,
                  negative: false,
                  offset: 78,
                  value: [
                    {
                      key: "item",
                      negative: true,
                      offset: 78,
                      type: CompactJson.Type.String,
                      value: "minecraft:dirt",
                    },
                  ],
                },
                {
                  type: CompactJson.Type.Object,
                  negative: false,
                  offset: 101,
                  value: [
                    {
                      key: "data",
                      negative: true,
                      offset: 101,
                      type: CompactJson.Type.String,
                      value: "2",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        text: "[x =~0.5, y=50, z =~50,r =50, rm =3,tag =something,tag =!foo]",
        offset: 10,
        result: {
          type: CompactJson.Type.Array,
          offset: 11,
          negative: false,
          value: [
            { key: "x", type: CompactJson.Type.String, offset: 11, negative: false, value: "~0.5" },
            { key: "y", type: CompactJson.Type.String, offset: 19, negative: false, value: "50" },
            { key: "z", type: CompactJson.Type.String, offset: 25, negative: false, value: "~50" },
            { key: "r", type: CompactJson.Type.String, offset: 33, negative: false, value: "50" },
            { key: "rm", type: CompactJson.Type.String, offset: 39, negative: false, value: "3" },
            { key: "tag", type: CompactJson.Type.String, offset: 46, negative: false, value: "something" },
            { key: "tag", type: CompactJson.Type.String, offset: 61, negative: true, value: "foo" },
          ],
        },
      },
    ];

    it.each(data)("Should be able to parse $test", (item) => {
      const result = CompactJson.parse(item.text, item.offset);
      expect(result).toEqual(expect.objectContaining(item.result));
    });
  });

  describe("Reader", () => {
    it("Sanity check string reader", () => {
      const data: CompactJson.IString = {
        type: CompactJson.Type.String,
        offset: 0,
        negative: false,
        value: "test",
        key: "keyTest",
      };

      const reader = new CompactJsonReader(data);
      expect(reader).toEqual(
        expect.objectContaining({
          type: data.type,
          offset: data.offset,
          negative: data.negative,
          value: data.value,
          key: data.key,
        })
      );

      expect(reader.hasKey()).toBeTruthy();
    });

    it("Sanity check object reader", () => {
      const data: CompactJson.IObject = {
        type: CompactJson.Type.Object,
        offset: 0,
        negative: false,
        value: [],
        key: "keyTest",
      };

      const reader = new CompactJsonReader(data);
      expect(reader).toEqual(
        expect.objectContaining({
          type: data.type,
          offset: data.offset,
          negative: data.negative,
          value: data.value,
          key: data.key,
        })
      );

      expect(reader.hasKey()).toBeTruthy();
    });

    it("Sanity check array reader", () => {
      const data: CompactJson.IArray = {
        type: CompactJson.Type.Array,
        offset: 0,
        negative: false,
        value: [],
        key: "keyTest",
      };

      const reader = new CompactJsonReader(data);
      expect(reader).toEqual(
        expect.objectContaining({
          type: data.type,
          offset: data.offset,
          negative: data.negative,
          value: data.value,
          key: data.key,
        })
      );

      expect(reader.hasKey()).toBeTruthy();
    });
  });
});
