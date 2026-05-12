import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
export declare function provideDocCompletion(context: Context<CompletionContext>): void;
/**
 *
 * @param line
 * @param cursor
 * @param doc
 * @param receiver
 * @returns
 */
export declare function provideCompletion(context: Context<CompletionContext>, line: string, cursor: number): void;
//# sourceMappingURL=main.d.ts.map