import { OffsetWord } from "bc-minecraft-bedrock-shared";
import { minecraft_coordinate_diagnose } from "../../../../src/diagnostics/minecraft/coordinate";
import { TestDiagnoser } from "../../../diagnoser";

describe("Coordinate", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();

    //Loop over all vanilla versions
    minecraft_coordinate_diagnose(OffsetWord.create("+16"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("-16"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("^16"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("~16"), B);

    minecraft_coordinate_diagnose(OffsetWord.create("123"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("-1"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("^"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("~"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("^-16"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("~+54"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    //Random words
    minecraft_coordinate_diagnose(OffsetWord.create("&16"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("*4341"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("x"), B);
    minecraft_coordinate_diagnose(OffsetWord.create("y"), B);

    B.expectAmount(4);
  });
});
