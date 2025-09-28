import * as Internal from "../../../internal/behavior-pack/recipe";
import { Json } from "../../../internal/json";
import { Types } from "bc-minecraft-bedrock-types";
import { Documentation } from "../../../types";
import { TextDocument } from "../../../types";
import { Recipe } from "./recipe";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Recipe | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Recipe>(doc);

  if (!Internal.Recipe.is(imp)) return undefined;

  const key = Object.keys(imp).find((x) => !x.startsWith("format_version"));
  if (key === undefined) return;
  const container = imp[key as keyof Internal.Recipe];
  if (container === undefined || typeof container === "string") return;
  const id = container.description.identifier;

  return {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Recipe: ${id}`),
  };
}
