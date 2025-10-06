import {
  TextDocumentEdit,
  CreateFile,
  RenameFile,
  DeleteFile,
  WorkspaceEdit,
  CreateFileOptions,
  TextEdit,
  OptionalVersionedTextDocumentIdentifier,
  ApplyWorkspaceEditResult,
  Range,
  Connection,
} from 'vscode-languageserver';
import { Fs, Vscode } from '../util';
import { IExtendedLogger } from '../lsp/logger/logger';
import { exists } from '../io/io';

/**
 *
 */
export class FileBuilder {
  private _connection: Connection;
  private _logger: IExtendedLogger;
  private _receiver: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
  public options: CreateFileOptions;

  constructor(connection: Connection, logger: IExtendedLogger) {
    this._connection = connection;
    this._logger = logger;
    this._receiver = [];
    this.options = { ignoreIfExists: true, overwrite: false };
  }

  /**
   * Sends the edits to the client
   * @returns
   */
  async send(): Promise<ApplyWorkspaceEditResult | void> {
    if (this._receiver.length <= 0) return;

    const edit: WorkspaceEdit = { documentChanges: this._receiver };
    const result = await this._connection.workspace.applyEdit(edit);
    this.response(result);
    return result;
  }

  /**
   *
   * @param uri
   * @param content
   * @returns
   */
  create(uri: string, content: string): void {
  if (uri.startsWith('file:\\')) uri = uri.replace(/\\/gi, '/');

    const path = Fs.FromVscode(uri);
    uri = Vscode.fromFs(path);

    if (exists(path, this._logger)) {
      this._logger.info('Creation of file skipped because it already exists: ' + path);
      return;
    }

    const Content: TextEdit = {
      newText: content,
      range: Range.create(0, 0, 0, 0),
    };

    this._logger.info('Creating file: ' + path);
    const Version = OptionalVersionedTextDocumentIdentifier.create(uri, null);
    this._receiver.push(CreateFile.create(uri, this.options), TextDocumentEdit.create(Version, [Content]));
  }

  /**
   * Delete a file or folder via workspace edit
   * @param uri vscode uri
   */
  delete(uri: string, recursive: boolean = false): void {
  if (uri.startsWith('file:\\')) uri = uri.replace(/\\/gi, '/');

    const path = Fs.FromVscode(uri);
    uri = Vscode.fromFs(path);

    this._receiver.push(DeleteFile.create(uri, { recursive: recursive, ignoreIfNotExists: true }));
  }

  /**
   *
   * @param response
   * @returns
   */
  response(response: ApplyWorkspaceEditResult): void {
    if (response.applied) return;
    const keys = Object.getOwnPropertyNames(response);

    if (keys.length === 1) {
      this._logger.error('Workspace edit was not applied, possibly of already existing data');
      return;
    }

    this._logger.error('Workspace edit failed', response);
  }
}
