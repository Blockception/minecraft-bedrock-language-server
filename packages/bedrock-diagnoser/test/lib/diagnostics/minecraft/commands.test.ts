import { OffsetWord } from "@blockception/packages-shared";
import { minecraft_check_command } from "../../../../src/diagnostics/minecraft/commands";
import { TestDiagnoser } from "../../../diagnoser";

describe("Command", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();

    //Loop over all vanilla versions
    minecraft_check_command(OffsetWord.create("playsound"), B, false);
    minecraft_check_command(OffsetWord.create("tellraw"), B, false);
    minecraft_check_command(OffsetWord.create("dialogue"), B, false);
    minecraft_check_command(OffsetWord.create("event"), B, false);

    minecraft_check_command(OffsetWord.create("ability"), B, true);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    //Random words
    minecraft_check_command(OffsetWord.create("detect"), B, false);
    minecraft_check_command(OffsetWord.create("netherfortress"), B, false);

    B.expectAmount(2);
  });
});
