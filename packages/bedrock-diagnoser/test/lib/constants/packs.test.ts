import { PackType } from 'bc-minecraft-bedrock-project';
import { packTypeToString } from '../../../src/constants/packs';

describe('packs', () => {
  describe('packTypeToString', () => {
    it('returns "resourcepack" for resource_pack', () => {
      expect(packTypeToString(PackType.resource_pack)).toBe('resourcepack');
    });

    it('returns "behaviorpack" for behavior_pack', () => {
      expect(packTypeToString(PackType.behavior_pack)).toBe('behaviorpack');
    });

    it('returns "skinpack" for skin_pack', () => {
      expect(packTypeToString(PackType.skin_pack)).toBe('skinpack');
    });

    it('returns "world" for world', () => {
      expect(packTypeToString(PackType.world)).toBe('world');
    });

    it('returns "unknown" for unknown', () => {
      expect(packTypeToString(PackType.unknown)).toBe('unknown');
    });
  });
});
