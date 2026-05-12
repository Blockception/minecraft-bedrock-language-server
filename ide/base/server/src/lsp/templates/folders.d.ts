import { Context } from '../context/context';
import { CommandContext } from '../commands/context';
export interface Folders {
    BehaviorPack(): string;
    ResourcePack(): string;
    WorkSpace(): string;
    WorldFolder(): string;
    GetFolder(command: string): string;
}
export interface EnsureFolders extends Folders {
    Ensure(): Folders;
}
export declare function getFolders(context: Context<CommandContext>): EnsureFolders;
//# sourceMappingURL=folders.d.ts.map