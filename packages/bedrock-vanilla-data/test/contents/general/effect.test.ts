import { MinecraftData } from '../../../src';

describe('General', () => {
  it('effect', () => {
    expect(MinecraftData.General.Effects).toBeDefined();

    expect(MinecraftData.General.Effects.length).toBeGreaterThan(0);
  });
});
