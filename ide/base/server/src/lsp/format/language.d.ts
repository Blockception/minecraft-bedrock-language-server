import { DocumentFormattingParams, DocumentRangeFormattingParams } from 'vscode-languageserver';
import { TextEdit } from 'vscode-languageserver-textdocument';
import { Context } from '../context/context';
import { FormatContext } from './context';
export declare function formatLangauge(context: Context<FormatContext>, params: DocumentFormattingParams): TextEdit[];
export declare function formatLangaugeRange(context: Context<FormatContext>, params: DocumentRangeFormattingParams): TextEdit[];
//# sourceMappingURL=language.d.ts.map