import { BehaviorPack, ResourcePack } from 'bc-minecraft-bedrock-project';
import { Context } from '../../context/context';
import { TextDocument } from '../../documents/text-document';
import { CommandContext } from '../context';
export declare function addAllItems(context: Context<CommandContext>): Promise<void>;
export declare function generate_bp(pack: BehaviorPack.BehaviorPack, builder: ITextEditBuilder): void;
export declare function generate_rp(pack: ResourcePack.ResourcePack, builder: ITextEditBuilder): void;
export declare function generate_wp(): void;
export interface ITextEditBuilder {
    Add(Key: string, Value: string, Comment: string | undefined): void;
}
export declare class TextEditBuilder implements ITextEditBuilder {
    out: string;
    readonly textdoc: string;
    constructor(doc: TextDocument | undefined);
    Add(Key: string, Value: string, Comment?: string | undefined): void;
}
//# sourceMappingURL=language.d.ts.map