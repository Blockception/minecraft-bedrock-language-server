"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("./glob");
describe('Glob', () => {
    test('Ensure Item', () => {
        let source = glob_1.Glob.ensureSource('f:/Projects/Org B/Project-Foo');
        expect(source).toEqual('f:/Projects/Org B/Project-Foo');
        source = glob_1.Glob.ensureSource('file:///f%3A/Projects/Org%20B/Project-Foo/');
        expect(source).toEqual('f:/Projects/Org B/Project-Foo/');
        source = glob_1.Glob.ensureSource('file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\');
        expect(source).toEqual('f:/Projects/Org B/Project-Foo/');
    });
    test('Ensure Array', () => {
        const source = glob_1.Glob.ensureSources([
            'f:/Projects/Org B/Project-Foo',
            'file:///f%3A/Projects/Org%20B/Project-Foo/',
            'file:\\\\f%3A\\Projects\\Org%20B\\Project-Foo\\',
        ]);
        expect(source[0]).toEqual('f:/Projects/Org B/Project-Foo');
        expect(source[1]).toEqual('f:/Projects/Org B/Project-Foo/');
        expect(source[2]).toEqual('f:/Projects/Org B/Project-Foo/');
    });
});
//# sourceMappingURL=glob.test.js.map