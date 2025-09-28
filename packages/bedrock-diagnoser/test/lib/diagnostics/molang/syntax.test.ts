import {
  diagnose_molang_syntax_text
} from "../../../../src/diagnostics/molang";
import { TestDiagnoser } from "../../../diagnoser";

interface TestCase {
  name: string;
  data: string | Record<string, any>;
}

describe("Molang Syntax", () => {
  const no_errors_tests: TestCase[] = [
    {
      name: "Command with selector",
      data: {
        on_entry: ["/event entity @e[type=foo:bar] foo:update"],
      },
    },
    {
      name: "Transition with comparison",
      data: {
        transition: [{ foo: "q.property('foo:bar')==0&&q.all_animations_finished" }],
      },
    },
    {
      name: "Comparison should not be confused with assignment",
      data: {
        transition: [
          "q.property('foo:bar')==0&&q.all_animations_finished",
          "variable.example<=1;",
          "variable.example>=1;",
          "variable.example!=1;",
          "variable.example <= 1;",
          "variable.example >= 1;",
          "variable.example != 1;",
          "q.property('foo:bar')==0&&q.all_animations_finished",
        ],
      },
    },
    {
      name: "Some complex",
      data: "v.temp_outfit!=q.property('foo:bar')+q.property('foo:bar')+q.property('foo:bar')",
    },
  ];

  for (const test of no_errors_tests) {
    it(`no errors test: ${test.name}`, () => {
      const diagnoser = new TestDiagnoser();
      diagnose_molang_syntax_text("", diagnoser, test.data);

      diagnoser.expectEmpty();
    });
  }
});
