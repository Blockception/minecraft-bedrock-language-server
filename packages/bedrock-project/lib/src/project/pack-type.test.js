"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pack_type_1 = require("./pack-type");
describe("PackType", () => {
    const data = [
        { path: "F:/Temp2/1. Behavior Pack/manifest.json", type: pack_type_1.PackType.behavior_pack },
        { path: "F:/Temp2/2. Resource Pack/manifest.json", type: pack_type_1.PackType.resource_pack },
        { path: "F:/Temp2/skin_pack/skins.json", type: pack_type_1.PackType.skin_pack },
        { path: "F:/Temp2/world_template/behavior_packs/EW-Bp/manifest.json", type: pack_type_1.PackType.behavior_pack },
        { path: "F:/Temp2/world_template/behavior_packs/EW-BP/manifest.json", type: pack_type_1.PackType.behavior_pack },
        { path: "F:/Temp2/world_template/manifest.json", type: pack_type_1.PackType.world },
        { path: "F:/Temp2/world_template/resource_packs/EW-Rp/manifest.json", type: pack_type_1.PackType.resource_pack },
        { path: "F:/Temp2/world_template/resource_packs/EW-RP/manifest.json", type: pack_type_1.PackType.resource_pack },
        { path: "F:/Temp2/world/behavior_packs/EW-bp/manifest.json", type: pack_type_1.PackType.behavior_pack },
        { path: "F:/Temp2/world/behavior_packs/EW-BP/manifest.json", type: pack_type_1.PackType.behavior_pack },
        { path: "F:/Temp2/world/db/000005.ldb", type: pack_type_1.PackType.world },
        { path: "F:/Temp2/world/manifest.json", type: pack_type_1.PackType.world },
        { path: "F:/Temp2/world/resource_packs/EW-rp/manifest.json", type: pack_type_1.PackType.resource_pack },
        { path: "F:/Temp2/world/resource_packs/EW-RP/manifest.json", type: pack_type_1.PackType.resource_pack },
        { path: "F:/Temp2/wp/db/000006.log", type: pack_type_1.PackType.world },
    ];
    data.forEach((item) => {
        it(`${item.type} Should be returned by "${item.path}"`, () => {
            const normal = path_1.default.normalize(item.path);
            const t = pack_type_1.PackType.detect(normal);
            expect(t).toEqual(item.type);
        });
    });
});
//# sourceMappingURL=pack-type.test.js.map