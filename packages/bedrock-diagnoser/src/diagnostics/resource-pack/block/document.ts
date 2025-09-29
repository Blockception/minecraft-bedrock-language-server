import { ResourcePack } from 'bc-minecraft-bedrock-project';
import { DiagnosticsBuilder, DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { is_block_defined } from '../../behavior-pack/block';
import { Json } from '../../json/json';
import { diagnose_molang_syntax_current_document } from '../../molang';

/**Diagnoses the given document as a block.json
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_block_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const blocks = Json.LoadReport<Blocks>(diagnoser);
  if (!Json.TypeCheck(blocks, diagnoser, 'blocks.json', 'resourcepack.blocks.invalid', is)) return;
  diagnose_molang_syntax_current_document(diagnoser, blocks);

  const keys = Object.keys(blocks);
  const rp = diagnoser.context.getProjectData().projectData.resourcePacks;

  for (let I = 0; I < keys.length; I++) {
    const key = keys[I];
    if (key === 'format_version') continue;

    const block = blocks[keys[I]];

    if (typeof block === 'object') {
      const texture = block.textures;

      if (!texture) return;

      if (typeof texture === 'string') {
        hasDefinition(key, texture, rp, diagnoser);
      } else if (texture) {
        if (texture.down) hasDefinition(key, texture.down, rp, diagnoser);
        if (texture.up) hasDefinition(key, texture.up, rp, diagnoser);
        if (texture.side) hasDefinition(key, texture.side, rp, diagnoser);

        if (texture.north) hasDefinition(key, texture.north, rp, diagnoser);
        if (texture.south) hasDefinition(key, texture.south, rp, diagnoser);
        if (texture.west) hasDefinition(key, texture.west, rp, diagnoser);
        if (texture.east) hasDefinition(key, texture.east, rp, diagnoser);
      }

      is_block_defined(key, diagnoser);

      const blockFile = diagnoser.context.getProjectData().projectData.behaviorPacks.blocks.get(key)?.location.uri;
      if (!blockFile) return;

      if (diagnoser.context.getDocument(blockFile)?.getText().includes('minecraft:material_instances'))
        diagnoser.add(
          `${key}`,
          'Only one "blocks.json" or "minecraft:material_instances" may be used',
          DiagnosticSeverity.error,
          'behaviorpack.block.components.material_instance_clash',
        );
    }
  }
}

function hasDefinition(
  block: string,
  value: string,
  rp: ResourcePack.ResourcePackCollection,
  diagnoser: DiagnosticsBuilder,
): void {
  if (rp.terrainTextures.has(value)) return;

  diagnoser.add(
    `${block}/${value}`,
    'The texture is not defined in the terrain_texture.json',
    DiagnosticSeverity.error,
    'resourcepack.texture.undefined',
  );
}

interface Blocks {
  [block_id: string]: {
    sound?: string;
    textures:
      | string
      | {
          down?: string;
          up?: string;
          side?: string;
          east?: string;
          north?: string;
          south?: string;
          west?: string;
        };
  };
}

function is(value: any): value is Blocks {
  if (typeof value === 'object') {
    return true;
  }

  return false;
}
