import { TextDocument } from "bc-minecraft-bedrock-project/src/types";
import path from 'path';
import { ResourcePack } from "../../../../src/diagnostics/resource-pack/resource-pack";
import { TestDiagnoser } from "../../../diagnoser";

const example_data = {
  num_mip_levels: 4,
  padding: 8,
  resource_pack_name: "vanilla",
  texture_name: "atlas.terrain",
  texture_data: {
    andesite: {
      textures: "textures/blocks/stone_andesite",
    },
    anvil_base: {
      textures: [
        "textures/blocks/stone_andesite",
        "textures/blocks/anvil_base",
        "textures/blocks/stone_andesite",
        "textures/blocks/anvil_base",
      ],
    },
    grass_carried: {
      textures: {
        overlay_color: "#79c05a",
        path: "textures/blocks/grass_side",
      },
    },
    grass_carried_bottom: {
      textures: {
        variations: [{ path: "textures/air/stone_andesite" }, { path: "textures/air/anvil_base" }],
      },
    },
  },
};

describe("ResourcePack", () => {
  describe("TextureAtlas", () => {
    it("no errors", () => {
      const doc: TextDocument = {
        uri: path.join("resource_pack", "textures", "terrain_texture.json"),
        getText: () => JSON.stringify(example_data, undefined, 2),
      };

      const diagnoser = TestDiagnoser.createDocument(undefined, doc);
      diagnoser.context.getFiles = () => [
        "textures/blocks/stone_andesite",
        "textures/blocks/anvil_base",
        "textures/blocks/grass_side",
        "textures/air/stone_andesite",
        "textures/air/anvil_base",
      ];

      expect(ResourcePack.diagnose_document(diagnoser)).toBeTruthy();
      diagnoser.expectEmpty();
    });
  });
});
