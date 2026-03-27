import { ProjectData, TextDocument } from 'bc-minecraft-bedrock-project';
import { particle_is_defined } from '../../../../src/diagnostics/resource-pack/particle';
import { TestDiagnoser } from '../../../diagnoser';

describe('ResourcePack', () => {
  describe('Particle', () => {
    let diagnoser: TestDiagnoser<TextDocument>;
    let data: ProjectData;

    beforeEach(() => {
      diagnoser = TestDiagnoser.create();
      data = diagnoser.context.getProjectData().projectData;
    });

    it('emits resourcepack.particles.missing when particle is not defined', () => {
      particle_is_defined('test:nonexistent_particle', diagnoser);

      diagnoser.expectAmount(1);
      expect(diagnoser.hasCode('resourcepack.particles.missing')).toBe(true);
    });

    it('does not emit an error when particle is defined', () => {
      data.resourcePacks.packs[0].particles.set({
        id: 'test:my_particle',
        documentation: '',
        location: { position: 0, uri: '' },
      });

      particle_is_defined('test:my_particle', diagnoser);

      diagnoser.expectEmpty();
    });

    it('does not emit behaviorpack.animations.missing for missing particles', () => {
      particle_is_defined('test:nonexistent_particle', diagnoser);

      expect(diagnoser.hasCode('behaviorpack.animations.missing')).toBe(false);
    });
  });
});
