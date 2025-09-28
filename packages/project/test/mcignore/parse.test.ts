import { TestFilesFolder } from "../utillity";
import { MCIgnore } from "../../src/main";
import * as path from "path";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

describe("MCIgnore", () => {
  it("parse1", () => {
    const ignores = MCIgnore.parse(Text1);
    expect(ignores).toMatchSnapshot();
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file1.mcignore");

    const ignores = MCIgnore.loadSync(filepath);
    expect(ignores).toMatchSnapshot();
  });

  it("load file2", async () => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file2.mcignore");

    const ignores = await MCIgnore.load(filepath);
    expect(ignores).toMatchSnapshot();
  });
});
