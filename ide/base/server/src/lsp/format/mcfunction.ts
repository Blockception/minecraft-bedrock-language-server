import {
  DocumentFormattingParams,
  DocumentRangeFormattingParams,
  FormattingOptions,
  TextEdit,
} from 'vscode-languageserver';
import { Replace, ReplaceRegex, TrimEndFromLine, TrimStartFromLine } from '../../util';
import { Context } from '../context/context';
import { TextDocument } from '../documents/text-document';
import { FormatContext } from './context';

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunction(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[] {
  const formatter = new MCFunctionFormatter(params, context);

  return formatter.format(context.document, 0, context.document.lineCount);
}

/**
 *
 * @param doc
 * @param params
 * @returns
 */
export function formatMcfunctionRange(
  context: Context<FormatContext>,
  params: DocumentRangeFormattingParams,
): TextEdit[] {
  const startIndex = params.range.start.line;
  const endIndex = params.range.end.line;
  const formatter = new MCFunctionFormatter(params, context);

  return formatter.format(context.document, startIndex, endIndex);
}

class MCFunctionFormatter {
  options: FormattingOptions;
  context: Context<FormatContext>;

  constructor(params: DocumentFormattingParams | DocumentRangeFormattingParams, context: Context<FormatContext>) {
    this.options = params.options;
    this.context = context;
  }

  format(document: TextDocument, startIndex: number, endIndex: number): TextEdit[] {
    const result: TextEdit[] = [];

    for (let index = startIndex; index < endIndex; index++) {
      if (this.context.token.isCancellationRequested) break;
      const line = document.getLine(index);

      if (line.length > 2) {
        TrimStartFromLine(line, index, result, ['/', ' ', '\t']);
        TrimEndFromLine(line, index, result, [' ', '\t']);

        Replace(line, '~+', '~', index, result);
        Replace(line, '^+', '^', index, result);
        // Only strip a redundant "0" offset (e.g. "~0" -> "~"), never a decimal
        // value like "~0.5" or a multi-digit offset like "~05".
        ReplaceRegex(line, /~0(?![.0-9])/g, '~', index, result);
        ReplaceRegex(line, /\^0(?![.0-9])/g, '^', index, result);
        Replace(line, ' ##', ' \t##', index, result);
      }
    }

    return result;
  }
}
