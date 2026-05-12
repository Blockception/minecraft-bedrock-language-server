"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = require("../../../../src/diagnostics/resource-pack/particle");
const diagnoser_1 = require("../../../diagnoser");
describe('ResourcePack', () => {
    describe('Particle', () => {
        let diagnoser;
        let data;
        beforeEach(() => {
            diagnoser = diagnoser_1.TestDiagnoser.create();
            data = diagnoser.context.getProjectData().projectData;
        });
        it('emits resourcepack.particles.missing when particle is not defined', () => {
            (0, particle_1.particle_is_defined)('test:nonexistent_particle', diagnoser);
            diagnoser.expectAmount(1);
            expect(diagnoser.hasCode('resourcepack.particles.missing')).toBe(true);
        });
        it('does not emit an error when particle is defined', () => {
            data.resourcePacks.packs[0].particles.set({
                id: 'test:my_particle',
                documentation: '',
                location: { position: 0, uri: '' },
            });
            (0, particle_1.particle_is_defined)('test:my_particle', diagnoser);
            diagnoser.expectEmpty();
        });
        it('does not emit behaviorpack.animations.missing for missing particles', () => {
            (0, particle_1.particle_is_defined)('test:nonexistent_particle', diagnoser);
            expect(diagnoser.hasCode('behaviorpack.animations.missing')).toBe(false);
        });
    });
});
//# sourceMappingURL=particle.test.js.map