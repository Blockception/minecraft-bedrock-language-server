import { ModeHandler } from 'bc-minecraft-bedrock-types/src/modes/mode-handler';
import { CompletionItemKind } from 'vscode-languageserver';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 */
export declare function provideCompletion(mode: string, context: Context<CompletionContext>): void;
/**
 * Provide completion for the given mode
 * @param mode The mode to provide completion for
 * @param context The context to provide completion in
 * @param kind The kind of completion item to provide
 */
export declare function provideModeCompletion(mode: ModeHandler | undefined, context: Context<CompletionContext>, kind?: CompletionItemKind): void;
export declare function provideModeCompletionTest(mode: ModeHandler | undefined, context: Context<CompletionContext>, kind?: CompletionItemKind): void;
//# sourceMappingURL=modes.d.ts.map