import path from 'path';
import { PackType } from './pack-type';

describe("PackType", () => {
  const data: { path: string; type: PackType }[] = [
    { path: "F:/Temp2/1. Behavior Pack/manifest.json", type: PackType.behavior_pack },
    { path: "F:/Temp2/2. Resource Pack/manifest.json", type: PackType.resource_pack },
    { path: "F:/Temp2/skin_pack/skins.json", type: PackType.skin_pack },
    { path: "F:/Temp2/world_template/behavior_packs/EW-Bp/manifest.json", type: PackType.behavior_pack },
    { path: "F:/Temp2/world_template/behavior_packs/EW-BP/manifest.json", type: PackType.behavior_pack },
    { path: "F:/Temp2/world_template/manifest.json", type: PackType.world },
    { path: "F:/Temp2/world_template/resource_packs/EW-Rp/manifest.json", type: PackType.resource_pack },
    { path: "F:/Temp2/world_template/resource_packs/EW-RP/manifest.json", type: PackType.resource_pack },
    { path: "F:/Temp2/world/behavior_packs/EW-bp/manifest.json", type: PackType.behavior_pack },
    { path: "F:/Temp2/world/behavior_packs/EW-BP/manifest.json", type: PackType.behavior_pack },
    { path: "F:/Temp2/world/db/000005.ldb", type: PackType.world },
    { path: "F:/Temp2/world/manifest.json", type: PackType.world },
    { path: "F:/Temp2/world/resource_packs/EW-rp/manifest.json", type: PackType.resource_pack },
    { path: "F:/Temp2/world/resource_packs/EW-RP/manifest.json", type: PackType.resource_pack },
    { path: "F:/Temp2/wp/db/000006.log", type: PackType.world },
  ];

  data.forEach((item) => {
    it(`${item.type} Should be returned by "${item.path}"`, () => {
      const normal = path.normalize(item.path);
      const t = PackType.detect(normal);
      expect(t).toEqual(item.type);
    });
  });
});
