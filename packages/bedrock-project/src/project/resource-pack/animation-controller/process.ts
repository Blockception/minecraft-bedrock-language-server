
import { Conditional, Location } from 'bc-minecraft-bedrock-shared';
import { Effect } from '../../../internal/resource-pack';
import * as Internal from '../../../internal/resource-pack/animation-controller';
import { Documentation, TextDocument } from '../../../types';
import { References, Using } from '../../../types/references';
import { harvestMolang } from '../../molang';
import { AnimationController } from './animation-controller';

/** */
export function process(doc: TextDocument): AnimationController[] | undefined {
  const imp = TextDocument.toObject(doc, Internal.AnimationControllers.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const container = imp.animation_controllers;

  return Object.entries(container)
    .filter(([, controller]) => Internal.AnimationController.is(controller))
    .map(([id, controller]) => {
      const item: AnimationController = {
        id: id,
        location: Location.create(uri, content.indexOf(id)),
        molang: harvestMolang(content, controller),
        documentation: Documentation.getDoc(doc, () => `RP Animation Controller: '${id}'`),
        animations: References.create(),
        particles: References.create(),
        sounds: References.create(),
      };

      Object.values(controller.states).map((state) => {
        Conditional.forEach(state.animations, (reference) => item.animations.using.add(reference));

        if (state.particle_effects) harvest(state.particle_effects, item.particles);
        if (state.sound_effects) harvest(state.sound_effects, item.sounds);
      });

      return item;
    })
    .filter((item) => item !== undefined);
}

function harvest(data: Effect[], receiver: Using) {
  Using.add(
    receiver,
    data.map((e) => e.effect).filter((e) => e !== undefined),
  );
}
