"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
describe('Conditional', () => {
    it('getId', () => {
        const example = { example: 1 };
        expect(types_1.Conditional.getId(example)).toEqual('example');
    });
    it('getId2', () => {
        expect(types_1.Conditional.getId('example')).toEqual('example');
    });
    it('getCondition', () => {
        const example = { example: 1 };
        expect(types_1.Conditional.getCondition(example)).toEqual(1);
    });
    it('getCondition2', () => {
        const example = { example: 'foo' };
        expect(types_1.Conditional.getCondition(example)).toEqual('foo');
    });
    it('forEach works as intented', () => {
        const example = [{ example: 'foo' }, 'foo', { example2: 1 }];
        const values = [];
        const ids = [];
        types_1.Conditional.forEach(example, (id, value) => {
            values.push(value);
            ids.push(id);
        });
        expect(ids).toEqual(expect.arrayContaining(['example', 'foo', 'example2']));
        expect(values).toEqual(expect.arrayContaining(['foo', 1, '1.0']));
    });
    it('getCondition with empty object', () => {
        const example = {};
        expect(types_1.Conditional.getCondition(example)).toEqual('1.0');
    });
    it('getId with empty object', () => {
        const example = {};
        expect(types_1.Conditional.getId(example)).toEqual('');
    });
});
//# sourceMappingURL=types.test.js.map