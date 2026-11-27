import { MCIgnore, MCProject } from '../../src';
import { TestFilesFolder } from '../utillity';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('MCProject save', () => {
  const tempFolders: string[] = [];

  function createTempFolder(): string {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'mcproject-save-test-'));
    tempFolders.push(folder);
    return folder;
  }

  afterAll(() => {
    tempFolders.forEach((folder) => fs.rmSync(folder, { recursive: true, force: true }));
  });

  it('does not persist the default ignore patterns into .mcignore', () => {
    const sourceFolder = path.join(TestFilesFolder, 'mcproject', 'p1');
    const targetFolder = createTempFolder();

    const project = MCProject.loadSync(sourceFolder);
    expect(project.ignores.patterns).toEqual(expect.arrayContaining(MCIgnore.defaultPatterns as string[]));

    MCProject.saveSync(targetFolder, project);

    const savedIgnores = MCIgnore.loadSync(path.join(targetFolder, MCIgnore.filename));
    MCIgnore.defaultPatterns.forEach((pattern) => expect(savedIgnores.patterns).not.toContain(pattern));
  });

  it('round-tripping load/save repeatedly does not duplicate the default patterns', () => {
    const sourceFolder = path.join(TestFilesFolder, 'mcproject', 'p1');
    const targetFolder = createTempFolder();

    let project = MCProject.loadSync(sourceFolder);
    MCProject.saveSync(targetFolder, project);

    for (let i = 0; i < 3; i++) {
      project = MCProject.loadSync(targetFolder);
      MCProject.saveSync(targetFolder, project);
    }

    const savedIgnores = MCIgnore.loadSync(path.join(targetFolder, MCIgnore.filename));
    MCIgnore.defaultPatterns.forEach((pattern) =>
      expect(savedIgnores.patterns.filter((p) => p === pattern)).toHaveLength(0),
    );
  });
});
