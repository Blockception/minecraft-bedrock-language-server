import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/behavior-pack";
import { Documentation, TextDocument } from "../../../types";
import { harvestMolang } from "../../molang";
import { Block } from "./block";
import { BlockState } from "./block-state";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Block | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Block>(doc);

  if (!Internal.Block.is(imp)) return undefined;

  const container = imp["minecraft:block"];
  const id = container.description.identifier;

  return {
    id: id,
    documentation: Documentation.getDoc(doc, () => `BP Block: ${id}`),
    location: Types.Location.create(uri, content.indexOf(id)),
    molang: harvestMolang(content, container),
    states: Object.entries(container.description.properties ?? {})
      .map(([prop, values]) => BlockState.create(prop, values))
      .filter((b) => b !== undefined),
  };
}
