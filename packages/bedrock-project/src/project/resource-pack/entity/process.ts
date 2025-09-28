import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/resource-pack";
import { Documentation, TextDocument } from "../../../types";
import { References } from "../../../types/references";
import { harvestMolang } from "../../molang";
import { Entity } from "./entity";
import { getUsingResources } from "../../../internal/resource-pack/resources";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Entity | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Entity>(doc);

  if (!Internal.Entity.is(imp)) return undefined;

  const description = imp["minecraft:client_entity"].description;
  const id = description.identifier;
  const out: Entity = {
    id: id,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, description),
    animations: References.wrap(
      description.animation_controllers
        ?.flatMap((item) => (typeof item === "string" ? item : Object.getOwnPropertyNames(item)[0]))
        .filter((item) => item !== undefined),
      undefined
    ),
    documentation: Documentation.getDoc(doc, () => `Entity: ${id}`),
  };
  getUsingResources(out.molang, imp["minecraft:client_entity"].description, doc);

  //process animations
  Types.Definition.forEach(description.animations, (reference, id) => {
    out.animations.defined.add(reference);
    out.animations.using.add(id);
  });

  return out;
}
