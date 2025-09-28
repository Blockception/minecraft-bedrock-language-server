import { TestFilesFolder } from "../utillity";
import * as path from "path";
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied`;

describe("MCDefinition", () => {
  it("parse1", () => {
    const definitions = MCDefinition.parse(Text1);
    expect(definitions).toMatchSnapshot();
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");
    const definitions = MCDefinition.loadSync(filepath);
    expect(definitions).toMatchSnapshot();
  });

  it("load file2", async () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    const definitions = await MCDefinition.load(filepath);
    expect(definitions).toMatchSnapshot();
  });
});
