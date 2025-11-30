import { IIdentifier } from '../interfaces';

/**
 * Particle data from resource packs
 */
export interface Particle extends IIdentifier {
  id: string;
}

/**
 * Create a new Particle
 */
export function createParticle(): Particle {
  return {
    id: '',
  };
}

/**
 * Convert JSON document to Particle objects
 */
export function convertParticle(doc: object, receiver: Particle[]): void {
  const root = doc as Record<string, unknown>;
  const particleEffect = root['particle_effect'] as Record<string, unknown>;
  if (!particleEffect) return;

  const desc = particleEffect['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id) return;

  const out = createParticle();
  out.id = id;
  receiver.push(out);
}
