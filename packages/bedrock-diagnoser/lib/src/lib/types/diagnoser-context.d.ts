import { TextDocument } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { DiagnosticsBuilder, DiagnosticsBuilderContent } from "./diagnostics-builder";
/**The context needed for the Diagnoser*/
export interface DiagnoserContext<T extends TextDocument = TextDocument> extends DiagnosticsBuilderContent<T> {
    /**Creates / Get a diagnoser for the specified textdocument and project settings, return undefined if there is an error
     * @param doc The textdocument object to process
     * @param project The project settings related to the textdocument*/
    getDiagnoser(doc: T, project: MCProject): ManagedDiagnosticsBuilder<T> | undefined;
}
/**A interface object for between the Diagnoser and the code users, used to mark off if the diagnoser is done with its work on the document*/
export interface ManagedDiagnosticsBuilder<T extends TextDocument = TextDocument> extends DiagnosticsBuilder<T> {
    /**Marks that this builder is done*/
    done(): void;
}
