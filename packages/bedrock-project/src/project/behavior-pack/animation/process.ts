import { Types } from "bc-minecraft-bedrock-types";
import { Json } from "../../../internal";
import * as Internal from "../../../internal/behavior-pack";
import { Documentation, TextDocument, Using } from "../../../types";
import { harvestMolang } from "../../molang";
import { Animation } from "./animation";

/** */
export function process(doc: TextDocument): Animation[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.Animations>(doc);

  if (!Internal.Animations.is(imp)) return undefined;
  const container = imp.animations;

  return Object.entries(container)
    .filter(([, anim]) => Internal.Animation.is(anim))
    .map(([id, anim]) => {
      return {
        id: id,
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: harvestMolang(content, anim),
        documentation: Documentation.getDoc(
          doc,
          () => `BP Animation: \`${id}\`, loop: ${anim.loop ?? false}, length: ${anim.animation_length ?? "unknown"}`
        ),
        events: Using.wrap(
          Object.values(anim.timeline ?? {})
            .flatMap((keyframe) => (typeof keyframe == "string" ? [keyframe] : keyframe))
            .filter((entry) => entry.startsWith("@s "))
            .map((entry) => entry.slice(3))
        ),
      };
    });
}
