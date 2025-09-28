import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../types";
import { Structure } from "./structure";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Structure | undefined {
  const uri = doc.uri;
  let index = uri.indexOf("structures");

  if (index < 0) return undefined;
  index += 11;

  let id = uri.substring(index, uri.length).replace(/\\/g, "/");
  id = id.replace(".mcstructure", "");

  if (id.includes("/")) {
    id = '"' + id + '"';
  }

  return {
    id: id,
    location: Types.Location.create(uri, 0),
    documentation: `McStructure: ${id}`,
  };
}
