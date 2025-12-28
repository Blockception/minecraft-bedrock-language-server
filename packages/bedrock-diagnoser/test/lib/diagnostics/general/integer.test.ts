import { general_integer_diagnose } from "../../../../src/diagnostics/general";
import { Types } from "bc-minecraft-bedrock-types";
import { TestDiagnoser } from "../../../diagnoser";

describe("Integer", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    general_integer_diagnose(OffsetWord.create("0"), B);
    general_integer_diagnose(OffsetWord.create("12345"), B);
    general_integer_diagnose(OffsetWord.create("-9513213"), B);
    general_integer_diagnose(OffsetWord.create("5646"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    general_integer_diagnose(OffsetWord.create("foo"), B);
    general_integer_diagnose(OffsetWord.create("one"), B);
    general_integer_diagnose(OffsetWord.create("1.2"), B);
    general_integer_diagnose(OffsetWord.create("*13211/"), B);
    general_integer_diagnose(OffsetWord.create("*13.2/"), B);

    B.expectAmount(5);
  });
});
