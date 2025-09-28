import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/biome";
import { Json } from "../../../internal/json";
import { Defined, Documentation, TextDocument } from "../../../types";
import { Biome } from "./biome";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Biome | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const biome = Json.To<Internal.Biome>(doc);

  if (!Internal.Biome.is(biome)) return undefined;

  const id = biome["minecraft:biome"].description.identifier;
  const tagComp = biome["minecraft:biome"]?.components["minecraft:tags"];

  return {
    id: id,
    documentation: Documentation.getDoc(doc, () => `Biome: ${id}`),
    location: Types.Location.create(uri, content.indexOf(id)),
    tags: Defined.wrap(Array.isArray(tagComp) ? tagComp : Array.isArray(tagComp.tags) ? tagComp.tags : []),
  };
}
