import {
  CancellationToken,
  Connection,
  PrepareRenameParams,
  Range,
  RenameParams,
  ResponseError,
  TextEdit,
  WorkDoneProgressReporter,
  WorkspaceEdit,
} from 'vscode-languageserver';
import { ErrorCodes } from '../../constants';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { getCurrentWord } from '../references/function';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';

export class RenameService extends BaseService implements IService {
  readonly name: string = 'rename';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[rename]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('renameProvider', {
      prepareProvider: true,
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onPrepareRename(this.onPrepareRename.bind(this)),
      connection.onRenameRequest(this.onRename.bind(this)),
    );
  }

  private onPrepareRename(
    params: PrepareRenameParams,
    _token: CancellationToken,
  ): { range: Range; placeholder: string } | null {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return null;

    const cursor = document.offsetAt(params.position);
    const word = getCurrentWord(document, cursor);
    if (word.text === '') return null;

    return {
      range: {
        start: document.positionAt(word.offset),
        end: document.positionAt(word.offset + word.text.length),
      },
      placeholder: word.text,
    };
  }

  private async onRename(
    params: RenameParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter,
  ): Promise<WorkspaceEdit | ResponseError<void> | null> {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return null;

    const newName = params.newName.trim();
    if (newName === '') {
      return new ResponseError(ErrorCodes.RenameService, 'The new name may not be empty');
    }

    const cursor = document.offsetAt(params.position);
    const word = getCurrentWord(document, cursor);
    if (word.text === '') return null;

    workDoneProgress.begin('renaming');

    const locations = await this.extension.database.findReference(
      word.text,
      this.extension.documents,
      { defined: true, usage: true },
      token,
      workDoneProgress,
    );

    workDoneProgress.done();

    if (locations.length === 0) return null;

    const changes: Record<string, TextEdit[]> = {};
    for (const location of locations) {
      const edits = (changes[location.uri] ??= []);
      edits.push(TextEdit.replace(location.range, newName));
    }

    return { changes };
  }
}
