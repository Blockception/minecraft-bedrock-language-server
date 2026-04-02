import {
  CancellationToken,
  CancellationTokenSource,
  Connection,
  CreateFilesParams,
  DeleteFilesParams,
  RenameFilesParams,
  TextDocumentChangeEvent,
} from 'vscode-languageserver';
import { Glob } from '../../files/glob';
import { DiagnoserService } from '../diagnostics/service';
import { ContentType } from '../documents/manager';
import { TextDocument } from '../documents/text-document';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';

export class DocumentProcessor extends BaseService implements Partial<IService> {
  name: string = 'document processor';
  private _diagnoser: DiagnoserService;
  private _debounceTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private _cancellationSources: Map<string, CancellationTokenSource> = new Map();

  private static readonly DIAGNOSE_DEBOUNCE_MS = 300;

  constructor(logger: IExtendedLogger, extension: ExtensionContext, diagnoser: DiagnoserService) {
    super(logger.withPrefix('[doc pros]'), extension);
    this._diagnoser = diagnoser;
  }

  onInitialize(): void {
    //provides diagnostics and such
    const { documents } = this.extension;
    documents.onDidOpen(this.onDocumentChanged.bind(this));
    documents.onDidSave(this.onDocumentChanged.bind(this));
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.workspace.onDidCreateFiles(this.onDidCreateFiles.bind(this)),
      connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)),
      connection.workspace.onDidRenameFiles(this.onDidRenameFiles.bind(this)),
    );
  }

  private onDocumentChanged(e: TextDocumentChangeEvent<TextDocument>) {
    const doc = this.extension.documents.get(e.document.uri, e.document, e.document.languageId);
    if (doc === undefined) return;

    // Process immediately (data indexing)
    this.process(doc);

    // Cancel any pending debounce timer for this document
    const existingTimer = this._debounceTimers.get(doc.uri);
    if (existingTimer !== undefined) {
      clearTimeout(existingTimer);
    }

    // Cancel any in-flight diagnose for this document
    const existingSource = this._cancellationSources.get(doc.uri);
    if (existingSource !== undefined) {
      existingSource.cancel();
      existingSource.dispose();
      this._cancellationSources.delete(doc.uri);
    }

    // Debounce: schedule diagnose after a short delay so rapid changes only trigger one run
    const timer = setTimeout(() => {
      this._debounceTimers.delete(doc.uri);
      const source = new CancellationTokenSource();
      this._cancellationSources.set(doc.uri, source);

      Promise.resolve(this.diagnose(doc, source.token)).finally(() => {
        if (this._cancellationSources.get(doc.uri) === source) {
          this._cancellationSources.delete(doc.uri);
        }
        source.dispose();
      });
    }, DocumentProcessor.DIAGNOSE_DEBOUNCE_MS);

    this._debounceTimers.set(doc.uri, timer);
  }

  get(uri: string): TextDocument;
  get(uri: string, content: ContentType): TextDocument;
  get(uri: string, content: ContentType, languageID: string): TextDocument;
  get(uri: string, content?: ContentType, languageID?: string): TextDocument | undefined {
    return this.extension.documents.get(uri, content, languageID);
  }

  delete(uri: string) {
    this.extension.database.ProjectData.deleteFile(uri);
    this._diagnoser.clear({ uri });
  }

  /**
   *
   * @param document
   */
  process(document: TextDocument): void {
    const conf = document.configuration();

    try {
      if (conf.ignores.patterns.length == 0 || !Glob.isMatch(document.uri, conf.ignores.patterns)) {
        this.extension.database.ProjectData.process(document);
      } else {
        this.logger.info(`ignoring file ${document.uri}`);
      }
    } catch (error) {
      this.logger.recordError(error, document);
    }
  }

  diagnose(doc: TextDocument, token?: CancellationToken): void | Promise<void> {
    return this._diagnoser.diagnose(doc, token);
  }

  private onDidDeleteFiles(params: DeleteFilesParams) {
    this.logger.debug('received deleted files', params);

    params.files.forEach((file) => this.delete(file.uri));
  }

  private onDidCreateFiles(params: CreateFilesParams) {
    this.logger.debug('received created files', params);

    params.files.forEach((file) => {
      const doc = this.extension.documents.get(file.uri);
      if (doc === undefined) return;

      return this.process(doc);
    });
  }

  private onDidRenameFiles(params: RenameFilesParams) {
    this.logger.debug('received files rename', params);

    params.files.forEach((file) => this.delete(file.oldUri));
    params.files.forEach((file) => {
      const doc = this.extension.documents.get(file.newUri);
      if (doc === undefined) return;

      return this.process(doc);
    });
  }
}
