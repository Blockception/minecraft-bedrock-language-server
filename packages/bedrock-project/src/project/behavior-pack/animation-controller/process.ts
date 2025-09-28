import { Types } from "bc-minecraft-bedrock-types";
import * as Internal from "../../../internal/behavior-pack/animation-controller";
import { Json } from "../../../internal/json";
import { Documentation, TextDocument } from "../../../types";
import { References, Using } from "../../../types/references";
import { harvestMolang } from "../../molang";
import { AnimationController } from "./animation-controller";

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): AnimationController[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.AnimationControllers>(doc);

  if (!Internal.AnimationControllers.is(imp)) return undefined;

  return Object.entries(imp.animation_controllers)
    .filter(([, controller]) => Internal.AnimationController.is(controller))
    .map(([id, controller]) => {
      const item: AnimationController = {
        id: id,
        animations: References.create(),
        documentation: Documentation.getDoc(doc, () => `BP Animation Controller: ${id}`),
        events: Using.create(),
        location: Types.Location.create(uri, content.indexOf(id)),
        molang: harvestMolang(content, controller),
      };

      Object.values(controller.states).forEach((state) => {
        Types.Conditional.forEach(state.animations, (reference) => item.animations.using.add(reference));

        Using.add(
          item.events,
          state.on_entry?.filter((entry) => entry.startsWith("@s ")).map((entry) => entry.slice(3))
        );
        Using.add(
          item.events,
          state.on_exit?.filter((entry) => entry.startsWith("@s ")).map((entry) => entry.slice(3))
        );
      });

      return item;
    });
}
