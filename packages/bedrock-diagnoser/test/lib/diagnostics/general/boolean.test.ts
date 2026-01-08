import { general_boolean_diagnose } from "../../../../src/diagnostics/general/boolean";
import { OffsetWord } from "bc-minecraft-bedrock-shared";
import { TestDiagnoser } from "../../../diagnoser";

describe("Boolean", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    general_boolean_diagnose(OffsetWord.create("true"), B);
    general_boolean_diagnose(OffsetWord.create("True"), B);
    general_boolean_diagnose(OffsetWord.create("false"), B);
    general_boolean_diagnose(OffsetWord.create("False"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    general_boolean_diagnose(OffsetWord.create("t"), B);
    general_boolean_diagnose(OffsetWord.create("a"), B);
    general_boolean_diagnose(OffsetWord.create("f"), B);
    general_boolean_diagnose(OffsetWord.create("-"), B);

    B.expectAmount(4);
  });
});
