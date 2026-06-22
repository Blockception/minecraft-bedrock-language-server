import { Languages } from '@blockception/ide-shared';
import {
  CancellationToken,
  Connection,
  FoldingRange,
  FoldingRangeKind,
  FoldingRangeParams,
} from 'vscode-languageserver';
import { TextDocument } from '../documents';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { CapabilityBuilder } from '../services/capabilities';
import { IService } from '../services/service';

export class FoldingService extends BaseService implements IService {
  readonly name: string = 'folding';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[folding]'), extension);
  }

  onInitialize(capabilities: CapabilityBuilder): void {
    capabilities.set('foldingRangeProvider', {
      workDoneProgress: true,
    });
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(connection.onFoldingRanges(this.onFoldingRanges.bind(this)));
  }

  private onFoldingRanges(params: FoldingRangeParams, _token: CancellationToken): FoldingRange[] | undefined {
    const document = this.extension.documents.get(params.textDocument.uri);
    if (!document) return undefined;

    // JSON folding is provided by the built-in language service, mcfunction is line based.
    if (document.languageId !== Languages.McFunctionIdentifier) return undefined;

    return provideMcfunctionFolding(document);
  }
}

/**
 * Provides folding ranges for an mcfunction document: explicit `#region`/`#endregion`
 * markers and blocks of consecutive comment lines.
 * @param document The document to provide folding for
 */
export function provideMcfunctionFolding(document: TextDocument): FoldingRange[] {
  const out: FoldingRange[] = [];
  const regions: number[] = [];

  let commentStart = -1;
  const lineCount = document.lineCount;

  const flushComments = (endLine: number) => {
    // Only fold comment blocks that span more than a single line.
    if (commentStart >= 0 && endLine > commentStart) {
      out.push(FoldingRange.create(commentStart, endLine, undefined, undefined, FoldingRangeKind.Comment));
    }
    commentStart = -1;
  };

  for (let line = 0; line < lineCount; line++) {
    const text = document.getLine(line).trim();

    if (isRegionStart(text)) {
      flushComments(line - 1);
      regions.push(line);
      continue;
    }

    if (isRegionEnd(text)) {
      flushComments(line - 1);
      const start = regions.pop();
      if (start !== undefined && line > start) {
        out.push(FoldingRange.create(start, line, undefined, undefined, FoldingRangeKind.Region));
      }
      continue;
    }

    if (text.startsWith('#')) {
      if (commentStart < 0) commentStart = line;
      continue;
    }

    flushComments(line - 1);
  }

  flushComments(lineCount - 1);

  return out;
}

function isRegionStart(text: string): boolean {
  return /^#\s*region\b/i.test(text);
}

function isRegionEnd(text: string): boolean {
  return /^#\s*endregion\b/i.test(text);
}
