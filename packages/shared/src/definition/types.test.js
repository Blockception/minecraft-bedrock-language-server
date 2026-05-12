"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
describe('Definition', () => {
    it('getId', () => {
        const example = {
            walk: 'animation.sheep.walk',
            default: 'animation.sheep.default',
        };
        expect(types_1.Definition.count(example)).toEqual(2);
        expect(types_1.Definition.getId(example, 0)).toEqual('animation.sheep.walk');
        expect(types_1.Definition.getId(example, 1)).toEqual('animation.sheep.default');
    });
    it('getIds', () => {
        const example = {
            walk: 'animation.sheep.walk',
            default: 'animation.sheep.default',
        };
        const keys = types_1.Definition.getIds(example);
        expect(keys).toEqual(expect.arrayContaining(['animation.sheep.walk', 'animation.sheep.default']));
    });
    it('getReference', () => {
        const example = {
            walk: 'animation.sheep.walk',
            default: 'animation.sheep.default',
        };
        expect(types_1.Definition.count(example)).toEqual(2);
        expect(types_1.Definition.getReference(example, 0)).toEqual('walk');
        expect(types_1.Definition.getReference(example, 1)).toEqual('default');
    });
    it('getReferences', () => {
        const example = {
            walk: 'animation.sheep.walk',
            default: 'animation.sheep.default',
        };
        const keys = types_1.Definition.getReferences(example);
        expect(keys).toEqual(expect.arrayContaining(['walk', 'default']));
    });
    it('foreach', () => {
        const example = {
            walk: 'animation.sheep.walk',
            default: 'animation.sheep.default',
        };
        const ids = [];
        const references = [];
        types_1.Definition.forEach(example, (reference, id) => {
            ids.push(id);
            references.push(reference);
        });
        expect(ids).toEqual(expect.arrayContaining(['animation.sheep.walk', 'animation.sheep.default']));
        expect(references).toEqual(expect.arrayContaining(['walk', 'default']));
    });
    it('foreach with undefined', () => {
        const ids = [];
        const references = [];
        types_1.Definition.forEach(undefined, (reference, id) => {
            ids.push(id);
            references.push(reference);
        });
        expect(ids).toEqual([]);
        expect(references).toEqual([]);
    });
});
//# sourceMappingURL=types.test.js.map