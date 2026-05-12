"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
describe('Array Functions', () => {
    test('removeDuplicate string', () => {
        const items = ['string 1', 'string 2', 'string 3', 'string 2'];
        const pruned = (0, array_1.removeDuplicate)(items);
        expect(pruned).toHaveLength(3);
    });
    test('removeDuplicate number', () => {
        const items = [0, 1, 2, 1];
        const pruned = (0, array_1.removeDuplicate)(items);
        expect(pruned).toHaveLength(3);
    });
    test('removeDuplicate boolean', () => {
        const items = [false, true, false];
        const pruned = (0, array_1.removeDuplicate)(items);
        expect(pruned).toHaveLength(2);
    });
    test('DupeCheckAdd string', () => {
        const items = [];
        (0, array_1.DupeCheckAdd)(items, 'string 1');
        (0, array_1.DupeCheckAdd)(items, 'string 2');
        (0, array_1.DupeCheckAdd)(items, 'string 3');
        (0, array_1.DupeCheckAdd)(items, 'string 2');
        expect(items).toHaveLength(3);
    });
    test('DupeCheckAdd number', () => {
        const items = [];
        (0, array_1.DupeCheckAdd)(items, 0);
        (0, array_1.DupeCheckAdd)(items, 1);
        (0, array_1.DupeCheckAdd)(items, 2);
        (0, array_1.DupeCheckAdd)(items, 1);
        expect(items).toHaveLength(3);
    });
    test('DupeCheckAdd boolean', () => {
        const items = [];
        (0, array_1.DupeCheckAdd)(items, false);
        (0, array_1.DupeCheckAdd)(items, true);
        (0, array_1.DupeCheckAdd)(items, false);
        expect(items).toHaveLength(2);
    });
});
//# sourceMappingURL=array.test.js.map