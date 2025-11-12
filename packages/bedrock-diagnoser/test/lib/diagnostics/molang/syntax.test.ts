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
    {
      name: "Variable parameters: is_owner_identifier_any with 1 arg",
      data: "q.is_owner_identifier_any('minecraft:zombie')",
    },
    {
      name: "Variable parameters: is_owner_identifier_any with 3 args",
      data: "q.is_owner_identifier_any('minecraft:zombie', 'minecraft:skeleton', 'minecraft:creeper')",
    },
    {
      name: "Variable parameters: equipped_item_all_tags with 2 args",
      data: "q.equipped_item_all_tags('slot.weapon.mainhand', 'tag1')",
    },
    {
      name: "Variable parameters: equipped_item_all_tags with 4 args",
      data: "q.equipped_item_all_tags('slot.weapon.mainhand', 'tag1', 'tag2', 'tag3')",
    },
    {
      name: "Variable parameters: is_name_any with multiple args",
      data: "q.is_name_any('entity1', 'entity2', 'entity3', 'entity4')",
    },
    {
      name: "Variable parameters: block_has_all_tags with 5 args",
      data: "q.block_has_all_tags(0, 0, 0, 'tag1', 'tag2')",
    },
  ];

  for (const test of no_errors_tests) {
    it(`no errors test: ${test.name}`, () => {
      const diagnoser = new TestDiagnoser();
      diagnose_molang_syntax_text("", diagnoser, test.data);

      diagnoser.expectEmpty();
    });
  }

  const error_tests: TestCase[] = [
    {
      name: "Variable parameters: is_owner_identifier_any with 0 args",
      data: "q.is_owner_identifier_any()",
    },
    {
      name: "Variable parameters: equipped_item_all_tags with 0 args",
      data: "q.equipped_item_all_tags()",
    },
    {
      name: "Variable parameters: equipped_item_all_tags with 1 arg (needs at least 2)",
      data: "q.equipped_item_all_tags('slot.weapon.mainhand')",
    },
    {
      name: "Variable parameters: block_has_all_tags with 3 args (needs at least 4)",
      data: "q.block_has_all_tags(0, 0, 0)",
    },
    {
      name: "Type validation: block_has_all_tags with wrong type for tag (number instead of string)",
      data: "q.block_has_all_tags(0, 0, 0, 2, 1)",
    },
    {
      name: "Type validation: equipped_item_all_tags with wrong type for tag (number instead of string)",
      data: "q.equipped_item_all_tags('slot.weapon.mainhand', 123)",
    },
    {
      name: "Type validation: is_name_any with wrong type (number instead of string)",
      data: "q.is_name_any(123)",
    },
  ];

  for (const test of error_tests) {
    it(`error test: ${test.name}`, () => {
      const diagnoser = new TestDiagnoser();
      diagnose_molang_syntax_text("", diagnoser, test.data);

      diagnoser.expectAny();
    });
  }
});
