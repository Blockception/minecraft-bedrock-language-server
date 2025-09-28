import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/feature_rule";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { FeatureRule } from "./feature_rule";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): FeatureRule | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.FeatureRule>(doc);

  if (!Internal.FeatureRule.is(imp)) return undefined;

  const description = imp["minecraft:feature_rules"].description;
  const id = description.identifier;
  const feature_used = description.places_feature;

  return {
    id: id,
    documentation: Documentation.getDoc(doc, () => `Feature Rule: ${id}`),
    feature_used: feature_used,
    location: Types.Location.create(uri, content.indexOf(id)),
  };
}
