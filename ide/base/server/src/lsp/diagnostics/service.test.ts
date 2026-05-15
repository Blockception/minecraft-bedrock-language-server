import { Diagnostic, DiagnosticSeverity, DocumentDiagnosticReportKind } from 'vscode-languageserver';
import { DiagnoserService } from './service';

describe('DiagnoserService pull diagnostics', () => {
  function createService() {
    const logger = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
      debug: jest.fn(),
      with: jest.fn(),
      recordError: jest.fn(),
      withPrefix: jest.fn(),
    } as any;
    logger.withPrefix.mockReturnValue(logger);

    const documents = {
      get: jest.fn(),
      onDidSave: jest.fn(() => ({ dispose: jest.fn() })),
    } as any;

    const extension = {
      connection: {
        sendDiagnostics: jest.fn(),
      },
      database: {
        ProjectData: {},
      },
      documents,
      state: {
        workspaces: {
          traversed: true,
        },
      },
    } as any;

    return {
      documents,
      extension,
      service: new DiagnoserService(logger, extension, documents),
    };
  }

  test('returns full pull diagnostic report from cached diagnostics', () => {
    const { service } = createService();
    const diagnostics: Diagnostic[] = [
      {
        message: 'error',
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
        severity: DiagnosticSeverity.Error,
      },
    ];

    service.set({ uri: 'file:///test.mcfunction', version: 1 } as any, diagnostics);

    const result = (service as any).onPullDiagnostic({
      textDocument: { uri: 'file:///test.mcfunction' },
    });

    expect(result.kind).toBe(DocumentDiagnosticReportKind.Full);
    expect(result.items).toEqual(diagnostics);
  });

  test('pull diagnostics request triggers diagnose when document can be loaded', () => {
    const { service, documents } = createService();
    const diagnose = jest.spyOn(service, 'diagnose').mockImplementation(() => undefined);
    documents.get.mockReturnValue({
      uri: 'file:///test.mcfunction',
    });

    (service as any).onPullDiagnostic({
      textDocument: { uri: 'file:///test.mcfunction' },
    });

    expect(diagnose).toHaveBeenCalledTimes(1);
  });
});
