import { Types } from "bc-minecraft-bedrock-types";
import { MCProject } from "bc-minecraft-project";
import { PackType } from "../../src/project/pack-type";
import { PackCollection } from ".";
import { Pack } from "./pack";
import { TextDocument } from "../../src/types";
import { Manifest } from "../internal/types";
import { randomUUID } from "crypto";

const defaultFolder = "c:\\project\\bp";
const defaultContext = MCProject.createEmpty();

class TestPack implements Pack {
  type: PackType = PackType.unknown;
  folder: string;
  context: MCProject;
  docs: TextDocument[];
  docFilter: RegExp | undefined;
  manifest: Manifest;

  constructor(
    docFilter: RegExp | undefined = undefined,
    folder: string | undefined = undefined,
    context: MCProject | undefined = undefined,
    manifest: Manifest | undefined = undefined
  ) {
    this.folder = folder ?? defaultFolder;
    this.context = context ?? defaultContext;
    this.docFilter = docFilter;
    this.manifest = manifest ?? {
      format_version: "1.0.0",
      header: {
        description: "description",
        name: "test pack",
        uuid: randomUUID(),
        version: [1, 0, 0],
      },
    };
    this.docs = [];
  }

  process(doc: TextDocument) {
    if (this.docFilter?.test(doc.uri) ?? true) this.docs.push(doc);

    return undefined;
  }

  deleteFile(uri: string): boolean {
    const old = this.docs.length;
    this.docs = this.docs.filter((d) => d.uri !== uri);

    return this.docs.length !== old;
  }

  deleteFolder(uri: string): boolean {
    const old = this.docs.length;
    this.docs = this.docs.filter((d) => !d.uri.startsWith(uri));

    return this.docs.length !== old;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(): Types.BaseObject | undefined {
    const value = undefined;

    return value;
  }

  /**
   *
   * @param callbackfn
   * @returns
   */
  forEach(): void {}
}

class TestPackCollection extends PackCollection<TestPack> {
  constructor() {
    super();
  }
}

namespace TestPackCollection {
  /**
   *
   * @param docFilter
   * @param folder
   * @param context
   * @returns
   */
  export function defaultCollection(
    docFilter: RegExp | undefined = undefined,
    folder: string | undefined = undefined,
    context: MCProject | undefined = undefined
  ): TestPackCollection {
    const pc = new TestPackCollection();
    pc.packs.push(new TestPack(docFilter, folder, context));

    return pc;
  }
}

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

    const doc: TextDocument = {
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

    const doc: TextDocument = {
      uri: "c:\\project2\\bp\\loot\\example.json",
      getText: () => "",
    };

    expect(doc.uri.startsWith(pack2.folder)).toBeTruthy();

    const p = pc.get(doc);

    if (!p) {
      throw new Error("returned no pack");
    } else {
      expect(p.folder).toEqual(pack2.folder);
    }
  });

  it("get2", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = {
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
    } else {
      expect(p.folder).toEqual(pack2.folder);
    }
  });

  it("deleteFile", () => {
    const pc = new TestPackCollection();

    const pack1 = new TestPack(undefined, "c:\\project\\");
    const pack2 = new TestPack(undefined, "c:\\project2\\");
    pc.packs.push(pack1, pack2);

    const doc: TextDocument = {
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

    const doc: TextDocument = {
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

    const doc: TextDocument = {
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
