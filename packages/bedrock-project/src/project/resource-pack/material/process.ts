import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal/json";
import * as internal from "../../../internal/resource-pack/material";
import { Documentation, TextDocument } from "../../../types";
import { Material } from "./material";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Material[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Material>(doc);

  if (!internal.Material.is(imp)) return undefined;

  return Object.entries(imp)
    .filter(([key]) => key !== "format_version")
    .map(([key]) => {
      return {
        id: key,
        location: Types.Location.create(uri, content.indexOf(key)),
        documentation: Documentation.getDoc(doc, () => `Material: ${key}`),
      };
    });
}
