import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/feature";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { Feature } from "./feature";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Feature | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Feature>(doc);

  if (!Internal.Feature.is(imp)) return undefined;

  const key = Object.keys(imp).find((x) => !x.startsWith("format_version"));
  if (key === undefined) return;
  const container = imp[key as keyof Internal.Feature];
  if (container === undefined || typeof container === "string") return;
  const id = container.description.identifier;

  return {
    id: id,
    documentation: Documentation.getDoc(doc, () => `Feature: ${id}`),
    location: Types.Location.create(uri, content.indexOf(id)),
    type: key,
  };
}
