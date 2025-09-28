import { MCAttributes } from "./mcattributes";
import { MCDefinition } from "./mcdefinitions";
import { MCIgnore } from "./mcignore";
/**An interface that stored minecraft project data */
export interface MCProject {
    /**The collection of project attributes*/
    attributes: MCAttributes;
    /**The collection of project ignores patterns*/
    ignores: MCIgnore;
    /**The collection of definitions to the project*/
    definitions: MCDefinition;
}
/**The namespace that provides functionality to MCProjects*/
export declare namespace MCProject {
    /**Creates an empty version of the MCProject
     * @returns*/
    function createEmpty(): MCProject;
    /**Checks wheter or not the given object implements MCProject
     * @param value The object to inspect
     * @returns Whether or not the given object implements MCProject*/
    function is(value: any): value is MCProject;
    /**Loads from the given root folder the necessary project files
     * @param Source The root folder to retrieve files from
     * @returns*/
    function loadSync(Source: string): MCProject;
    /**Loads from the given root folder the necessary project files
     * @param Source The root folder to retrieve files from*/
    function load(Source: string): Promise<MCProject>;
    /**Saves the gives project into the specified folder
     * @param FolderThe folder to the save the data into
     * @param project The data to save*/
    function saveSync(Folder: string, project: MCProject): void;
    /**Saves the gives project into the specified folder
     * @param FolderThe folder to the save the data into
     * @param project The data to save
     * @returns A promise that is done wheter the data has been written*/
    function save(Folder: string, project: MCProject): Promise<void[]>;
}
