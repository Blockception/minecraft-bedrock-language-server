import { Internal } from 'bc-minecraft-bedrock-project';
import { TestDiagnoser } from '../../../diagnoser';
import { behaviorpack_diagnose_block_components } from '../../../../src/diagnostics/behavior-pack/block/components/diagnose';
import { Context } from '../../../../src/utility/components';

const FORMAT_VERSION_1_21_80 = '1.21.80';
const FORMAT_VERSION_1_20_0 = '1.20.0';

function makeBlock(formatVersion: string): Internal.BehaviorPack.Block {
  return {
    format_version: formatVersion,
    'minecraft:block': {
      description: { identifier: 'test:block' },
      components: {},
    },
  };
}

function makeContext(
  block: Internal.BehaviorPack.Block,
  components: string[],
  isPermutation?: boolean,
): Context<Internal.BehaviorPack.Block> {
  return { source: block, components, isPermutation };
}

describe('BehaviorPack', () => {
  describe('Block', () => {
    describe('minecraft:geometry / minecraft:material_instances pairing', () => {
      it('errors when geometry is at top-level without material_instances (>= 1.21.80)', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_21_80);
        const context = makeContext(block, ['minecraft:geometry']);

        behaviorpack_diagnose_block_components(
          { components: { 'minecraft:geometry': 'geometry.example' } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(true);
      });

      it('errors when material_instances is at top-level without geometry (>= 1.21.80)', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_21_80);
        const context = makeContext(block, ['minecraft:material_instances']);

        behaviorpack_diagnose_block_components(
          { components: { 'minecraft:material_instances': { '*': { texture: 'test' } } } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(true);
      });

      it('does not error when geometry is in a permutation without material_instances (>= 1.21.80)', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_21_80);
        const context = makeContext(block, ['minecraft:geometry'], true);

        behaviorpack_diagnose_block_components(
          { components: { 'minecraft:geometry': 'geometry.example' } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(false);
      });

      it('does not error when material_instances is in a permutation without geometry (>= 1.21.80)', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_21_80);
        const context = makeContext(block, ['minecraft:material_instances'], true);

        behaviorpack_diagnose_block_components(
          { components: { 'minecraft:material_instances': { '*': { texture: 'test' } } } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(false);
      });

      it('does not error when both geometry and material_instances are present at top-level (>= 1.21.80)', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_21_80);
        const context = makeContext(block, ['minecraft:geometry', 'minecraft:material_instances']);

        behaviorpack_diagnose_block_components(
          {
            components: {
              'minecraft:geometry': 'geometry.example',
              'minecraft:material_instances': { '*': { texture: 'test' } },
            },
          },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(false);
      });

      it('does not error when geometry is used without material_instances in format versions < 1.21.80', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_20_0);
        const context = makeContext(block, ['minecraft:geometry']);

        behaviorpack_diagnose_block_components(
          { components: { 'minecraft:geometry': 'geometry.example' } },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.material_instances_x_geometry')).toBe(false);
      });
    });

    describe('minecraft:material_instances shorthand reference syntax', () => {
      it('does not throw when a material instance value is a string reference to another instance', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_20_0);
        const context = makeContext(block, ['minecraft:geometry', 'minecraft:material_instances']);

        expect(() => {
          behaviorpack_diagnose_block_components(
            {
              components: {
                'minecraft:material_instances': {
                  '*': { texture: 'conduit_pillar', render_method: 'opaque' },
                  myinstance: { texture: 'conduit_pillar_top', render_method: 'opaque' },
                  up: 'myinstance',
                  down: 'myinstance',
                },
              },
            },
            context,
            diagnoser,
          );
        }).not.toThrow();
      });

      it('does not report texture errors for string shorthand references', () => {
        const diagnoser = TestDiagnoser.create();
        const block = makeBlock(FORMAT_VERSION_1_20_0);
        const context = makeContext(block, ['minecraft:geometry', 'minecraft:material_instances']);

        behaviorpack_diagnose_block_components(
          {
            components: {
              'minecraft:material_instances': {
                '*': { texture: 'acacia_log_side', render_method: 'opaque' },
                myinstance: { texture: 'acacia_log_top', render_method: 'opaque' },
                up: 'myinstance',
                down: 'myinstance',
              },
            },
          },
          context,
          diagnoser,
        );

        expect(diagnoser.hasCode('behaviorpack.block.components.texture_not_found')).toBe(false);
      });
    });
  });
});
