import { general_boolean_diagnose } from "../../../../src/lib/diagnostics/general/boolean";
import { Types } from "bc-minecraft-bedrock-types";
import { TestDiagnoser } from "../../../diagnoser";

describe("Boolean", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    general_boolean_diagnose(Types.OffsetWord.create("true"), B);
    general_boolean_diagnose(Types.OffsetWord.create("True"), B);
    general_boolean_diagnose(Types.OffsetWord.create("false"), B);
    general_boolean_diagnose(Types.OffsetWord.create("False"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    general_boolean_diagnose(Types.OffsetWord.create("t"), B);
    general_boolean_diagnose(Types.OffsetWord.create("a"), B);
    general_boolean_diagnose(Types.OffsetWord.create("f"), B);
    general_boolean_diagnose(Types.OffsetWord.create("-"), B);

    B.expectAmount(4);
  });
});
