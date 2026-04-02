import * as path from 'path';
import { MinecraftData, ProjectData, TextDocument } from 'bc-minecraft-bedrock-project';
import { Manifest } from 'bc-minecraft-bedrock-project/src/internal/types';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { Diagnoser, DiagnoserContext, ManagedDiagnosticsBuilder } from '../../../src/types';

/** Build a minimal DiagnoserContext for pack-cache tests */
function makeContext(options: { files: string[]; projectData: ProjectData }): DiagnoserContext {
  const minecraftData = new MinecraftData(options.projectData);
  return {
    getDocument: (uri: string): TextDocument | undefined => ({ uri, getText: () => '' } as TextDocument),
    getFiles: (_folder, _patterns, _ignores): string[] => options.files,
    getProjectData: () => minecraftData,
    getDiagnoser: (_doc, _project): ManagedDiagnosticsBuilder | undefined => undefined,
  };
}

describe('Diagnoser', () => {
  it('extname', () => {
    const filepath = 'file:///c:/temp/test.mcfunction';

    const ext = path.extname(filepath);
    expect(ext).toEqual('.mcfunction');
  });

  describe('processFolder pack-cache', () => {
    let projectData: ProjectData;

    beforeEach(() => {
      // projectData that cannot resolve documents itself (documents not needed for these tests)
      projectData = new ProjectData({ getDocument: () => undefined, getFiles: () => [] });
      projectData.behaviorPacks.add('behavior_pack', MCProject.createEmpty(), {} as Manifest);
    });

    it('calls projectData.get() only once per unique URI during a single processFolder pass', () => {
      const fileUri = 'behavior_pack/texts/en_US.lang';
      // Return the same URI twice so the cache must deduplicate
      const context = makeContext({ files: [fileUri, fileUri], projectData });
      const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');

      const diagnoser = new Diagnoser(context);
      diagnoser.processFolder('behavior_pack', MCProject.createEmpty().ignores);

      expect(getSpy).toHaveBeenCalledTimes(1);
    });

    it('clears the cache after processFolder completes (second pass re-queries)', () => {
      const fileUri = 'behavior_pack/texts/en_US.lang';
      const context = makeContext({ files: [fileUri], projectData });
      const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');

      const diagnoser = new Diagnoser(context);
      diagnoser.processFolder('behavior_pack', MCProject.createEmpty().ignores);
      diagnoser.processFolder('behavior_pack', MCProject.createEmpty().ignores);

      // One call per pass, two passes → two calls total
      expect(getSpy).toHaveBeenCalledTimes(2);
    });

    it('does not cache results between standalone process() calls', () => {
      const fileUri = 'behavior_pack/texts/en_US.lang';
      const context = makeContext({ files: [fileUri], projectData });
      const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');

      const diagnoser = new Diagnoser(context);
      diagnoser.process(fileUri);
      diagnoser.process(fileUri);

      // No processFolder → no cache → two separate calls
      expect(getSpy).toHaveBeenCalledTimes(2);
    });
  });
});