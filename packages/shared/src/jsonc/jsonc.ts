import { jsonc } from 'jsonc';

/**
 * Simple text document interface that can be used with JSON parsing.
 * Compatible with vscode-languageserver-textdocument and other text document types.
 */
export interface TextDocument {
  /** The document URI */
  readonly uri: string;
  /**
   * Get the text content of the document
   * @param range Optional range to get text from
   */
  getText(range?: any): string;
}

/**
 * Unified namespace for JSONC parsing operations.
 * Provides utilities for parsing JSON with comments (JSONC) format.
 */
export namespace Json {
  /**
   * Parse JSONC text and cast to the given type.
   * @param doc The document or string to parse
   * @returns The parsed object or undefined if parsing failed
   */
  export function To<T>(doc: TextDocument | string): T | undefined {
    let out: T | undefined = undefined;
    let file = undefined;

    try {
      let content: string;

      if (typeof doc === 'object') {
        file = doc.uri;
        content = doc.getText();
      } else {
        content = doc;
      }

      if (content !== '') {
        out = <T>jsonc.parse(content);
      }
    } catch (err: any) {
      let message = '';

      if (file) {
        message = `Cannot cast file to json: ${file}\n`;
      }

      if (err.message) {
        message += 'message: ' + err.message;
      } else {
        message += JSON.stringify(err);
      }

      console.error(message);
    }

    return out;
  }

  /**
   * Parse JSONC text with optional stripComments option.
   * @param text The text to parse
   * @param options Optional parsing options
   * @returns The parsed object
   */
  export function parse(text: string, options?: { stripComments?: boolean }): any {
    return jsonc.parse(text, options);
  }
}