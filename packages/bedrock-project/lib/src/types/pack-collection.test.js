"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_project_1 = require("bc-minecraft-project");
const pack_type_1 = require("../../src/project/pack-type");
const _1 = require(".");
const crypto_1 = require("crypto");
const defaultFolder = "c:\\project\\bp";
const defaultContext = bc_minecraft_project_1.MCProject.createEmpty();
class TestPack {
    constructor(docFilter = undefined, folder = undefined, context = undefined, manifest = undefined) {
        this.type = pack_type_1.PackType.unknown;
        this.folder = folder !== null && folder !== void 0 ? folder : defaultFolder;
        this.context = context !== null && context !== void 0 ? context : defaultContext;
        this.docFilter = docFilter;
        this.manifest = manifest !== null && manifest !== void 0 ? manifest : {
            format_version: "1.0.0",
            header: {
                description: "description",
                name: "test pack",
                uuid: (0, crypto_1.randomUUID)(),
                version: [1, 0, 0],
            },
        };
        this.docs = [];
    }
    process(doc) {
        var _a, _b;
        if ((_b = (_a = this.docFilter) === null || _a === void 0 ? void 0 : _a.test(doc.uri)) !== null && _b !== void 0 ? _b : true)
            this.docs.push(doc);
        return undefined;
    }
    deleteFile(uri) {
        const old = this.docs.length;
        this.docs = this.docs.filter((d) => d.uri !== uri);
        return this.docs.length !== old;
    }
    deleteFolder(uri) {
        const old = this.docs.length;
        this.docs = this.docs.filter((d) => !d.uri.startsWith(uri));
        return this.docs.length !== old;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find() {
        const value = undefined;
        return value;
    }
    /**
     *
     * @param callbackfn
     * @returns
     */
    forEach() { }
}
class TestPackCollection extends _1.PackCollection {
    constructor() {
        super();
    }
}
(function (TestPackCollection) {
    /**
     *
     * @param docFilter
     * @param folder
     * @param context
     * @returns
     */
    function defaultCollection(docFilter = undefined, folder = undefined, context = undefined) {
        const pc = new TestPackCollection();
        pc.packs.push(new TestPack(docFilter, folder, context));
        return pc;
    }
    TestPackCollection.defaultCollection = defaultCollection;
})(TestPackCollection || (TestPackCollection = {}));
describe("PackCollectionTest", () => {
    it("sanity check", () => {
        const pc = new TestPackCollection();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
        pc.packs.push(new TestPack(undefined, "c:\\project\\"));
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(1);
        expect(pc.delete("c:\\project\\")).toBeTruthy();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
    });
    it("count", () => {
        const pc = new TestPackCollection();
        expect(pc.count()).toEqual(0);
        pc.packs.push(new TestPack(undefined, "c:\\project\\"));
        expect(pc.count()).toEqual(1);
    });
    it("delete1", () => {
        const pc = new TestPackCollection();
        pc.packs.push(new TestPack(undefined, "c:\\project\\"));
        expect(pc.count()).toEqual(1);
        pc.delete("c:\\project\\");
        expect(pc.count()).toEqual(0);
    });
    it("delete2", () => {
        const pc = new TestPackCollection();
        pc.packs.push(new TestPack(undefined, "c:\\project\\"));
        expect(pc.count()).toEqual(1);
        pc.deleteFolder("c:\\project\\");
        expect(pc.count()).toEqual(0);
    });
    it("process", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\loot\\example.json",
            getText: () => "",
        };
        expect(pack1.docs).toHaveLength(0);
        expect(pack2.docs).toHaveLength(0);
        pc.process(doc);
        expect(pack1.docs).toHaveLength(0);
        expect(pack2.docs).toHaveLength(1);
    });
    it("get", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\bp\\loot\\example.json",
            getText: () => "",
        };
        expect(doc.uri.startsWith(pack2.folder)).toBeTruthy();
        const p = pc.get(doc);
        if (!p) {
            throw new Error("returned no pack");
        }
        else {
            expect(p.folder).toEqual(pack2.folder);
        }
    });
    it("get2", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\loot\\example.json",
            getText: () => "",
        };
        expect(doc.uri.startsWith(pack2.folder)).toBeTruthy();
        let p = undefined;
        const packs = pc.packs;
        for (let I = 0; I < packs.length; I++) {
            if (doc.uri.startsWith(pc.packs[I].folder)) {
                p = pc.packs[I];
                break;
            }
        }
        if (!p) {
            throw new Error("returned no pack");
        }
        else {
            expect(p.folder).toEqual(pack2.folder);
        }
    });
    it("deleteFile", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\loot\\example.json",
            getText: () => "",
        };
        pc.process(doc);
        expect(pack2.docs).toHaveLength(1);
        expect(pack1.docs).toHaveLength(0);
        expect(pc.deleteFile(doc.uri)).toBeTruthy();
        expect(pack2.docs).toHaveLength(0);
        expect(pack1.docs).toHaveLength(0);
    });
    it("deleteFolder", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\loot\\example.json",
            getText: () => "",
        };
        pc.process(doc);
        expect(pack2.docs).toHaveLength(1);
        expect(pack1.docs).toHaveLength(0);
        expect(pc.deleteFolder("c:\\project2\\loot")).toBeTruthy();
        expect(pack2.docs).toHaveLength(0);
        expect(pack1.docs).toHaveLength(0);
    });
    it("deleteFolder", () => {
        const pc = new TestPackCollection();
        const pack1 = new TestPack(undefined, "c:\\project\\");
        const pack2 = new TestPack(undefined, "c:\\project2\\");
        pc.packs.push(pack1, pack2);
        const doc = {
            uri: "c:\\project2\\loot\\example.json",
            getText: () => "",
        };
        pc.process(doc);
        expect(pack2.docs).toHaveLength(1);
        expect(pack1.docs).toHaveLength(0);
        expect(pc.count()).toEqual(2);
        expect(pc.deleteFolder("c:\\project2\\")).toBeTruthy();
        expect(pack2.docs).toHaveLength(1);
        expect(pack1.docs).toHaveLength(0);
        expect(pc.count()).toEqual(1);
    });
});
//# sourceMappingURL=pack-collection.test.js.map