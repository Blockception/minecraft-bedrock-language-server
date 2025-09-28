import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";
import { TextDocument } from "../../../types";
import { Trading } from "./trading";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Trading | undefined {
  const uri = doc.uri;
  const index = uri.indexOf("trading");

  if (index < 0) return undefined;
  const id = uri.substring(index, uri.length).replace(/\\/g, "/");

  return {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Trading table: ${id}`),
  };
}
