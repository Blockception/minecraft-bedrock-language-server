import { Pack, TextDocument } from "bc-minecraft-bedrock-project";
import { DiagnoserContext } from "./diagnoser-context";
import { MCIgnore } from "bc-minecraft-project";
/**The object that is responsible for diagnosing minecraft bedrock files*/
export declare class Diagnoser<T extends TextDocument = TextDocument> {
    /**The context needed to perform diagnostics*/
    readonly context: DiagnoserContext<T>;
    /**Create a new instance of Diagnoser
     * @param context The context needed to perform diagnostics*/
    constructor(context: DiagnoserContext<T>);
    /** process and diagnoses the given document
     * @param doc The textdocument to process or the uri to the document
     * @returns `true` or `false` if the diagnostics was successfully*/
    process(doc: T | string): boolean;
    /**Diagnoses the entire given folder
     * @param folder The folder to retrieve files of
     * @param ignores The pattern to ignore on files*/
    processFolder(folder: string, ignores: MCIgnore): boolean;
    /**process the entire given pack
     * @param pack The pack to process
     * @returns True or false is something was processed*/
    processPack(pack: Pack): boolean;
}
