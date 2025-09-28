import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "./text-document";
/** */
export declare namespace Documentation {
    /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
     * @param receiver The receiving object
     * @param doc The text document to read from
     * @param ifDefault The default text is nothing is found in the document*/
    function setDoc(receiver: Types.Documentated, doc: TextDocument, ifDefault?: string | (() => string) | undefined): void;
    /**Retrieves the comment from the first line or uses the given default to generate a default line of documentation
     * @param doc The text document to read from
     * @param ifDefault The default text is nothing is found in the document*/
    function getDoc(doc: TextDocument, ifDefault?: string | (() => string) | undefined, offset?: number): string | undefined;
}
