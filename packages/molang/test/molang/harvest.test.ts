import { MolangSet } from '../../src/molang';
import { valid_syntaxes } from '../data/dataset-valid';
import { VanillaPlayer } from '../vanilla-player';

describe('MolangSet - harvest', () => {
  test.each(valid_syntaxes)(
    '%#. %s',
    (synt) => {
      const data = toMolangSet(synt);
      expect(data).toMatchSnapshot();
    },
    1000,
  );

  test('vanilla-player', () => {
    const data = toMolangSetFrom(VanillaPlayer.DataObject, VanillaPlayer.Data);
    expect(data).toMatchSnapshot();
  }, 1000);
});

function toMolangSet(molangs: string) {
  const data = {
    scripts: {
      pre_animation: [molangs],
    },
  };

  const text = JSON.stringify(data, null, 2);
  const set = new MolangSet();
  set.harvest(data, text);
  return set;
}

function toMolangSetFrom(object: object, text: string) {
  const set = new MolangSet();
  set.harvest(object, text);
  return set;
}
