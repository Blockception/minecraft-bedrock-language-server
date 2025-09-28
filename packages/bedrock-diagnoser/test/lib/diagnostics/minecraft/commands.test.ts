import { Types } from "bc-minecraft-bedrock-types";
import { minecraft_check_command } from "../../../../src/lib/diagnostics/minecraft/commands";
import { TestDiagnoser } from "../../../diagnoser";

describe("Command", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();

    //Loop over all vanilla versions
    minecraft_check_command(Types.OffsetWord.create("playsound"), B, false);
    minecraft_check_command(Types.OffsetWord.create("tellraw"), B, false);
    minecraft_check_command(Types.OffsetWord.create("dialogue"), B, false);
    minecraft_check_command(Types.OffsetWord.create("event"), B, false);

    minecraft_check_command(Types.OffsetWord.create("ability"), B, true);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    //Random words
    minecraft_check_command(Types.OffsetWord.create("detect"), B, false);
    minecraft_check_command(Types.OffsetWord.create("netherfortress"), B, false);

    B.expectAmount(2);
  });
});
