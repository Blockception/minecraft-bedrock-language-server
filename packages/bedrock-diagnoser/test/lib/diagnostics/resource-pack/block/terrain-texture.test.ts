import { TextDocument } from 'bc-minecraft-bedrock-project/src/types';
import path from 'path';
import { diagnose_block_document } from '../../../../../src/diagnostics/resource-pack/block/document';
import { TestDiagnoser } from '../../../../diagnoser';

describe('ResourcePack', () => {
  describe('Block', () => {
    describe('terrain_texture.json', () => {
      it('does not flag vanilla terrain textures as undefined', () => {
        const doc: TextDocument = {
          uri: path.join('resource_pack', 'blocks.json'),
          getText: () =>
            JSON.stringify({
              'minecraft:cartography_table': { textures: { up: 'cartography_table_top' } },
            }),
        };

        const diagnoser = TestDiagnoser.createDocument(undefined, doc);

        diagnose_block_document(diagnoser);

        expect(diagnoser.items.some((item) => item.code === 'resourcepack.texture.undefined')).toBe(false);
      });

      it('does not flag custom textures defined in the project terrain_texture.json', () => {
        const terrainDoc: TextDocument = {
          uri: path.join('resource_pack', 'textures', 'terrain_texture.json'),
          getText: () =>
            JSON.stringify({
              resource_pack_name: 'pack',
              texture_name: 'atlas.terrain',
              texture_data: {
                wool_top: { textures: 'textures/blocks/wool_colored_top' },
              },
            }),
        };

        const blocksDoc: TextDocument = {
          uri: path.join('resource_pack', 'blocks.json'),
          getText: () =>
            JSON.stringify({
              wool: { textures: { up: 'wool_top' } },
            }),
        };

        const diagnoser = TestDiagnoser.createDocument(undefined, blocksDoc);
        diagnoser.context.getProjectData().projectData.resourcePacks.process(terrainDoc);

        diagnose_block_document(diagnoser);

        expect(diagnoser.items.some((item) => item.code === 'resourcepack.texture.undefined')).toBe(false);
      });

      it('still flags a texture that is not defined anywhere', () => {
        const doc: TextDocument = {
          uri: path.join('resource_pack', 'blocks.json'),
          getText: () =>
            JSON.stringify({
              custom_block: { textures: { up: 'this_texture_does_not_exist' } },
            }),
        };

        const diagnoser = TestDiagnoser.createDocument(undefined, doc);

        diagnose_block_document(diagnoser);

        const item = diagnoser.items.find((item) => item.code === 'resourcepack.texture.undefined');
        expect(item).toBeDefined();
        expect(item?.message).toEqual('The texture is not defined in the terrain_texture.json');
      });
    });
  });
});
