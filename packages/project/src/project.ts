import * as path from "path";
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
export namespace MCProject {
  /**Creates an empty version of the MCProject
   * @returns*/
  export function createEmpty(): MCProject {
    return {
      attributes: MCAttributes.createEmpty(),
      definitions: MCDefinition.createEmpty(),
      ignores: MCIgnore.createEmpty(),
    };
  }

  /**Checks wheter or not the given object implements MCProject
   * @param value The object to inspect
   * @returns Whether or not the given object implements MCProject*/
  export function is(value: any): value is MCProject {
    if (value) {
      if (!(value.ignores && MCIgnore.is(value.ignores))) return false;
      if (!(value.attributes && typeof value.attributes === "object")) return false;
      if (!(value.definitions && typeof value.definitions === "object")) return false;

      return true;
    }

    return false;
  }

  /**Loads from the given root folder the necessary project files
   * @param Source The root folder to retrieve files from
   * @returns*/
  export function loadSync(Source: string): MCProject {
    const attributes = MCAttributes.loadSync(path.join(Source, MCAttributes.filename));
    const definitions = MCDefinition.loadSync(path.join(Source, MCDefinition.filename));
    const ignores = MCIgnore.loadSync(path.join(Source, MCIgnore.filename));

    return { attributes, definitions, ignores };
  }

  /**Loads from the given root folder the necessary project files
   * @param Source The root folder to retrieve files from*/
  export function load(Source: string): Promise<MCProject> {
    return new Promise((resolve) => resolve(loadSync(Source)));
  }

  /**Saves the gives project into the specified folder
   * @param FolderThe folder to the save the data into
   * @param project The data to save*/
  export function saveSync(Folder: string, project: MCProject): void {
    MCAttributes.saveSync(project.attributes, path.join(Folder, MCAttributes.filename));
    MCIgnore.saveSync(project.ignores, path.join(Folder, MCIgnore.filename));
    MCDefinition.saveSync(project.definitions, path.join(Folder, MCDefinition.filename));
  }

  /**Saves the gives project into the specified folder
   * @param FolderThe folder to the save the data into
   * @param project The data to save
   * @returns A promise that is done wheter the data has been written*/
  export async function save(Folder: string, project: MCProject): Promise<void[]> {
    const P: Promise<void>[] = [
      MCAttributes.save(project.attributes, path.join(Folder, MCAttributes.filename)),
      MCIgnore.save(project.ignores, path.join(Folder, MCIgnore.filename)),
      MCDefinition.save(project.definitions, path.join(Folder, MCDefinition.filename)),
    ];

    return Promise.all(P);
  }
}
