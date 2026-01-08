import { general_float_diagnose } from "../../../../src/diagnostics/general/float";
import { OffsetWord } from "bc-minecraft-bedrock-shared";
import { TestDiagnoser } from "../../../diagnoser";

describe("Float", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    general_float_diagnose(OffsetWord.create("1.0"), B);
    general_float_diagnose(OffsetWord.create("0.23347"), B);
    general_float_diagnose(OffsetWord.create("12308.795"), B);
    general_float_diagnose(OffsetWord.create("-135743.2"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    general_float_diagnose(OffsetWord.create("foo"), B);
    general_float_diagnose(OffsetWord.create("one"), B);
    general_float_diagnose(OffsetWord.create("*13211/"), B);
    general_float_diagnose(OffsetWord.create("*13.2/"), B);

    B.expectAmount(4);
  });
});
