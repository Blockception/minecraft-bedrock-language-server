import { Languages } from '@blockception/ide-shared';
import {
  CancellationToken,
  Connection,
  InlineCompletionItem,
  InlineCompletionParams,
  ProposedFeatures,
  WorkDoneProgressReporter,
} from 'vscode-languageserver';
import { Context } from '../context/context';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { getCurrentWord } from '../references/function';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';
import { createBuilder } from '../completion/builder/builder';
import { CompletionContext } from '../completion/context';
import { onCompletionRequest } from '../completion/on-request';

/** The maximum number of inline suggestions to offer at once. */
const maxItems = 5;

export class InlineCompletionService extends BaseService implements IService {
  readonly name: string = 'inline-completion';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[inline-completion]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('inlineCompletionProvider', {});
  }

  setupHandlers(connection: Connection): void {
    // `inlineCompletion` is a proposed feature, enabled through `ProposedFeatures.all`,
    // but it is not part of the base `Connection` type.
    const languages = (connection as ProposedFeatures.Connection).languages;
    this.addDisposable(languages.inlineCompletion.on(this.onInlineCompletion.bind(this)));
  }

  private onInlineCompletion(
    params: InlineCompletionParams,
    token: CancellationToken,
    workDoneProgress: WorkDoneProgressReporter,
  ): InlineCompletionItem[] {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return [];

    // Inline ghost text is most useful for mcfunction; richer languages are
    // already served well by the regular completion list.
    if (document.languageId !== Languages.McFunctionIdentifier) return [];

    const cursor = document.offsetAt(params.position);
    const word = getCurrentWord(document, cursor);

    // Only the portion of the word that has been typed before the cursor.
    const prefix = word.text.slice(0, cursor - word.offset);
    if (prefix === '') return [];

    const context = Context.create<CompletionContext>(
      this.extension,
      {
        document,
        token,
        workDoneProgress,
        cursor,
        builder: createBuilder(token, workDoneProgress),
        textDocument: params.textDocument,
        position: params.position,
      },
      { logger: this.logger },
    );

    onCompletionRequest(context);

    const range = {
      start: document.positionAt(word.offset),
      end: params.position,
    };

    const lowerPrefix = prefix.toLowerCase();
    const seen = new Set<string>();
    const out: InlineCompletionItem[] = [];

    for (const item of context.builder.getItems()) {
      const insert = typeof item.insertText === 'string' ? item.insertText : item.label;
      if (insert.length <= prefix.length) continue;
      if (!insert.toLowerCase().startsWith(lowerPrefix)) continue;
      if (seen.has(insert)) continue;

      seen.add(insert);
      out.push({ insertText: insert, filterText: insert, range });

      if (out.length >= maxItems) break;
    }

    return out;
  }
}
