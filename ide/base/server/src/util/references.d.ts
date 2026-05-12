import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { Location } from 'vscode-languageserver';
import { IDocumentManager } from '../lsp/documents/manager';
export declare namespace References {
    /**
     * Converts the given locations or references into resolved locations
     * @param items The items to check or filter or convert
     * @param documents The documents manager to use to lookup documents, and potentially use to lookup references
     * @returns A list of locations
     */
    function convertLocation(items: ((Locatable & Identifiable) | Location | undefined)[], documents: IDocumentManager): Location[];
}
//# sourceMappingURL=references.d.ts.map