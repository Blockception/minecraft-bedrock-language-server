import { MCProject } from "bc-minecraft-project";
import { ResourcePackCollection } from ".";
import { Manifest } from '../../internal/types';

describe("ResourcePackCollection", () => {
  it("sanity check", () => {
    const pc = new ResourcePackCollection();
    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);

    pc.add("c:\\project\\", MCProject.createEmpty(), {} as Manifest);

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(1);

    expect(pc.delete("c:\\project\\")).toBeTruthy();

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);
  });
});
