import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";
import { TextDocument } from "../../../types";
import { LootTable } from "./loot-table";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): LootTable | undefined {
  const uri = doc.uri;
  const index = uri.indexOf("loot_tables");

  if (index < 0) return undefined;

  const id = uri.substring(index, uri.length).replace(/\\/g, "/");

  return {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Loot table: ${id}`),
  };
}
