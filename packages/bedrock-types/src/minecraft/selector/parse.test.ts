import { CompactJson } from '../json';
import { Selector } from ".";

interface TestData {
  selector: string;
  offset: number;
  type: string;
  contains: string[];
}

describe("Selector - Parse", () => {
  const data = [
    {
      selector: "@a[tag=Sometag,scores={foo=1..}]",
      offset: 0,
      type: "@a",
      contains: ["tag", "scores"],
    },
    {
      selector: "@a[tag=Sometag,scores={foo=1..}]",
      offset: 0,
      type: "@a",
      contains: ["tag", "scores"],
    },
    {
      selector: "@a[x=~0.5,y=50,z=~50,r=50,rm=3,tag=something]",
      offset: 0,
      type: "@a",
      contains: ["x", "y", "z", "r", "rm", "tag"],
    },
    {
      selector: "@e[family=]",
      offset: 5,
      type: "@e",
      contains: ["family"],
    },
    {
      selector: "@a[x =~0.5, y=50, z =~50,r =50, rm =3,tag =something,tag =!foo]",
      offset: 5,
      type: "@a",
      contains: ["x", "y", "z", "r", "rm", "tag"],
    },
  ];

  data.forEach((test: TestData) => {
    it(`Should parse ${test.selector}`, () => {
      const { selector, offset } = test;
      const sel = Selector.parse(selector, offset);

      expect(sel).toBeDefined();
      if (sel === undefined) return;

      expect(sel.selectorType).toEqual(test.type);
      expect(sel.type).toEqual(CompactJson.Type.Array);

      test.contains.forEach((attr) => contains(sel, attr));
    });
  });
});

function contains(sel: Selector, attr: string) {
  expect(sel.contains(attr)).toBeTruthy();
}
