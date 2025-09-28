import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/resource-pack";
import { Documentation, TextDocument } from "../../../types";
import { Using } from "../../../types/references";
import { harvestMolang } from "../../molang";
import { Animation } from "./animation";

/** */
export function process(doc: TextDocument): Animation[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.Animations.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const out: Animation[] = [];
  const container = imp.animations;
  const keys = Object.getOwnPropertyNames(container);

  for (let I = 0; I < keys.length; I++) {
    const id = keys[I];
    const anim = container[id];
    if (!Internal.Animation.is(anim)) continue;

    const item: Animation = {
      id: id,
      location: Types.Location.create(uri, content.indexOf(id)),
      molang: harvestMolang(content, anim),
      documentation: Documentation.getDoc(
        doc,
        () => `RP Animation: '${id}', loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`
      ),
      particles: Using.wrap(
        Object.values(anim.particle_effects ?? {})
          .filter((e) => e !== undefined)
          .flatMap((e) => (Array.isArray(e) ? e : [e]))
          .map((e) => e?.effect)
          .filter((e) => e !== undefined)
      ),
      sounds: Using.wrap(
        Object.values(anim.sound_effects ?? {})
          .filter((e) => e !== undefined)
          .flatMap((e) => (Array.isArray(e) ? e : [e]))
          .map((value) => value.effect)
          .filter((e) => e !== undefined)
      ),
    };
    out.push(item);
  }

  return out;
}
