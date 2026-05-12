"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const properties_1 = require("../../../../src/diagnostics/behavior-pack/entity/properties");
const diagnoser_1 = require("../../../diagnoser");
describe('BehaviorPack', () => {
    describe('Entity properties', () => {
        describe('enum property usage', () => {
            const enumDefinition = {
                name: 'test:prop',
                type: 'enum',
                default: 'val1',
                values: ['val1', 'val2'],
            };
            it('accepts a valid enum value', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', 'val1', 'events', diagnoser);
                diagnoser.expectEmpty();
            });
            it('rejects a value not in the list', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', 'val3', 'events', diagnoser);
                diagnoser.expectAny();
            });
            it('accepts a molang expression with query prefix', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', "q.property('test:prop') == 'val1' ? 'val2' : 'val1'", 'events', diagnoser);
                diagnoser.expectEmpty();
            });
            it('accepts a molang expression with variable prefix', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', 'v.some_variable', 'events', diagnoser);
                diagnoser.expectEmpty();
            });
            it('accepts a molang expression with math prefix', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', 'math.random(0,1)', 'events', diagnoser);
                diagnoser.expectEmpty();
            });
            it('accepts a molang string literal', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', "'val1'", 'events', diagnoser);
                diagnoser.expectEmpty();
            });
            it('accepts a molang ternary expression with string literals', () => {
                const diagnoser = new diagnoser_1.TestDiagnoser();
                (0, properties_1.diagnose_entity_property_usage)([enumDefinition], 'test:prop', "1 > 3 ? 'val1' : 'val2'", 'events', diagnoser);
                diagnoser.expectEmpty();
            });
        });
    });
});
//# sourceMappingURL=entity-properties.test.js.map