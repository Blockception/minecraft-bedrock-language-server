import { MCIgnore } from "bc-minecraft-project";
import { TextDocument } from "./text-document";

/**The context of a project, used to retrieve files*/
export interface Documents<T extends TextDocument> {
  /**Returns a textdocument object or undefined if something went wrong or nothing exists
   * @param uri The document uri to read*/
  getDocument(uri: string): T | undefined;

  /**Returns all files in the given directory and sub directories.
   * @param folder The folder to start the search from
   * @param patterns The glob patterns that need to match
  //  * @param ignores The project settings for ignores or includes*/
  getFiles(folder: string, patterns: string[], ignores: MCIgnore): string[];
}
