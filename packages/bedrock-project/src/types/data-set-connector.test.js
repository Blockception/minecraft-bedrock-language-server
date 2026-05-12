"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const crypto_1 = require("crypto");
const pack_type_1 = require("../project/pack-type");
const data_set_1 = require("./data-set");
const data_set_connector_1 = require("./data-set-connector");
const pack_collection_1 = require("./pack-collection");
var TestObject;
(function (TestObject) {
    function create(id, uri) {
        return {
            id,
            location: bc_minecraft_bedrock_shared_1.Location.create(uri),
            documentation: 'test: ' + id,
        };
    }
    TestObject.create = create;
})(TestObject || (TestObject = {}));
/** A minimal Pack implementation that holds one DataSet of TestObjects. */
class TestPack {
    type = pack_type_1.PackType.unknown;
    folder;
    context;
    manifest;
    data;
    constructor(folder = 'c:\\pack') {
        this.folder = folder;
        this.context = bc_minecraft_project_1.MCProject.createEmpty();
        this.data = new data_set_1.DataSet();
        this.manifest = {
            format_version: '1.0.0',
            header: {
                description: '',
                name: 'test pack',
                uuid: (0, crypto_1.randomUUID)(),
                version: [1, 0, 0],
            },
        };
    }
    process(_doc) {
        return undefined;
    }
    deleteFile(_uri) {
        return false;
    }
    deleteFolder(_uri) {
        return false;
    }
    find() {
        return undefined;
    }
    forEach() { }
}
/** A PackCollection that holds TestPack instances. */
class TestPackCollection extends pack_collection_1.PackCollection {
}
/**
 * Build a DataSetConnector that maps each TestPack to its `.data` DataSet.
 */
function makeConnector(collection) {
    return new data_set_connector_1.DataSetConnector(collection, (pack) => pack.data);
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
        const visited = [];
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
        const visited = [];
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
//# sourceMappingURL=data-set-connector.test.js.map