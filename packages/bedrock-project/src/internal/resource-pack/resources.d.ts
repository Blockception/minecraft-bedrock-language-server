import { Definition } from 'bc-minecraft-bedrock-shared';
import { MolangSet } from 'bc-minecraft-molang';
import { TextDocument } from '../../types';
interface Resources {
    materials?: Definition;
    geometry?: Definition;
    textures?: Definition;
}
export declare function getUsingResources(receiver: MolangSet, source: Resources, document: TextDocument): void;
export {};
//# sourceMappingURL=resources.d.ts.map