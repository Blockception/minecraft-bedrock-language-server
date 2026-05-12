import { Documents, TextDocument } from '../types';
export declare class TextProjectContext implements Documents<TextDocument> {
    getDocument(uri: string): TextDocument;
    getFiles(): string[];
}
//# sourceMappingURL=utility.d.ts.map