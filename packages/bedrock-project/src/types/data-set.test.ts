
import { DocumentLocation, Location } from 'bc-minecraft-bedrock-shared';
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { DataSet } from '../../src/types';

type TestObject = BaseObject;

namespace TestObject {
  export function create(
    id: string,
    uri: string,
    position: DocumentLocation | undefined = undefined,
  ): TestObject {
    return {
      id: id,
      location: Location.create(uri, position),
      documentation: 'custom object: ' + id,
    };
  }
}

const dataID = 'example.id';
const dataUri = 'c:\\project\\bp\\loot_tables\\example.data.json';
const dataFolder = 'c:\\project\\bp\\loot_tables';
const dataItem = TestObject.create(dataID, dataUri);

describe('DataSet', () => {
  it('set', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).toBeTruthy();
    expect(set.count()).toEqual(1);
  });

  it('get', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    const d = set.get(dataID);

    expect(d).toEqual(dataItem);
  });

  it('get duplicate', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);
    set.set(TestObject.create(dataID, 'I am different', 0));

    const d = set.get(dataID);

    expect(d).not.toEqual(dataItem);
    expect(d?.id).toEqual(dataItem.id);
  });

  it('has', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataID)).toBeTruthy();
  });

  it('duplicate sets', () => {
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

  it('clear', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();

    set.clear();

    expect(set.count()).toEqual(0);
    expect(set.has(dataID)).toBeFalsy();
  });

  it('count', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();

    expect(set.count()).toEqual(1);

    //duplicate sets
    set.set(TestObject.create('a', 'b'));
    set.set(TestObject.create('c', 'b'));
    set.set(TestObject.create('d', 'b'));

    expect(set.count()).toEqual(4);
  });

  it('delete1', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.delete(dataItem)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it('delete2', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.delete(dataID)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it('deleteFile', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.deleteFile(dataUri)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it('deleteFolder', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.has(dataItem)).toBeTruthy();
    expect(set.deleteFolder(dataFolder)).toBeTruthy();
    expect(set.has(dataItem)).toBeFalsy();
  });

  it('swap returns the previous item', () => {
    const set = new DataSet<TestObject>();

    expect(set.swap(dataItem)).toBeUndefined();

    const replacement = TestObject.create(dataID, 'I am different', 0);
    expect(set.swap(replacement)).toEqual(dataItem);
    expect(set.get(dataID)).toEqual(replacement);
  });

  it('set returns the uris of documents whose identifier got overwritten', () => {
    const set = new DataSet<TestObject>();

    expect(set.set(dataItem)).toEqual([]);
    expect(set.set(TestObject.create(dataID, 'I am different', 0))).toEqual([dataUri]);
  });

  it('set does not report a conflict for the same document', () => {
    const set = new DataSet<TestObject>();

    set.set(dataItem);

    expect(set.set(TestObject.create(dataID, dataUri, 1))).toEqual([]);
  });

  it('foreach', () => {
    const set = new DataSet<TestObject>();

    set.set(TestObject.create('a', 'b'));
    set.set(TestObject.create('c', 'b'));
    set.set(TestObject.create('d', 'b'));
    set.set(TestObject.create('e', 'b'));

    let count = 0;

    set.forEach((p) => {
      if (p) count++;
      else throw new Error('Item was undefined');
    });

    expect(count).toEqual(4);
  });
});
