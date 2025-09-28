import { TestFilesFolder } from "../utillity";
import * as path from "path";
import { MCProject } from "../../src/main";

describe("MCProject", () => {
  it("loadSync p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");
    const project = MCProject.loadSync(folder);
    expect(project).toMatchSnapshot();
  });

  it("load file2", async () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    const project = await MCProject.load(folder);
    expect(project).toMatchSnapshot();
  });

  it("loadSync not existing", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");
    const project = MCProject.loadSync(folder);
    expect(project).toMatchSnapshot();
  });

  it("load not existing", async () => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");

    const project = await MCProject.load(folder);
    expect(project).toMatchSnapshot();
  });
});
