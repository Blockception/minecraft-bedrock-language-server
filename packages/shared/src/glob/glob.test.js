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
    test('excludes', () => {
        const files = [
            '/project/src/file1.ts',
            '/project/src/file2.ts',
            '/project/test/file1.test.ts',
            '/project/node_modules/lib.js',
        ];
        const ignores = ['**/test/**', '**/node_modules/**'];
        const result = glob_1.Glob.excludes(files, ignores);
        expect(result).toEqual(['/project/src/file1.ts', '/project/src/file2.ts']);
    });
    test('isMatch', () => {
        expect(glob_1.Glob.isMatch('/project/src/file.ts', ['**/*.ts'])).toBeTruthy();
        expect(glob_1.Glob.isMatch('/project/src/file.js', ['**/*.ts'])).toBeFalsy();
    });
    test('folderPath', () => {
        expect(glob_1.Glob.folderPath('C:\\Users\\Test\\Project')).toEqual('C:/Users/Test/Project');
        expect(glob_1.Glob.folderPath('/Users/Test/Project')).toEqual('/Users/Test/Project');
    });
    test('getFiles - basic', () => {
        // Create a test directory structure
        const testDir = '/tmp/test-glob-files';
        const files = glob_1.Glob.getFiles('*.txt', undefined, testDir);
        // Just verify it returns an array
        expect(Array.isArray(files)).toBeTruthy();
    });
    test('getFiles - with ignores', () => {
        const testDir = '/tmp/test-glob-files';
        const files = glob_1.Glob.getFiles(['*.txt', '*.js'], ['**/*.js'], testDir);
        // Should return array
        expect(Array.isArray(files)).toBeTruthy();
    });
    test('getFiles - with baseNameMatch', () => {
        const testDir = '/tmp/test-glob-files';
        const files = glob_1.Glob.getFiles('*.txt', undefined, testDir, true);
        // Should return array
        expect(Array.isArray(files)).toBeTruthy();
    });
    test('ensureSources with array', () => {
        const sources = ['file://test1.txt', 'file://test2.txt'];
        const result = glob_1.Glob.ensureSources(sources);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toEqual(2);
    });
    test('ensureSources with string', () => {
        const source = 'file://test1.txt';
        const result = glob_1.Glob.ensureSources(source);
        expect(typeof result).toEqual('string');
        expect(result).toEqual('test1.txt');
    });
});
//# sourceMappingURL=glob.test.js.map