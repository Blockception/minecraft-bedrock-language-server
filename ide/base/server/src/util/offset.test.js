"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_vscode_words_1 = require("bc-vscode-words");
const offset_1 = require("./offset");
describe('Offset', () => {
    test('IsWithin', () => {
        const word = new bc_vscode_words_1.OffsetWord('test', 0);
        expect(word.text).toEqual('test');
        expect(word.offset).toEqual(0);
        const test = (value, actual) => {
            expect(offset_1.Offset.isWithin(word, value)).toEqual(actual);
        };
        test(0, true);
        test(1, true);
        test(2, true);
        test(3, true);
        test(4, false);
        test(5, false);
        test(6, false);
        test(7, false);
    });
});
//# sourceMappingURL=offset.test.js.map