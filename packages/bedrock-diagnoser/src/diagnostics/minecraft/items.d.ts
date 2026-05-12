import { TextDocument } from 'bc-minecraft-bedrock-project';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
interface Item extends OffsetWord {
    data?: number;
}
export declare function minecraft_get_item(value: string, doc: TextDocument): Item;
export {};
//# sourceMappingURL=items.d.ts.map