"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_diagnoser_1 = require("bc-minecraft-bedrock-diagnoser");
const diagnoser_1 = require("./diagnoser");
describe('InternalDiagnoser mc-disable', () => {
    function createMockDocument(content) {
        return {
            uri: 'file:///test.mcfunction',
            getText: () => content,
            languageId: 'mcfunction',
            version: 1,
            lineCount: content.split('\n').length,
            positionAt: (offset) => {
                const lines = content.substring(0, offset).split('\n');
                return { line: lines.length - 1, character: lines[lines.length - 1].length };
            },
            offsetAt: (position) => {
                const lines = content.split('\n');
                let offset = 0;
                for (let i = 0; i < position.line && i < lines.length; i++) {
                    offset += lines[i].length + 1;
                }
                return offset + position.character;
            },
        };
    }
    function createMockContext() {
        return {
            getDocument: () => undefined,
            getFiles: () => [],
            getProjectData: () => ({}),
        };
    }
    function createMockProject() {
        return {
            attributes: {},
        };
    }
    test('should allow diagnostic when no mc-disable comment', () => {
        const content = `say hello world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const items = [];
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, (d) => {
            items.push(...d.items);
        });
        diagnoser.add({ line: 0, character: 0 }, 'Test error', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error');
        expect(diagnoser.items.length).toBe(1);
        expect(diagnoser.items[0].code).toBe('test.error');
    });
    test('should block diagnostic with file-level mc-disable', () => {
        const content = `// mc-disable test.error
say hello world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, () => { });
        diagnoser.add({ line: 1, character: 0 }, 'Test error', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error');
        expect(diagnoser.items.length).toBe(0);
    });
    test('should block diagnostic with mc-disable-next-line', () => {
        const content = `// mc-disable-next-line test.error
say hello world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, () => { });
        diagnoser.add({ line: 1, character: 0 }, 'Test error', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error');
        expect(diagnoser.items.length).toBe(0);
    });
    test('should allow diagnostic on different line than mc-disable-next-line', () => {
        const content = `// mc-disable-next-line test.error
say hello world
say goodbye world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, () => { });
        diagnoser.add({ line: 2, character: 0 }, 'Test error', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error');
        expect(diagnoser.items.length).toBe(1);
    });
    test('should handle multiple codes in mc-disable', () => {
        const content = `// mc-disable test.error1, test.error2
say hello world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, () => { });
        diagnoser.add({ line: 1, character: 0 }, 'Test error 1', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error1');
        diagnoser.add({ line: 1, character: 0 }, 'Test error 2', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error2');
        diagnoser.add({ line: 1, character: 0 }, 'Test error 3', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error3');
        expect(diagnoser.items.length).toBe(1);
        expect(diagnoser.items[0].code).toBe('test.error3');
    });
    test('should handle multiple mc-disable-next-line comments', () => {
        const content = `// mc-disable-next-line test.error1
say hello world
// mc-disable-next-line test.error2
say goodbye world`;
        const doc = createMockDocument(content);
        const context = createMockContext();
        const project = createMockProject();
        const diagnoser = new diagnoser_1.InternalDiagnoser(doc, project, context, () => { });
        diagnoser.add({ line: 1, character: 0 }, 'Test error 1', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error1');
        diagnoser.add({ line: 3, character: 0 }, 'Test error 2', bc_minecraft_bedrock_diagnoser_1.DiagnosticSeverity.error, 'test.error2');
        expect(diagnoser.items.length).toBe(0);
    });
});
//# sourceMappingURL=diagnoser.test.js.map