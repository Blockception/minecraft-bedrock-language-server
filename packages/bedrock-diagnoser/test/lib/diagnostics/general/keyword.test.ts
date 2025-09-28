import { general_keyword_diagnose } from "../../../../src/diagnostics/general";
import { Types } from "bc-minecraft-bedrock-types";
import { TestDiagnoser } from "../../../diagnoser";

describe("Keyword", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();
    general_keyword_diagnose("playsound", Types.OffsetWord.create("playsound"), B);
    general_keyword_diagnose("@a", Types.OffsetWord.create("@a"), B);
    general_keyword_diagnose(
      "invalid keyword but still expect to work",
      Types.OffsetWord.create("invalid keyword but still expect to work"),
      B
    );

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    general_keyword_diagnose("asd", Types.OffsetWord.create("playsound"), B);
    general_keyword_diagnose("@s", Types.OffsetWord.create("@a"), B);
    general_keyword_diagnose("invalid keyword but still expect to work", Types.OffsetWord.create("I am different"), B);

    B.expectAmount(3);
  });
});
