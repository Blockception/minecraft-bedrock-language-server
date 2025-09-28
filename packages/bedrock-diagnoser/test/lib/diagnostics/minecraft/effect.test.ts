import { Types } from "bc-minecraft-bedrock-types";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { minecraft_effect_diagnose } from "../../../../src/lib/diagnostics/minecraft/effect";
import { TestDiagnoser } from "../../../diagnoser";

describe("Effect", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();

    //Loop over all vanilla versions
    MinecraftData.General.Effects.forEach((effect) => minecraft_effect_diagnose(Types.OffsetWord.create(effect), B));

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    //Random words
    minecraft_effect_diagnose(Types.OffsetWord.create("main"), B);
    minecraft_effect_diagnose(Types.OffsetWord.create("calc"), B);
    minecraft_effect_diagnose(Types.OffsetWord.create("spawn"), B);
    minecraft_effect_diagnose(Types.OffsetWord.create("Spawn"), B);

    B.expectAmount(4);
  });
});
