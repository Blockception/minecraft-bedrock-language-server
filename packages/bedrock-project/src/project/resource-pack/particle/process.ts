import { Location } from '@blockception/packages-shared';
import * as Internal from '../../../internal/resource-pack';
import { Documentation, TextDocument } from '../../../types';
import { Particle } from './particle';

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Particle | undefined {
  const imp = TextDocument.toObject(doc, Internal.Particle.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const container = imp.particle_effect;
  const id = container.description.identifier;
  return {
    id: id,
    location: Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Particle: ${id}`),
  };
}
