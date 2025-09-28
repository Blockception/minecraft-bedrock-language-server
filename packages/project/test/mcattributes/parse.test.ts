import { MCAttributes } from "../../src/main";
import { TestFilesFolder } from "../utillity";
import * as path from "path";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

describe("MCAttributes", () => {
  describe("parse1", () => {
    const parse = MCAttributes.parse(Text1);
    expect(parse).toMatchSnapshot();
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcattributes", "file1.mcattributes");

    const attributes = MCAttributes.loadSync(filepath);
    expect(attributes).toMatchSnapshot();
  });

  it("load file2", async () => {
    const filepath = path.join(TestFilesFolder, "mcattributes", "file2.mcattributes");

    const attributes = await MCAttributes.load(filepath);
    expect(attributes).toMatchSnapshot();
  });
});
