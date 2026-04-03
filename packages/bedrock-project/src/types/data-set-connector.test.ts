
import { Location } from 'bc-minecraft-bedrock-shared';
import { BaseObject } from 'bc-minecraft-bedrock-types';
import { MCProject } from 'bc-minecraft-project';
import { randomUUID } from 'crypto';
import { PackType } from '../project/pack-type';
import { Manifest } from '../internal/types';
import { DataSet } from './data-set';
import { DataSetConnector } from './data-set-connector';
import { Pack } from './pack';
import { PackCollection } from './pack-collection';
import { TextDocument } from './text-document';

// ─── helpers ────────────────────────────────────────────────────────────────

type TestObject = BaseObject;

namespace TestObject {
  export function create(id: string, uri: string): TestObject {
    return {
      id,
      location: Location.create(uri),
      documentation: 'test: ' + id,
    };
  }
}

/** A minimal Pack implementation that holds one DataSet of TestObjects. */
class TestPack implements Pack {
  type: PackType = PackType.unknown;
  folder: string;
  context: MCProject;
  manifest: Manifest;
  data: DataSet<TestObject>;

  constructor(folder = 'c:\\pack') {
    this.folder = folder;
    this.context = MCProject.createEmpty();
    this.data = new DataSet<TestObject>();
    this.manifest = {
      format_version: '1.0.0',
      header: {
        description: '',
        name: 'test pack',
        uuid: randomUUID(),
        version: [1, 0, 0],
      },
    };
  }

  process(_doc: TextDocument) {
    return undefined;
  }
  deleteFile(_uri: string): boolean {
    return false;
  }
  deleteFolder(_uri: string): boolean {
    return false;
  }
  find(): BaseObject | undefined {
    return undefined;
  }
  forEach(): void {}
}

/** A PackCollection that holds TestPack instances. */
class TestPackCollection extends PackCollection<TestPack> {}

/**
 * Build a DataSetConnector that maps each TestPack to its `.data` DataSet.
 */
function makeConnector(collection: TestPackCollection): DataSetConnector<TestObject, TestPack> {
  return new DataSetConnector(collection, (pack) => pack.data);
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe('DataSetConnector', () => {
  it('get() returns the item when it exists in the first pack', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    const item = TestObject.create('foo', 'c:\\pack1\\foo.json');
    pack1.data.set(item);

    const connector = makeConnector(collection);
    expect(connector.get('foo')).toEqual(item);
  });

  it('get() returns the item when it exists only in the second pack', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    const item = TestObject.create('bar', 'c:\\pack2\\bar.json');
    pack2.data.set(item);

    const connector = makeConnector(collection);
    expect(connector.get('bar')).toEqual(item);
  });

  it('get() returns undefined when the item is absent from all packs', () => {
    const collection = new TestPackCollection();
    collection.packs.push(new TestPack('c:\\pack1'));

    const connector = makeConnector(collection);
    expect(connector.get('missing')).toBeUndefined();
  });

  it('has() returns false when the item is absent from all packs', () => {
    const collection = new TestPackCollection();
    collection.packs.push(new TestPack('c:\\pack1'), new TestPack('c:\\pack2'));

    const connector = makeConnector(collection);
    expect(connector.has('ghost')).toBe(false);
  });

  it('has() returns true when the item exists in any pack', () => {
    const collection = new TestPackCollection();
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(new TestPack('c:\\pack1'), pack2);

    pack2.data.set(TestObject.create('exists', 'c:\\pack2\\exists.json'));

    const connector = makeConnector(collection);
    expect(connector.has('exists')).toBe(true);
  });

  it('forEach() visits all items across all packs without duplication', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    pack1.data.set(TestObject.create('a', 'c:\\pack1\\a.json'));
    pack1.data.set(TestObject.create('b', 'c:\\pack1\\b.json'));
    pack2.data.set(TestObject.create('c', 'c:\\pack2\\c.json'));

    const connector = makeConnector(collection);
    const visited: string[] = [];
    connector.forEach((item) => visited.push(item.id));

    expect(visited).toHaveLength(3);
    expect(visited).toContain('a');
    expect(visited).toContain('b');
    expect(visited).toContain('c');
    // Ensure no duplicates
    expect(new Set(visited).size).toEqual(visited.length);
  });

  it('find() returns the first item matching the predicate', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    const itemInPack1 = TestObject.create('target', 'c:\\pack1\\target.json');
    const itemInPack2 = TestObject.create('other', 'c:\\pack2\\other.json');
    pack1.data.set(itemInPack1);
    pack2.data.set(itemInPack2);

    const connector = makeConnector(collection);
    const result = connector.find((v) => v.id === 'target');

    expect(result).toEqual(itemInPack1);
  });

  it('find() returns undefined when no item matches', () => {
    const collection = new TestPackCollection();
    collection.packs.push(new TestPack('c:\\pack1'));

    const connector = makeConnector(collection);
    expect(connector.find(() => false)).toBeUndefined();
  });

  it('find() stops at the first matching item and does not visit later packs', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    pack1.data.set(TestObject.create('x', 'c:\\pack1\\x.json'));
    pack2.data.set(TestObject.create('y', 'c:\\pack2\\y.json'));

    const connector = makeConnector(collection);
    const visited: string[] = [];
    connector.find((v) => {
      visited.push(v.id);
      return v.id === 'x'; // match on first item of pack1 → should not visit pack2
    });

    expect(visited).not.toContain('y');
  });

  /**
   * When two packs contain an item with the same ID, the pack that appears
   * first in `PackCollection.packs` takes priority. This is the intended
   * behaviour and mirrors standard Minecraft pack-override semantics.
   */
  it('get() returns the item from the first pack when both packs share the same ID (first-pack priority)', () => {
    const collection = new TestPackCollection();
    const pack1 = new TestPack('c:\\pack1');
    const pack2 = new TestPack('c:\\pack2');
    collection.packs.push(pack1, pack2);

    const itemFromPack1 = TestObject.create('shared', 'c:\\pack1\\shared.json');
    const itemFromPack2 = TestObject.create('shared', 'c:\\pack2\\shared.json');
    pack1.data.set(itemFromPack1);
    pack2.data.set(itemFromPack2);

    const connector = makeConnector(collection);
    const result = connector.get('shared');

    // The first pack's item must win.
    expect(result).toEqual(itemFromPack1);
    expect(result?.location.uri).toEqual('c:\\pack1\\shared.json');
  });
});
