import { MCProject } from "../../src/main";
import { TestFilesFolder } from "../utillity";
import * as path from "path";

describe("MCProject", () => {
  it("is it1", () => {
    const project = MCProject.createEmpty();
    expect(project).toMatchSnapshot();
  });

  it("is p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    const project = MCProject.loadSync(folder);
    expect(project).toMatchSnapshot();
  });

  it("is async p1", async () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    const project = await MCProject.load(folder);
    expect(project).toMatchSnapshot();
  });
});
