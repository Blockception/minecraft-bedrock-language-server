import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { TextDocument } from "../../types";
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param content The text to check where the molang is, if no obj is given then we parse the textdocument as JSON
 */
export declare function harvestMolang(content: string): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param content The text to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export declare function harvestMolang(content: string, obj: object): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param doc The TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export declare function harvestMolang(doc: TextDocument): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param doc The TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export declare function harvestMolang(doc: TextDocument, obj: object): MolangSet;
