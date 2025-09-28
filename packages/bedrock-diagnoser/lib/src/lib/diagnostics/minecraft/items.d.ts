import { TextDocument } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
interface Item extends Types.OffsetWord {
    data?: number;
}
export declare function minecraft_get_item(value: string, doc: TextDocument): Item;
export {};
