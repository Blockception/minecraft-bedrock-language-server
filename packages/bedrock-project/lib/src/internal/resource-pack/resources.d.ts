import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang";
import { TextDocument } from "../../types";
interface Resources {
    materials?: Types.Definition;
    geometry?: Types.Definition;
    textures?: Types.Definition;
}
export declare function getUsingResources(receiver: MolangSet, source: Resources, document: TextDocument): void;
export {};
