"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const file_type_1 = require("./file-type");
describe("RP Filetype", () => {
    describe("Detect", () => {
        const DetectTests = [
            { file: "F:\\Example-rp\\animation_controllers\\example.controller.json", type: file_type_1.FileType.animation_controller },
            { file: "F:\\Example-rp\\animations\\example.animation.json", type: file_type_1.FileType.animation },
            { file: "F:\\Example-rp\\attachables\\example.json", type: file_type_1.FileType.attachable },
            { file: "F:\\Example-rp\\entity\\pig.entity.json", type: file_type_1.FileType.entity },
            { file: "F:\\Example-rp\\models\\pig.geo.json", type: file_type_1.FileType.model },
            { file: "F:\\Example-rp\\models\\entities\\pig.geo.json", type: file_type_1.FileType.model },
            { file: "F:\\Example-rp\\particles\\example.particle.json", type: file_type_1.FileType.particle },
            { file: "F:\\Example-rp\\render_controllers\\example.controller.json", type: file_type_1.FileType.render_controller },
            { file: "F:\\Example-rp\\textures\\entities\\custom\\pig.png", type: file_type_1.FileType.texture },
            { file: "F:\\Example-rp\\biomes_client.json", type: file_type_1.FileType.biomes_client },
            { file: "F:\\Example-rp\\blocks.json", type: file_type_1.FileType.block },
            { file: "F:\\Example-rp\\textures\\flipbook_textures.json", type: file_type_1.FileType.texture_flipbook_atlas },
            { file: "F:\\Example-rp\\textures\\item_texture.json", type: file_type_1.FileType.texture_item_atlas },
            { file: "F:\\Example-rp\\manifest.json", type: file_type_1.FileType.manifest },
            { file: "F:\\Example-rp\\sounds\\music_definitions.json", type: file_type_1.FileType.music_definitions },
            { file: "F:\\Example-rp\\sounds\\sound_definitions.json", type: file_type_1.FileType.sounds_definitions },
            { file: "F:\\Example-rp\\sounds.json", type: file_type_1.FileType.sounds },
            { file: "F:\\Example-rp\\textures\\terrain_texture.json", type: file_type_1.FileType.texture_terrain_atlas },
            { file: "F:\\Example\\animation_controllers\\example.controller.json", type: file_type_1.FileType.animation_controller },
            { file: "F:\\Example\\animations\\example.animation.json", type: file_type_1.FileType.animation },
            { file: "F:\\Example\\attachables\\example.json", type: file_type_1.FileType.attachable },
            { file: "F:\\Example\\entity\\pig.entity.json", type: file_type_1.FileType.entity },
            { file: "F:\\Example\\models\\pig.geo.json", type: file_type_1.FileType.model },
            { file: "F:\\Example\\models\\entities\\pig.geo.json", type: file_type_1.FileType.model },
            { file: "F:\\Example\\particles\\example.particle.json", type: file_type_1.FileType.particle },
            { file: "F:\\Example\\render_controllers\\example.controller.json", type: file_type_1.FileType.render_controller },
            { file: "F:\\Example\\textures\\entities\\custom\\pig.png", type: file_type_1.FileType.texture },
            { file: "F:\\Example\\biomes_client.json", type: file_type_1.FileType.biomes_client },
            { file: "F:\\Example\\blocks.json", type: file_type_1.FileType.block },
            { file: "F:\\Example\\textures\\flipbook_textures.json", type: file_type_1.FileType.texture_flipbook_atlas },
            { file: "F:\\Example\\textures\\item_texture.json", type: file_type_1.FileType.texture_item_atlas },
            { file: "F:\\Example\\manifest.json", type: file_type_1.FileType.manifest },
            { file: "F:\\Example\\sounds\\music_definitions.json", type: file_type_1.FileType.music_definitions },
            { file: "F:\\Example\\sounds\\sound_definitions.json", type: file_type_1.FileType.sounds_definitions },
            { file: "F:\\Example\\sounds.json", type: file_type_1.FileType.sounds },
            { file: "F:\\Example\\textures\\terrain_texture.json", type: file_type_1.FileType.texture_terrain_atlas },
        ];
        it.each(DetectTests)("$file", (item) => {
            let filepath = item.file;
            const expected = item.type;
            if (path_1.default.sep !== "\\")
                filepath = filepath.replace(/\\/gi, "/");
            const test = file_type_1.FileType.detect(path_1.default.normalize(filepath));
            expect(test).toEqual(expected);
        });
    });
});
//# sourceMappingURL=file-type.test.js.map