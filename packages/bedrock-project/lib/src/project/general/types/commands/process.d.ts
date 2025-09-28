import { TextDocument } from "../../../../types";
import { GeneralCollection } from "../../general";
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export declare function ProcessMcFunction(doc: TextDocument, receiver: GeneralCollection): void;
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export declare function ProcessAnimationCommands(doc: TextDocument, receiver: GeneralCollection): void;
/**
 *
 * @param doc
 * @param edu
 * @param receiver
 */
export declare function ProcessAnimationControllerCommands(doc: TextDocument, receiver: GeneralCollection): void;
export declare function processEntityCommands(doc: TextDocument, receiver: GeneralCollection): void;
/**
 *
 * @param line
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
export declare function ProcessCommand(line: string, doc: TextDocument, receiver: GeneralCollection): void;
/**
 *
 * @param line
 * @param offset
 * @param doc
 * @param edu
 * @param receiver
 * @returns
 */
export declare function ProcessCommandAt(line: string, offset: number, doc: TextDocument, receiver: GeneralCollection): void;
