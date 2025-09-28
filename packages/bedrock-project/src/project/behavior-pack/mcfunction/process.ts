import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";
import { TextDocument } from "../../../types";
import { Function } from "./function";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Function | undefined {
  const uri = doc.uri;
  if (uri.endsWith(".json")) return undefined;

  let index = uri.indexOf("functions");

  if (index < 0) return undefined;
  index += 10;

  let id = uri.substring(index, uri.length).replace(/\\/g, "/");
  id = id.replace(".mcfunction", "");

  if (id.includes(" ") || id.includes("\t")) {
    id = `"${id}"`;
  }

  return {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Mcfunction: ${id}`),
  };
}
