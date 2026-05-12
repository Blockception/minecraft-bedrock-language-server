import { BehaviorPack, ResourcePack } from 'bc-minecraft-bedrock-project';
import { Context } from '../../../context/context';
import { CompletionBuilder } from '../../builder/builder';
import { CompletionContext } from '../../context';
export declare function provideCompletion(context: Context<CompletionContext>): void;
export declare function generate_bp(pack: BehaviorPack.BehaviorPack, receiver: Pick<CompletionBuilder, 'add'>): void;
export declare function generate_rp(pack: ResourcePack.ResourcePack, receiver: Pick<CompletionBuilder, 'add'>): void;
//# sourceMappingURL=language.d.ts.map