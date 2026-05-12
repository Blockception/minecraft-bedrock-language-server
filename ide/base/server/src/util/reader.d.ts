import { TextDocument } from '../lsp/documents/text-document';
/**
 *
 */
export declare class DocumentReader {
    /** */
    doc: TextDocument;
    /** */
    index: number;
    /**
     *
     * @param doc
     */
    constructor(doc: TextDocument);
    /** */
    ReadLine(): string;
    /**returns true or false if the reader is at the end*/
    IsDone(): boolean;
    /**returns true or false if the reader is not yet at the end*/
    IsReading(): boolean;
}
//# sourceMappingURL=reader.d.ts.map