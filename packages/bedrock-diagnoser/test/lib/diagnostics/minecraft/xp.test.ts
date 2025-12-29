import { OffsetWord } from "@blockception/packages-shared";
import { minecraft_xp_diagnose } from "../../../../src/diagnostics/minecraft/xp";
import { TestDiagnoser } from "../../../diagnoser";

describe("XP", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    minecraft_xp_diagnose(OffsetWord.create("123"), B);
    minecraft_xp_diagnose(OffsetWord.create("123L"), B);
    minecraft_xp_diagnose(OffsetWord.create("-1000L"), B);
    minecraft_xp_diagnose(OffsetWord.create("1000L"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    minecraft_xp_diagnose(OffsetWord.create("123XP"), B);
    minecraft_xp_diagnose(OffsetWord.create("123LXP"), B);
    minecraft_xp_diagnose(OffsetWord.create("-1000LXP"), B);
    minecraft_xp_diagnose(OffsetWord.create("one"), B);

    B.expectAmount(4);
  });
});
