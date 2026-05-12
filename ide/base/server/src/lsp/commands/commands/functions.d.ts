import { Context } from '../../context/context';
import { EnsureFolders } from '../../templates/folders';
import { CommandContext } from '../context';
export type CreateFn = (context: Context<CommandContext>, folders: EnsureFolders) => Promise<boolean | void>;
/**Executes the given creation command */
export declare function createCommand(callback: CreateFn): (context: Context<CommandContext>) => Promise<void>;
export declare function mustExecute(commandId: string, context: Context<CommandContext>, folder?: string | undefined, attributes?: Record<string, string>): Promise<boolean>;
//# sourceMappingURL=functions.d.ts.map