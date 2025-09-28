import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { TextDocument } from "../../types";

/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param content The text to check where the molang is, if no obj is given then we parse the textdocument as JSON
 */
export function harvestMolang(content: string): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param content The text to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export function harvestMolang(content: string, obj: object): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param doc The TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export function harvestMolang(doc: TextDocument): MolangSet;
/**
 * Converts the given content to JSON and harvests all the molang statements
 * @param doc The TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 */
export function harvestMolang(doc: TextDocument, obj: object): MolangSet;

/**
 * Harvests all the possible molang data, but clears the cache afterwards
 * @param docOrStr The text or TextDocument to check where the molang is, if no obj is given then we parse the textdocument as JSON
 * @param obj The optional obj to walk into, will harvest all string
 * @returns
 */
export function harvestMolang(docOrStr: TextDocument | string, obj?: object): MolangSet {
  if (typeof docOrStr !== "string") docOrStr = docOrStr.getText();

  const objSet = obj ?? JSON.parse(docOrStr);
  const set = new MolangSet();
  try {
    set.harvest(objSet, docOrStr);
  } catch (err) {
    console.warn(
      "received an error during molang parsing during harvesting of molang data, skipping report to let it be handled by the diagnoser",
      err
    );
  } finally {
    set.cache.clear();
  }

  return set;
}
