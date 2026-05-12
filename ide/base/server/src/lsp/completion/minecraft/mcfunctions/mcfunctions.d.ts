import { Command } from 'bc-minecraft-bedrock-command';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
/**
 *
 * @param context
 * @param pos
 * @returns
 */
export declare function provideCompletion(context: Context<CompletionContext>): void;
/**
 *
 * @param context
 * @param text
 * @param cursor
 * @param offset
 */
export declare function provideCompletionLine(context: Context<CompletionContext>, text: string, offset: number): void;
/**
 *
 * @param context
 * @param cursor
 * @param command
 * @returns
 */
export declare function provideCompletionCommand(context: Context<CompletionContext>, command: Command): void;
//# sourceMappingURL=mcfunctions.d.ts.map