import { OffsetWord } from 'bc-vscode-words';
import { Context } from '../../../context/context';
import { CommandCompletionContext } from '../../context';
/**
 *
 * @param context
 * @returns
 */
export declare function provideCompletion(context: Context<CommandCompletionContext>): void;
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export declare function InSelector(selector: OffsetWord, pos: number): boolean;
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export declare function InScore(selector: OffsetWord, pos: number): boolean;
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export declare function InHasProperty(selector: OffsetWord, pos: number): boolean;
/**
 *
 * @param selector
 * @param pos
 * @returns
 */
export declare function InHasItem(selector: OffsetWord, pos: number): boolean;
/**
 *
 * @param text
 * @returns
 */
export declare function IsFakePlayer(text: string): boolean;
//# sourceMappingURL=selector.d.ts.map