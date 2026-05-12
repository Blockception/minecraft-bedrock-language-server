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
export declare function createParticle(): Particle;
/**
 * Convert JSON document to Particle objects
 */
export declare function convertParticle(doc: object, receiver: Particle[]): void;
//# sourceMappingURL=particle.d.ts.map