import { Internal } from 'bc-minecraft-bedrock-project';
import { TestDiagnoser } from '../../../diagnoser';
import { behaviorpack_diagnose_item_components } from '../../../../src/diagnostics/behavior-pack/item/components/diagnose';
import { Context } from '../../../../src/utility/components';

const FORMAT_VERSION_1_26_0 = '1.26.0';
const FORMAT_VERSION_1_25_0 = '1.25.0';

function makeItem(formatVersion: string): Internal.BehaviorPack.Item {
  return {
    format_version: formatVersion,
    'minecraft:item': {
      description: { identifier: 'test:item' },
      components: {},
    },
  };
}

function makeContext(item: Internal.BehaviorPack.Item): Context<Internal.BehaviorPack.Item> {
  return { source: item, components: [], isPermutation: false };
}

describe('BehaviorPack', () => {
  describe('Item', () => {
    describe('minecraft:block_placer / aligned_placement version check', () => {
      it('errors when aligned_placement is used with format version < 1.26.0', () => {
        const diagnoser = TestDiagnoser.create();
        const item = makeItem(FORMAT_VERSION_1_25_0);
        const context = makeContext(item);

        behaviorpack_diagnose_item_components(
          { components: { 'minecraft:block_placer': { aligned_placement: true } } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.item.components.block_placer.aligned_placement_min_version')).toBe(true);
      });

      it('does not error when aligned_placement is used with format version >= 1.26.0', () => {
        const diagnoser = TestDiagnoser.create();
        const item = makeItem(FORMAT_VERSION_1_26_0);
        const context = makeContext(item);

        behaviorpack_diagnose_item_components(
          { components: { 'minecraft:block_placer': { aligned_placement: true } } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.item.components.block_placer.aligned_placement_min_version')).toBe(false);
      });

      it('does not error when aligned_placement is absent', () => {
        const diagnoser = TestDiagnoser.create();
        const item = makeItem(FORMAT_VERSION_1_25_0);
        const context = makeContext(item);

        behaviorpack_diagnose_item_components(
          { components: { 'minecraft:block_placer': {} } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.item.components.block_placer.aligned_placement_min_version')).toBe(false);
      });

      it('does not error when aligned_placement is false', () => {
        const diagnoser = TestDiagnoser.create();
        const item = makeItem(FORMAT_VERSION_1_25_0);
        const context = makeContext(item);

        behaviorpack_diagnose_item_components(
          { components: { 'minecraft:block_placer': { aligned_placement: false } } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.item.components.block_placer.aligned_placement_min_version')).toBe(false);
      });
    });
  });
});
