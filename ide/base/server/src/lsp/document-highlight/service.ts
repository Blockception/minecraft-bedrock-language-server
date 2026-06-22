import {
  CancellationToken,
  Connection,
  DocumentHighlight,
  DocumentHighlightKind,
  DocumentHighlightParams,
} from 'vscode-languageserver';
import { Character } from '../../util';
import { TextDocument } from '../documents';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { getCurrentWord } from '../references/function';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';

export class DocumentHighlightService extends BaseService implements IService {
  readonly name: string = 'document-highlight';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[document-highlight]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('documentHighlightProvider', {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onDocumentHighlight(this.onDocumentHighlight.bind(this)));
  }

  private onDocumentHighlight(
    params: DocumentHighlightParams,
    _token: CancellationToken,
  ): DocumentHighlight[] | undefined {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return undefined;

    const cursor = document.offsetAt(params.position);
    const word = getCurrentWord(document, cursor);
    if (word.text === '') return undefined;

    return getOccurrences(document, word.text);
  }
}

/**
 * Finds all whole-word occurrences of the given word within the document and returns them as highlights.
 * @param document The document to scan
 * @param word The word to look for
 */
export function getOccurrences(document: TextDocument, word: string): DocumentHighlight[] {
  const out: DocumentHighlight[] = [];
  const text = document.getText();
  const length = word.length;
  if (length === 0) return out;

  let index = text.indexOf(word);
  while (index >= 0) {
    if (isWholeWord(text, index, length)) {
      out.push({
        kind: DocumentHighlightKind.Text,
        range: {
          start: document.positionAt(index),
          end: document.positionAt(index + length),
        },
      });
    }

    index = text.indexOf(word, index + length);
  }

  return out;
}

function isWholeWord(text: string, start: number, length: number): boolean {
  const before = start - 1;
  const after = start + length;

  if (before >= 0 && isWordCharacter(text.charCodeAt(before))) return false;
  if (after < text.length && isWordCharacter(text.charCodeAt(after))) return false;

  return true;
}

function isWordCharacter(c: number): boolean {
  if (Character.IsLetterCode(c) || Character.IsNumberCode(c)) return true;

  return c === Character.Character_underscore || c === Character.Character_dash || c === Character.Character_column;
}
