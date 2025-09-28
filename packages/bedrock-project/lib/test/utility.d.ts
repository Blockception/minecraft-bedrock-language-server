import { Documents, TextDocument } from '../src/types';
export declare class TextProjectContext implements Documents<TextDocument> {
    getDocument(uri: string): TextDocument;
    getFiles(): string[];
}
