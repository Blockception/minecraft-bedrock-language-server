import { Context } from '../../context/context';
import { CompletionBuilder } from '../builder/builder';
import { CommandCompletionContext } from '../context';
export declare function provideCompletion(context: Context<CommandCompletionContext>): void;
export declare function provideRangeCompletion(context: CommandCompletionContext): void;
export declare function provideCreateCompletion(receiver: CompletionBuilder, minimum?: number, maximum?: number): void;
//# sourceMappingURL=integer.d.ts.map