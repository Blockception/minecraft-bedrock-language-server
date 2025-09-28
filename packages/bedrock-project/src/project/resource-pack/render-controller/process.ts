import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/resource-pack/render-controller";
import { Documentation, TextDocument } from "../../../types";
import { harvestMolang } from "../../molang";
import { RenderController } from "./render-controller";

/** */
export function process(doc: TextDocument): RenderController[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.RenderControllers.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();

  return Object.entries(imp.render_controllers).map(([id, controller]) => {
    return {
      id: id,
      location: Types.Location.create(uri, content.indexOf(id)),
      molang: harvestMolang(content, controller),
      documentation: Documentation.getDoc(doc, () => `Render Controller: \`${id}\``),
    };
  });
}
