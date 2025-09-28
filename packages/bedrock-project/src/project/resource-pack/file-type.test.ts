import path from "path";
import { FileType } from "./file-type";

describe("RP Filetype", () => {
  describe("Detect", () => {
    const DetectTests = [
      { file: "F:\\Example-rp\\animation_controllers\\example.controller.json", type: FileType.animation_controller },
      { file: "F:\\Example-rp\\animations\\example.animation.json", type: FileType.animation },
      { file: "F:\\Example-rp\\attachables\\example.json", type: FileType.attachable },
      { file: "F:\\Example-rp\\entity\\pig.entity.json", type: FileType.entity },
      { file: "F:\\Example-rp\\models\\pig.geo.json", type: FileType.model },
      { file: "F:\\Example-rp\\models\\entities\\pig.geo.json", type: FileType.model },
      { file: "F:\\Example-rp\\particles\\example.particle.json", type: FileType.particle },
      { file: "F:\\Example-rp\\render_controllers\\example.controller.json", type: FileType.render_controller },
      { file: "F:\\Example-rp\\textures\\entities\\custom\\pig.png", type: FileType.texture },

      { file: "F:\\Example-rp\\biomes_client.json", type: FileType.biomes_client },
      { file: "F:\\Example-rp\\blocks.json", type: FileType.block },
      { file: "F:\\Example-rp\\textures\\flipbook_textures.json", type: FileType.texture_flipbook_atlas },
      { file: "F:\\Example-rp\\textures\\item_texture.json", type: FileType.texture_item_atlas },
      { file: "F:\\Example-rp\\manifest.json", type: FileType.manifest },
      { file: "F:\\Example-rp\\sounds\\music_definitions.json", type: FileType.music_definitions },
      { file: "F:\\Example-rp\\sounds\\sound_definitions.json", type: FileType.sounds_definitions },
      { file: "F:\\Example-rp\\sounds.json", type: FileType.sounds },
      { file: "F:\\Example-rp\\textures\\terrain_texture.json", type: FileType.texture_terrain_atlas },

      { file: "F:\\Example\\animation_controllers\\example.controller.json", type: FileType.animation_controller },
      { file: "F:\\Example\\animations\\example.animation.json", type: FileType.animation },
      { file: "F:\\Example\\attachables\\example.json", type: FileType.attachable },
      { file: "F:\\Example\\entity\\pig.entity.json", type: FileType.entity },
      { file: "F:\\Example\\models\\pig.geo.json", type: FileType.model },
      { file: "F:\\Example\\models\\entities\\pig.geo.json", type: FileType.model },
      { file: "F:\\Example\\particles\\example.particle.json", type: FileType.particle },
      { file: "F:\\Example\\render_controllers\\example.controller.json", type: FileType.render_controller },
      { file: "F:\\Example\\textures\\entities\\custom\\pig.png", type: FileType.texture },
      { file: "F:\\Example\\biomes_client.json", type: FileType.biomes_client },
      { file: "F:\\Example\\blocks.json", type: FileType.block },
      { file: "F:\\Example\\textures\\flipbook_textures.json", type: FileType.texture_flipbook_atlas },
      { file: "F:\\Example\\textures\\item_texture.json", type: FileType.texture_item_atlas },
      { file: "F:\\Example\\manifest.json", type: FileType.manifest },
      { file: "F:\\Example\\sounds\\music_definitions.json", type: FileType.music_definitions },
      { file: "F:\\Example\\sounds\\sound_definitions.json", type: FileType.sounds_definitions },
      { file: "F:\\Example\\sounds.json", type: FileType.sounds },
      { file: "F:\\Example\\textures\\terrain_texture.json", type: FileType.texture_terrain_atlas },
    ];

    it.each(DetectTests)("$file", (item) => {
      let filepath = item.file;
      const expected = item.type;

      if (path.sep !== "\\") filepath = filepath.replace(/\\/gi, "/");

      const test = FileType.detect(path.normalize(filepath));

      expect(test).toEqual(expected);
    });
  });
});
