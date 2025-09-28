import { Types } from "bc-minecraft-bedrock-types";
import { Location } from "bc-minecraft-bedrock-types/lib/types";
import { DataSet } from "../../src/types";

type TestObject = Types.BaseObject;

namespace TestObject {
  export function create(
    id: string,
    uri: string,
    position: Types.DocumentLocation | undefined = undefined
  ): TestObject {
    return {
      id: id,
      location: Location.create(uri, position),
      documentation: "custom object: " + id,
    };
  }
}

const dataID = "example.id";
const dataUri = "c:\\project\\bp\\loot_tables\\example.data.json";
const dataFolder = "c:\\project\\bp\\loot_tables";
const dataItem = TestObject.create(dataID, dataUri);

describe("DataSet", () => {
  it("set", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).toBeTruthy();
    expect(set.count()).toEqual(1);
  });

  it("get", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    const d = set.get(dataID);

    expect(d).toEqual(dataItem);
  });

  it("get duplicate", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);
    set.set(TestObject.create(dataID, "I am different", 0));

    const d = set.get(dataID);

    expect(d).not.toEqual(dataItem);
    expect(d?.id).toEqual(dataItem.id);
  });

  it("has", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).toBeTruthy();
  });

  it("duplicate sets", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();

    expect(set.count()).toEqual(1);

    //duplicate sets
    set.set(dataItem);
    set.set(dataItem);
    set.set(dataItem);

    expect(set.count()).toEqual(1);
  });

  it("clear", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();

    set.clear();

    expect(set.count()).toEqual(0);
    expect(set.has(dataID)).toBeFalsy();
  });

  it("count", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();

    expect(set.count()).toEqual(1);

    //duplicate sets
    set.set(TestObject.create("a", "b"));
    set.set(TestObject.create("c", "b"));
    set.set(TestObject.create("d", "b"));

    expect(set.count()).toEqual(4);
  });

  it("delete1", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.delete(dataItem)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it("delete2", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.delete(dataID)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it("deleteFile", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.deleteFile(dataUri)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it("deleteFolder", () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.deleteFolder(dataFolder)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it("foreach", () => {
    const set = new DataSet<TestObject>();

    set.set(TestObject.create("a", "b"));
    set.set(TestObject.create("c", "b"));
    set.set(TestObject.create("d", "b"));
    set.set(TestObject.create("e", "b"));

    let count = 0;

    set.forEach((p) => {
      if (p) count++;
      else throw new Error("Item was undefined");
    });

    expect(count).toEqual(4);
  });
});
