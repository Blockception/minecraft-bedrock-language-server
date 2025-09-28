import path from "path";
import { BehaviorPack } from "../../main";

const FileType = BehaviorPack.FileType;

describe("BP Filetype", () => {
  describe("Detect", () => {
    const DetectTests = [
      ["F:\\Example-bp\\animations\\sheep.run.animation.json", FileType.animation],
      ["F:\\Example-bp\\animation_controllers\\sheep.walk.controller.json", FileType.animation_controller],
      ["F:\\Example-bp\\blocks\\master.block.json", FileType.block],
      ["F:\\Example-bp\\entities\\dragon.entity.json", FileType.entity],
      ["F:\\Example-bp\\functions\\action.mcfunction", FileType.function],
      ["F:\\Example-bp\\items\\master_block.item.json", FileType.item],
      ["F:\\Example-bp\\loot_tables\\master_blockloot.json", FileType.loot_table],
      ["F:\\Example-bp\\manifest.json", FileType.manifest],
      ["F:\\Example-bp\\spawn_rules\\pig.json", FileType.spawn_rule],
      ["F:\\Example-bp\\structures\\build\\data.mcstructure", FileType.structure],
      ["F:\\Example-bp\\trading\\master_block.trades.json", FileType.trading],

      ["F:\\Example\\animations\\sheep.run.animation.json", FileType.animation],
      ["F:\\Example\\animation_controllers\\sheep.walk.controller.json", FileType.animation_controller],
      ["F:\\Example\\blocks\\master.block.json", FileType.block],
      ["F:\\Example\\entities\\dragon.entity.json", FileType.entity],
      ["F:\\Example\\functions\\action.mcfunction", FileType.function],
      ["F:\\Example\\items\\master_block.item.json", FileType.item],
      ["F:\\Example\\loot_tables\\master_blockloot.json", FileType.loot_table],
      ["F:\\Example\\manifest.json", FileType.manifest],
      ["F:\\Example\\spawn_rules\\pig.json", FileType.spawn_rule],
      ["F:\\Example\\structures\\build\\data.mcstructure", FileType.structure],
      ["F:\\Example\\trading\\master_block.trades.json", FileType.trading],
    ];

    DetectTests.forEach((item) => {
      it(<string>item[0], () => {
        let filepath = <string>item[0];
        const expected = item[1] as keyof typeof FileType;

        if (path.sep !== "\\") filepath = filepath.replace(/\\/gi, "/");

        const test = FileType.detect(path.normalize(filepath));

        expect(test).toEqual(expected);
      });
    });
  });
});
