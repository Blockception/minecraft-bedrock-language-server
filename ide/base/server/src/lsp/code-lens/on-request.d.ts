import { CodeLens, CodeLensParams } from 'vscode-languageserver';
import { Context } from '../context/context';
import { CodeLensContext } from './context';
/**
 *
 * @param params
 * @returns
 */
export declare function internalRequest(context: Context<CodeLensContext>, params: CodeLensParams): Promise<CodeLens[] | null | undefined>;
//# sourceMappingURL=on-request.d.ts.map