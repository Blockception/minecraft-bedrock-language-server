import { Context } from '../../context/context';
import { TemplateBuilder } from '../../templates/builder';
import { Folders } from '../../templates/folders';
import { CommandContext } from '../context';
export declare function create_world_project(context: Context<CommandContext>, id: string, folders: Folders, builder: TemplateBuilder): Promise<void>;
/**
 *
 * @param id
 * @param context
 * @param builder
 */
export declare function create_behaviorpack(context: Context<CommandContext>, id: string, folders: Folders, builder: TemplateBuilder): Promise<void>;
/**
 *
 * @param id
 * @param folders
 * @param builder
 */
export declare function create_resourcepack(context: Context<CommandContext>, id: string, folders: Folders, builder: TemplateBuilder): Promise<void>;
//# sourceMappingURL=project.d.ts.map