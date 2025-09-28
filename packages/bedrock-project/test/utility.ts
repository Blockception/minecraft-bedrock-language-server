import { readFileSync } from "fs";
import { Documents, TextDocument } from '../src/types';

export class TextProjectContext implements Documents<TextDocument> {
  getDocument(uri: string): TextDocument {
    return {
      getText: () => readFileSync(uri).toString(),
      uri: uri,
    };
  }

  getFiles(): string[] {
    return [];
  }
}
