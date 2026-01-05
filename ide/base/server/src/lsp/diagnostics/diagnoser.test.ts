import { DiagnosticsBuilderContent, DiagnosticSeverity } from 'bc-minecraft-bedrock-diagnoser';
import { MCProject } from 'bc-minecraft-project';
import { TextDocument } from '../documents/text-document';
import { InternalDiagnoser } from './diagnoser';

describe('InternalDiagnoser mc-disable', () => {
  function createMockDocument(content: string): TextDocument {
    return {
      uri: 'file:///test.mcfunction',
      getText: () => content,
      languageId: 'mcfunction',
      version: 1,
      lineCount: content.split('\n').length,
      positionAt: (offset: number) => {
        const lines = content.substring(0, offset).split('\n');
        return { line: lines.length - 1, character: lines[lines.length - 1].length };
      },
      offsetAt: (position: { line: number; character: number }) => {
        const lines = content.split('\n');
        let offset = 0;
        for (let i = 0; i < position.line && i < lines.length; i++) {
          offset += lines[i].length + 1;
        }
        return offset + position.character;
      },
    } as any;
  }

  function createMockContext(): DiagnosticsBuilderContent<TextDocument> {
    return {
      getDocument: () => undefined,
      getFiles: () => [],
      getProjectData: () => ({} as any),
    } as any;
  }

  function createMockProject(): MCProject {
    return {
      attributes: {},
    } as any;
  }

  test('should allow diagnostic when no mc-disable comment', () => {
    const content = `say hello world`;
    const doc = createMockDocument(content);
    const context = createMockContext();
    const project = createMockProject();
    const items: any[] = [];
    
    const diagnoser = new InternalDiagnoser(doc, project, context, (d) => {
      items.push(...d.items);
    });

    diagnoser.add({ line: 0, character: 0 }, 'Test error', DiagnosticSeverity.error, 'test.error');
    
    expect(diagnoser.items.length).toBe(1);
    expect(diagnoser.items[0].code).toBe('test.error');
  });

  test('should block diagnostic with file-level mc-disable', () => {
    const content = `// mc-disable test.error
say hello world`;
    const doc = createMockDocument(content);
    const context = createMockContext();
    const project = createMockProject();
    
    const diagnoser = new InternalDiagnoser(doc, project, context, () => {});

    diagnoser.add({ line: 1, character: 0 }, 'Test error', DiagnosticSeverity.error, 'test.error');
    
    expect(diagnoser.items.length).toBe(0);
  });

  test('should block diagnostic with mc-disable-next-line', () => {
    const content = `// mc-disable-next-line test.error
say hello world`;
    const doc = createMockDocument(content);
    const context = createMockContext();
    const project = createMockProject();
    
    const diagnoser = new InternalDiagnoser(doc, project, context, () => {});

    diagnoser.add({ line: 1, character: 0 }, 'Test error', DiagnosticSeverity.error, 'test.error');
    
    expect(diagnoser.items.length).toBe(0);
  });

  test('should allow diagnostic on different line than mc-disable-next-line', () => {
    const content = `// mc-disable-next-line test.error
say hello world
say goodbye world`;
    const doc = createMockDocument(content);
    const context = createMockContext();
    const project = createMockProject();
    
    const diagnoser = new InternalDiagnoser(doc, project, context, () => {});

    diagnoser.add({ line: 2, character: 0 }, 'Test error', DiagnosticSeverity.error, 'test.error');
    
    expect(diagnoser.items.length).toBe(1);
  });

  test('should handle multiple codes in mc-disable', () => {
    const content = `// mc-disable test.error1, test.error2
say hello world`;
    const doc = createMockDocument(content);
    const context = createMockContext();
    const project = createMockProject();
    
    const diagnoser = new InternalDiagnoser(doc, project, context, () => {});

    diagnoser.add({ line: 1, character: 0 }, 'Test error 1', DiagnosticSeverity.error, 'test.error1');
    diagnoser.add({ line: 1, character: 0 }, 'Test error 2', DiagnosticSeverity.error, 'test.error2');
    diagnoser.add({ line: 1, character: 0 }, 'Test error 3', DiagnosticSeverity.error, 'test.error3');
    
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
    
    const diagnoser = new InternalDiagnoser(doc, project, context, () => {});

    diagnoser.add({ line: 1, character: 0 }, 'Test error 1', DiagnosticSeverity.error, 'test.error1');
    diagnoser.add({ line: 3, character: 0 }, 'Test error 2', DiagnosticSeverity.error, 'test.error2');
    
    expect(diagnoser.items.length).toBe(0);
  });
});
