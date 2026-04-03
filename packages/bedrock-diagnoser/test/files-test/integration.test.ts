import { MinecraftData, ProjectData, TextDocument } from 'bc-minecraft-bedrock-project';
import { MCIgnore, MCProject } from 'bc-minecraft-project';
import { Diagnoser, DiagnoserContext, ManagedDiagnosticsBuilder } from '../../src';
import { TestDocumentDiagnoser } from '../diagnoser';

// ---------------------------------------------------------------------------
// Workspace layout
// ---------------------------------------------------------------------------
const BP_FOLDER = 'workspace/behavior_pack';
const RP_FOLDER = 'workspace/resource_pack';

const BP_MANIFEST_URI = `${BP_FOLDER}/manifest.json`;
const RP_MANIFEST_URI = `${RP_FOLDER}/manifest.json`;
const BP_ENTITY_URI = `${BP_FOLDER}/entities/cross_pack_entity.json`;
const RP_ENTITY_URI = `${RP_FOLDER}/entity/cross_pack_entity.json`;

const ENTITY_ID = 'test:cross_pack_entity';

// ---------------------------------------------------------------------------
// In-memory file contents
// ---------------------------------------------------------------------------
const BP_MANIFEST_CONTENT = JSON.stringify({
  format_version: 2,
  header: {
    description: 'Integration test BP',
    name: 'Integration Test BP',
    uuid: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    version: [1, 0, 0],
    min_engine_version: [1, 21, 0],
  },
  modules: [
    {
      description: 'data module',
      type: 'data',
      uuid: 'aaaaaaaa-bbbb-cccc-dddd-ffffffffffff',
      version: [1, 0, 0],
    },
  ],
});

const RP_MANIFEST_CONTENT = JSON.stringify({
  format_version: 2,
  header: {
    description: 'Integration test RP',
    name: 'Integration Test RP',
    uuid: '11111111-2222-3333-4444-555555555555',
    version: [1, 0, 0],
    min_engine_version: [1, 21, 0],
  },
  modules: [
    {
      description: 'resources module',
      type: 'resources',
      uuid: '11111111-2222-3333-4444-666666666666',
      version: [1, 0, 0],
    },
  ],
});

const BP_ENTITY_CONTENT = JSON.stringify({
  format_version: '1.21.0',
  'minecraft:entity': {
    description: {
      identifier: ENTITY_ID,
      is_spawnable: true,
      is_summonable: true,
    },
    components: {},
  },
});

/**
 * Minimal RP client entity that references the BP entity by identifier.
 * No geometry / textures defined so the only cross-pack check is the
 * behaviour-pack entity look-up done by behaviorpack_entityid_diagnose.
 */
const RP_ENTITY_CONTENT = JSON.stringify({
  format_version: '1.21.0',
  'minecraft:client_entity': {
    description: {
      identifier: ENTITY_ID,
    },
  },
});

// ---------------------------------------------------------------------------
// In-memory DiagnoserContext implementation
// ---------------------------------------------------------------------------
class InMemoryContext implements DiagnoserContext<TextDocument> {
  private readonly _data: MinecraftData;
  public readonly diagnosers: TestDocumentDiagnoser[] = [];

  constructor(private readonly files: Map<string, string>) {
    this._data = new MinecraftData(new ProjectData(this));
  }

  getDocument(uri: string): TextDocument | undefined {
    const content = this.files.get(uri);
    if (content === undefined) return undefined;
    return { uri, getText: () => content };
  }

  getFiles(_folder: string, _patterns: string[], _ignores: MCIgnore): string[] {
    // All documents are held in memory; file-system discovery is not needed
    // for these integration tests. Diagnoser.process() is called directly
    // with explicit URIs, so returning an empty list here is intentional.
    return [];
  }

  getProjectData(): MinecraftData {
    return this._data;
  }

  getDiagnoser(doc: TextDocument, project: MCProject): ManagedDiagnosticsBuilder<TextDocument> | undefined {
    const d = new TestDocumentDiagnoser(doc, this, project);
    this.diagnosers.push(d);
    return d;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function buildWorkspace(files: Map<string, string> = buildFileMap()) {
  const mcproject = MCProject.createEmpty();
  const context = new InMemoryContext(files);
  const projectData = context.getProjectData().projectData;
  const diagnoser = new Diagnoser(context);

  // Register packs
  projectData.addPack(BP_MANIFEST_URI, mcproject);
  projectData.addPack(RP_MANIFEST_URI, mcproject);

  // Process every file so entity data is populated
  for (const uri of files.keys()) {
    const doc = context.getDocument(uri);
    if (doc) projectData.process(doc);
  }

  return { context, projectData, diagnoser };
}

function buildFileMap(): Map<string, string> {
  return new Map<string, string>([
    [BP_MANIFEST_URI, BP_MANIFEST_CONTENT],
    [BP_ENTITY_URI, BP_ENTITY_CONTENT],
    [RP_MANIFEST_URI, RP_MANIFEST_CONTENT],
    [RP_ENTITY_URI, RP_ENTITY_CONTENT],
  ]);
}

// ---------------------------------------------------------------------------
// Integration tests
// ---------------------------------------------------------------------------
describe('Integration – multi-pack workspace diagnostic pipeline', () => {
  describe('pack registration', () => {
    it('registers exactly one behavior pack', () => {
      const { projectData } = buildWorkspace();
      expect(projectData.behaviorPacks.count()).toBe(1);
    });

    it('registers exactly one resource pack', () => {
      const { projectData } = buildWorkspace();
      expect(projectData.resourcePacks.count()).toBe(1);
    });
  });

  describe('no internal exceptions', () => {
    it('no debugger.internal.exception diagnostic for any file', () => {
      const { context, diagnoser } = buildWorkspace();

      for (const uri of buildFileMap().keys()) {
        diagnoser.process(uri);
      }

      const internalErrors = context.diagnosers.flatMap((d) =>
        d.items.filter((item) => item.code === 'debugger.internal.exception'),
      );
      expect(internalErrors).toHaveLength(0);
    });
  });

  describe('cross-pack entity reference resolution', () => {
    it('BP entity is registered in project data after processing', () => {
      const { projectData } = buildWorkspace();
      expect(projectData.behaviorPacks.entities.has(ENTITY_ID)).toBe(true);
    });

    it('RP entity file emits no behaviorpack.entities.missing error when BP entity exists', () => {
      const { context, diagnoser } = buildWorkspace();

      diagnoser.process(RP_ENTITY_URI);

      const rpDiag = context.diagnosers.find((d) => d.document.uri === RP_ENTITY_URI);
      expect(rpDiag).toBeDefined();
      const missingErrors = rpDiag!.items.filter((i) => i.code === 'behaviorpack.entities.missing');
      expect(missingErrors).toHaveLength(0);
    });
  });

  describe('file deletion lifecycle', () => {
    it('deleting the BP entity file removes it from project data', () => {
      const { projectData } = buildWorkspace();

      expect(projectData.behaviorPacks.entities.has(ENTITY_ID)).toBe(true);
      const deleted = projectData.deleteFile(BP_ENTITY_URI);
      expect(deleted).toBe(true);
      expect(projectData.behaviorPacks.entities.has(ENTITY_ID)).toBe(false);
    });

    it('after BP entity deletion, re-diagnosing the RP entity reports a missing reference', () => {
      const { context, projectData, diagnoser } = buildWorkspace();

      // First pass: BP entity exists – no missing-entity error expected
      diagnoser.process(RP_ENTITY_URI);
      const firstDiag = context.diagnosers.find((d) => d.document.uri === RP_ENTITY_URI);
      expect(firstDiag).toBeDefined();
      expect(firstDiag!.items.filter((i) => i.code === 'behaviorpack.entities.missing')).toHaveLength(0);

      // Remove the BP entity from project data
      projectData.deleteFile(BP_ENTITY_URI);

      // Second pass: BP entity gone – missing-entity error expected
      diagnoser.process(RP_ENTITY_URI);
      const allRpDiags = context.diagnosers.filter((d) => d.document.uri === RP_ENTITY_URI);
      expect(allRpDiags).toHaveLength(2);
      const secondDiag = allRpDiags[1];
      expect(secondDiag.items.filter((i) => i.code === 'behaviorpack.entities.missing')).toHaveLength(1);
    });
  });
});
