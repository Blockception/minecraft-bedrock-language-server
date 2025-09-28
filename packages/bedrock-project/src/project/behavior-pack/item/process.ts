import { Types } from "bc-minecraft-bedrock-types";
import * as internal from "../../../internal/behavior-pack/item";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { harvestMolang } from "../../molang";
import { Item } from "./item";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Item | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Item>(doc);

  if (!internal.Item.is(imp)) return undefined;

  const container = imp["minecraft:item"];
  const id = container.description.identifier;

  return {
    id: id,
    isFood: typeof container.components["minecraft:food"] === "object" ? true : false,
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, container),
    documentation: Documentation.getDoc(
      doc,
      () => `BP Item: ${id} ${container.description.category ? "category: " + container.description.category : ""}`
    ),
  };
}
