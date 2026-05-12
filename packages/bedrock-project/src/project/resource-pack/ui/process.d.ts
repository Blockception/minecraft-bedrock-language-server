import { TextDocument } from '../../../types';
import { UIElement } from './ui-element';
/**
 * Processes a UI definition document and extracts all UI element identifiers,
 * variables, bindings, and inheritance references.
 * @param doc The text document to process
 * @returns An array of UI elements or undefined if the document is not a valid UI file
 */
export declare function process(doc: TextDocument): UIElement[] | undefined;
//# sourceMappingURL=process.d.ts.map