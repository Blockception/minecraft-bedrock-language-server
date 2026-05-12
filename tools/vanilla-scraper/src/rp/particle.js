"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticle = createParticle;
exports.convertParticle = convertParticle;
/**
 * Create a new Particle
 */
function createParticle() {
    return {
        id: '',
    };
}
/**
 * Convert JSON document to Particle objects
 */
function convertParticle(doc, receiver) {
    const root = doc;
    const particleEffect = root['particle_effect'];
    if (!particleEffect)
        return;
    const desc = particleEffect['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id)
        return;
    const out = createParticle();
    out.id = id;
    receiver.push(out);
}
//# sourceMappingURL=particle.js.map