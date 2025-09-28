import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/resource-pack";
import { Defined, Documentation, TextDocument } from "../../../types";
import { BlockCulling } from "./culling";

export function process(doc: TextDocument): BlockCulling | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.BlockCulling>(doc);
  if (!Internal.BlockCulling.is(imp)) return undefined;

  const id = imp["minecraft:block_culling_rules"].description.identifier;
  if (typeof id !== "string") return undefined;

  return {
    id: id,
    affected_bones: Defined.wrap(
      imp["minecraft:block_culling_rules"]?.rules?.map((r) => r?.geometry_part?.bone).filter((b) => b !== undefined)
    ),
    location: Types.Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Block culling rule: ${id}`),
  };
}
