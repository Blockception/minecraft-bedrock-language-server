import { DocumentFormattingParams, DocumentRangeFormattingParams, TextEdit } from 'vscode-languageserver';
import { Context } from '../context/context';
import { FormatContext } from './context';
/**
 *
 * @param doc
 * @param params
 * @returns
 */
export declare function formatMcfunction(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[];
/**
 *
 * @param doc
 * @param params
 * @returns
 */
export declare function formatMcfunctionRange(context: Context<FormatContext>, params: DocumentRangeFormattingParams): TextEdit[];
//# sourceMappingURL=mcfunction.d.ts.map