import { DocumentLocation, Location } from 'bc-minecraft-bedrock-shared';
import { BaseObject } from 'bc-minecraft-bedrock-types';
import initSqlJs from 'sql.js';
import { SqliteDataSet } from './sqlite-data-set';

// Use the same concrete fake type as data-set.test.ts so the two test suites
// are directly comparable.
type TestObject = BaseObject;

namespace TestObject {
  export function create(
    id: string,
    uri: string,
    position: DocumentLocation | undefined = undefined,
  ): TestObject {
    return {
      id,
      location: Location.create(uri, position),
      documentation: 'custom object: ' + id,
    };
  }
}

const dataID = 'example.id';
const dataUri = 'c:\\project\\bp\\loot_tables\\example.data.json';
const dataFolder = 'c:\\project\\bp\\loot_tables';
const dataItem = TestObject.create(dataID, dataUri);

describe('SqliteDataSet', () => {
  let dataset: SqliteDataSet<TestObject>;

  // Each test gets a fresh in-memory database for full isolation.
  beforeEach(async () => {
    dataset = await SqliteDataSet.create<TestObject>('test');
  });

  // ── 1. set + get ──────────────────────────────────────────────────────────

  it('set + get round-trips a typed object through JSON', async () => {
    dataset.set(dataItem);

    const result = dataset.get(dataID);
    expect(result).toEqual(dataItem);
  });

  // ── 2. has ────────────────────────────────────────────────────────────────

  it('has returns true when item exists, false when it does not', () => {
    expect(dataset.has(dataID)).toBeFalsy();

    dataset.set(dataItem);

    expect(dataset.has(dataID)).toBeTruthy();
    expect(dataset.has('nonexistent')).toBeFalsy();
  });

  // ── 3. delete ─────────────────────────────────────────────────────────────

  it('delete removes by id and returns true; returns false when not found', () => {
    dataset.set(dataItem);

    expect(dataset.has(dataID)).toBeTruthy();
    expect(dataset.delete(dataID)).toBeTruthy();
    expect(dataset.has(dataID)).toBeFalsy();

    // Deleting a non-existent id should return false.
    expect(dataset.delete(dataID)).toBeFalsy();
  });

  it('delete accepts an Identifiable object', () => {
    dataset.set(dataItem);

    expect(dataset.delete(dataItem)).toBeTruthy();
    expect(dataset.has(dataItem)).toBeFalsy();
  });

  // ── 4. deleteFile ─────────────────────────────────────────────────────────

  it('deleteFile removes all items with matching uri', () => {
    const other = TestObject.create('other.id', 'c:\\project\\bp\\other.json');
    dataset.set(dataItem);
    dataset.set(other);

    expect(dataset.deleteFile(dataUri)).toBeTruthy();
    expect(dataset.has(dataID)).toBeFalsy();

    // Item with a different uri should survive.
    expect(dataset.has('other.id')).toBeTruthy();
  });

  it('deleteFile returns false when no items match', () => {
    expect(dataset.deleteFile('file:///nonexistent')).toBeFalsy();
  });

  // ── 5. deleteFolder ───────────────────────────────────────────────────────

  it('deleteFolder removes all items whose uri starts with the folder path', () => {
    const sibling = TestObject.create('sibling.id', 'c:\\project\\bp\\loot_tables\\other.json');
    const outside = TestObject.create('outside.id', 'c:\\project\\rp\\textures\\pig.png');

    dataset.set(dataItem);   // uri = dataUri (inside dataFolder)
    dataset.set(sibling);    // also inside 'c:\\project\\bp'
    dataset.set(outside);    // different root

    expect(dataset.deleteFolder(dataFolder)).toBeTruthy();

    expect(dataset.has(dataID)).toBeFalsy();
    expect(dataset.has('sibling.id')).toBeFalsy();
    // Item outside the folder should survive.
    expect(dataset.has('outside.id')).toBeTruthy();
  });

  it('deleteFolder returns false when no items match', () => {
    expect(dataset.deleteFolder('file:///nonexistent/')).toBeFalsy();
  });

  // ── 6. forEach ────────────────────────────────────────────────────────────

  it('forEach iterates all items', () => {
    dataset.set(TestObject.create('a', 'b'));
    dataset.set(TestObject.create('c', 'b'));
    dataset.set(TestObject.create('d', 'b'));
    dataset.set(TestObject.create('e', 'b'));

    let count = 0;
    dataset.forEach((item) => {
      if (item) count++;
      else throw new Error('Item was undefined');
    });

    expect(count).toEqual(4);
  });

  it('forEach passes thisArg correctly', () => {
    dataset.set(dataItem);
    const ctx = { called: false };

    dataset.forEach(function (this: typeof ctx) {
      this.called = true;
    }, ctx);

    expect(ctx.called).toBeTruthy();
  });

  // ── 7. find ───────────────────────────────────────────────────────────────

  it('find returns the matching item', () => {
    dataset.set(dataItem);
    dataset.set(TestObject.create('another.id', dataUri));

    const found = dataset.find((item) => item.id === dataID);
    expect(found).toEqual(dataItem);
  });

  it('find returns undefined when predicate never matches', () => {
    dataset.set(dataItem);

    const found = dataset.find(() => false);
    expect(found).toBeUndefined();
  });

  // ── 8. count ──────────────────────────────────────────────────────────────

  it('count returns the number of stored items', () => {
    expect(dataset.count()).toEqual(0);

    dataset.set(TestObject.create('a', 'b'));
    dataset.set(TestObject.create('c', 'b'));
    dataset.set(TestObject.create('d', 'b'));
    dataset.set(dataItem);

    expect(dataset.count()).toEqual(4);
  });

  // ── 9. clear ──────────────────────────────────────────────────────────────

  it('clear removes all items', () => {
    dataset.set(dataItem);
    dataset.set(TestObject.create('a', 'b'));

    expect(dataset.count()).toBeGreaterThan(0);

    dataset.clear();

    expect(dataset.count()).toEqual(0);
    expect(dataset.has(dataID)).toBeFalsy();
  });

  // ── 10. set with array ────────────────────────────────────────────────────

  it('set with array inserts multiple items at once', () => {
    const items = [
      TestObject.create('x1', 'file:///a.json'),
      TestObject.create('x2', 'file:///b.json'),
      TestObject.create('x3', 'file:///c.json'),
    ];

    dataset.set(items);

    expect(dataset.count()).toEqual(3);
    expect(dataset.has('x1')).toBeTruthy();
    expect(dataset.has('x2')).toBeTruthy();
    expect(dataset.has('x3')).toBeTruthy();
  });

  // ── 11. upsert behaviour ──────────────────────────────────────────────────

  it('setting the same id twice keeps the latest value', () => {
    const updated = TestObject.create(dataID, 'new-uri');

    dataset.set(dataItem);
    dataset.set(updated);

    // Should still be one row.
    expect(dataset.count()).toEqual(1);

    const result = dataset.get(dataID);
    expect(result).toEqual(updated);
    expect(result).not.toEqual(dataItem);
  });

  // ── shared DB across datasets ─────────────────────────────────────────────

  it('two datasets can share the same Database instance', async () => {
    const SQL = await initSqlJs();
    const db = new SQL.Database();

    const ds1 = await SqliteDataSet.create<TestObject>('table_one', db);
    const ds2 = await SqliteDataSet.create<TestObject>('table_two', db);

    ds1.set(dataItem);
    ds2.set(TestObject.create('other.id', 'other.uri'));

    // Each dataset is isolated to its own table.
    expect(ds1.has(dataID)).toBeTruthy();
    expect(ds1.has('other.id')).toBeFalsy();

    expect(ds2.has('other.id')).toBeTruthy();
    expect(ds2.has(dataID)).toBeFalsy();
  });
});
