import { MCProject } from 'bc-minecraft-project';
import { Settings } from '../lsp/extension';
/**
 *
 * @param folder
 * @returns
 */
export declare function getProject(folder: string, settings: Settings): MCProject;
/**
 *
 * @param folder
 * @returns
 */
export declare function GetProjectAsync(folder: string, settings: Settings): Promise<MCProject>;
/**
 *
 * @returns
 */
export declare function getProjectEmpty(settings: Settings): MCProject;
/**
 *
 * @param project
 * @returns
 */
export declare function overlay(project: MCProject, settings: Settings): MCProject;
//# sourceMappingURL=mcprojects.d.ts.map