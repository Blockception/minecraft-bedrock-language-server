import { MCProject } from 'bc-minecraft-project';
import { Manifest } from '../../internal/types';
import { BehaviorPack } from './behavior-pack/behavior-pack';
import { PackType } from './pack-type';
import { ResourcePack } from './resource-pack';
import { Util } from './util';
import { WorldPack } from './world';

const emptyProject = MCProject.createEmpty();
const emptyManifest = {} as Manifest;

describe('Util', () => {
  const bp = new BehaviorPack('c:\\bp', emptyProject, emptyManifest);
  const rp = new ResourcePack('c:\\rp', emptyProject, emptyManifest);
  const wp = new WorldPack('c:\\wp', emptyProject, emptyManifest);

  describe('GetPackType', () => {
    it('returns behavior_pack for a BehaviorPack', () => {
      expect(Util.GetPackType(bp)).toBe(PackType.behavior_pack);
    });

    it('returns resource_pack for a ResourcePack', () => {
      expect(Util.GetPackType(rp)).toBe(PackType.resource_pack);
    });

    it('returns world for a WorldPack', () => {
      expect(Util.GetPackType(wp)).toBe(PackType.world);
    });
  });

  describe('IsResourcePack', () => {
    it('returns true for a ResourcePack', () => {
      expect(Util.IsResourcePack(rp)).toBe(true);
    });

    it('returns false for a BehaviorPack', () => {
      expect(Util.IsResourcePack(bp)).toBe(false);
    });

    it('returns false for a WorldPack', () => {
      expect(Util.IsResourcePack(wp)).toBe(false);
    });
  });

  describe('IsBehaviorPack', () => {
    it('returns true for a BehaviorPack', () => {
      expect(Util.IsBehaviorPack(bp)).toBe(true);
    });

    it('returns false for a ResourcePack', () => {
      expect(Util.IsBehaviorPack(rp)).toBe(false);
    });

    it('returns false for a WorldPack', () => {
      expect(Util.IsBehaviorPack(wp)).toBe(false);
    });
  });

  describe('IsWorldPack', () => {
    it('returns true for a WorldPack', () => {
      expect(Util.IsWorldPack(wp)).toBe(true);
    });

    it('returns false for a BehaviorPack', () => {
      expect(Util.IsWorldPack(bp)).toBe(false);
    });

    it('returns false for a ResourcePack', () => {
      expect(Util.IsWorldPack(rp)).toBe(false);
    });
  });
});
