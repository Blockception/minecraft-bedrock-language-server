import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { IExtendedLogger } from '../logger/logger';
import { IDocumentManager } from '../documents/manager';
import { TextDocument } from '../documents/text-document';
import { InternalContext } from './context';

/**
 * Regression coverage for https://github.com/Blockception/minecraft-bedrock-language-server/issues/22:
 * a project should be able to turn off diagnostics (Molang included) for a templating file extension
 * such as `.templ`/`.modl`, either by path pattern (`.mcignore`) or by extension (`.mcattributes`).
 */
describe('InternalContext.getDiagnoser', () => {
  function createLogger(): IExtendedLogger {
    return {
      info: () => {},
      debug: () => {},
      warn: () => {},
      error: () => {},
      recordError: () => {},
      withPrefix: () => createLogger(),
    } as any;
  }

  function createDocuments(): IDocumentManager {
    return {
      get: () => undefined,
      forEach: () => {},
      onDidChangeContent: () => ({ dispose: () => {} }),
      onDidClose: () => ({ dispose: () => {} }),
      onDidOpen: () => ({ dispose: () => {} }),
      onDidSave: () => ({ dispose: () => {} }),
    } as any;
  }

  function createDocument(uri: string): TextDocument {
    return { uri, getText: () => '' } as any;
  }

  function createContext(): InternalContext {
    return new InternalContext(createLogger(), createDocuments(), () => ({} as any));
  }

  it('returns a diagnoser when nothing is disabled', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    const doc = createDocument('file:///workspace/behavior_pack/entities/foo.templ');

    expect(context.getDiagnoser(doc, project)).toBeDefined();
  });

  it('skips documents matching an .mcignore pattern', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.ignores.patterns.push('*.templ');
    const doc = createDocument('file:///workspace/behavior_pack/entities/foo.templ');

    expect(context.getDiagnoser(doc, project)).toBeUndefined();
  });

  it('skips documents when diagnostic.<ext>=false is set for a non-standard extension', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.attributes['diagnostic.templ'] = 'false';
    const doc = createDocument('file:///workspace/behavior_pack/entities/foo.templ');

    expect(context.getDiagnoser(doc, project)).toBeUndefined();
  });

  it('does not affect other extensions when diagnostic.<ext>=false is set', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.attributes['diagnostic.templ'] = 'false';
    const doc = createDocument('file:///workspace/behavior_pack/entities/foo.json');

    expect(context.getDiagnoser(doc, project)).toBeDefined();
  });

  /**
   * Regression coverage: the 80 character path-length check (`format_diagnose_path`) was
   * flagging files that live inside vendored/VCS folders such as `node_modules` and `.git`,
   * which a project never authors itself. These folders should be ignored by default,
   * without requiring the user to add them to their own `.mcignore`.
   */
  it('skips files inside node_modules by default', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.ignores = MCIgnore.createDefault();
    const doc = createDocument(
      'file:///workspace/behavior_pack/scripts/node_modules/@minecraft/server/package.json',
    );

    expect(context.getDiagnoser(doc, project)).toBeUndefined();
  });

  it('skips files inside .git by default', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.ignores = MCIgnore.createDefault();
    const doc = createDocument('file:///workspace/.git/config');

    expect(context.getDiagnoser(doc, project)).toBeUndefined();
  });

  it('still diagnoses normal pack files when default ignores are present', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.ignores = MCIgnore.createDefault();
    const doc = createDocument('file:///workspace/behavior_pack/entities/foo.json');

    expect(context.getDiagnoser(doc, project)).toBeDefined();
  });

  it('does not treat .github as a match for the .git default pattern', () => {
    const context = createContext();
    const project = MCProject.createEmpty();
    project.ignores = MCIgnore.createDefault();
    const doc = createDocument('file:///workspace/.github/workflows/build.json');

    expect(context.getDiagnoser(doc, project)).toBeDefined();
  });
});
