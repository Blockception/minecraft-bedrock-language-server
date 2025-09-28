import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal/json";
import * as internal from "../../../internal/resource-pack/sound-definitions";
import { Documentation, TextDocument } from "../../../types";
import { Sound } from "./sound";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Sound[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.SoundDefinitions>(doc);

  if (!internal.SoundDefinitions.is(imp)) return undefined;

  return Object.entries(imp.sound_definitions).map(([key, value]) => {
    return {
      id: key,
      location: Types.Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Sound: ${key} with ${value.sounds?.length ?? 0} sounds`),
    };
  });
}
