import * as internal from "../../../internal/resource-pack/model";
import { Json } from "../../../internal/json";
import { Types } from "bc-minecraft-bedrock-types";
import { Defined, TextDocument } from "../../../types";
import { Model } from "./model";
import { Documentation } from "../../../types";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Model[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.Model>(doc);

  if (!internal.Model.is(imp)) return undefined;

  const entries: [string, internal.ModelLegacySpec][] = Object.entries(imp).filter(
    ([key, value]) => key.startsWith("geometry.") && internal.ModelLegacySpec.is(value)
  );

  const modern = imp["minecraft:geometry"];
  if (Array.isArray(modern)) {
    modern.forEach((m) => entries.push([m.description.identifier, m]));
  }

  return entries.map(([key, model]) => {
    return createModel({
      id: key,
      documentation: Documentation.getDoc(doc, () => `Model: ${key}`),
      location: Types.Location.create(uri, content.indexOf(key)),
      root_bone_uses_binding: typeof model.bones[0].binding == "string" ? true : false,
      bones: Defined.wrap(
        model.bones.map((bone) => bone.name).filter((name) => typeof name === "string" && name !== "")
      ),
      locators: Defined.wrap(
        model.bones
          .map((bone) => bone.locators)
          .filter((locators) => locators !== undefined)
          .flatMap((locators) => Object.keys(locators))
      ),
    });
  });
}

function createModel(current: Model): Model {
  // Might be inheriting another geometry, thus split it and return
  const keys = current.id.includes(":geometry") ? current.id.split(":geometry")[0] : current.id;

  return {
    ...current,
    id: keys,
  };
}
