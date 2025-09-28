import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/resource-pack";
import { Documentation, TextDocument } from "../../../types";
import { References } from "../../../types/references";
import { harvestMolang } from "../../molang";
import { Attachable } from "./attachable";
import { getUsingResources } from "../../../internal/resource-pack/resources";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Attachable | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Attachable>(doc);

  if (!Internal.Attachable.is(imp)) return undefined;

  const container = imp["minecraft:attachable"];
  const description = container.description;
  const id = description.identifier;
  const out: Attachable = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, container),
    animations: References.wrap(description.animation_controllers, undefined),
    documentation: Documentation.getDoc(doc, () => `Attachable Item: ${id}`),
  };
  getUsingResources(out.molang, imp["minecraft:attachable"].description, doc);

  //process animations
  Types.Definition.forEach(description.animations, (reference, id) => {
    out.animations.defined.add(reference);
    out.animations.using.add(id);
  });

  return out;
}
