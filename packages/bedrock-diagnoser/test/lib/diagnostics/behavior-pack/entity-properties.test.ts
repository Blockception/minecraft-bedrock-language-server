import { diagnose_entity_property_usage } from '../../../../src/diagnostics/behavior-pack/entity/properties';
import { EntityProperty } from 'bc-minecraft-bedrock-project/src/project/behavior-pack/entity';
import { TestDiagnoser } from '../../../diagnoser';

describe('BehaviorPack', () => {
  describe('Entity properties', () => {
    describe('enum property usage', () => {
      const enumDefinition: EntityProperty = {
        name: 'test:prop',
        type: 'enum',
        default: 'val1',
        values: ['val1', 'val2'],
      };

      it('accepts a valid enum value', () => {
        const diagnoser = new TestDiagnoser();
        diagnose_entity_property_usage([enumDefinition], 'test:prop', 'val1', 'events', diagnoser);
        diagnoser.expectEmpty();
      });

      it('rejects a value not in the list', () => {
        const diagnoser = new TestDiagnoser();
        diagnose_entity_property_usage([enumDefinition], 'test:prop', 'val3', 'events', diagnoser);
        diagnoser.expectAny();
      });

      it('accepts a molang expression with query prefix', () => {
        const diagnoser = new TestDiagnoser();
        diagnose_entity_property_usage(
          [enumDefinition],
          'test:prop',
          "q.property('test:prop') == 'val1' ? 'val2' : 'val1'",
          'events',
          diagnoser,
        );
        diagnoser.expectEmpty();
      });

      it('accepts a molang expression with variable prefix', () => {
        const diagnoser = new TestDiagnoser();
        diagnose_entity_property_usage([enumDefinition], 'test:prop', 'v.some_variable', 'events', diagnoser);
        diagnoser.expectEmpty();
      });

      it('accepts a molang expression with math prefix', () => {
        const diagnoser = new TestDiagnoser();
        diagnose_entity_property_usage([enumDefinition], 'test:prop', 'math.random(0,1)', 'events', diagnoser);
        diagnoser.expectEmpty();
      });
    });
  });
});
