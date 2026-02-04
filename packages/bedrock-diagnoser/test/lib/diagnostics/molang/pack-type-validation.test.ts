import { TestTextDocument } from 'bc-minecraft-bedrock-project';
import { diagnose_molang_syntax_document } from "../../../../src/diagnostics/molang";
import { TestDiagnoser } from "../../../diagnoser";

interface TestCase {
  name: string;
  documentUri: string;
  data: string | Record<string, any>;
  shouldHaveError: boolean;
  errorCode?: string;
}

describe("Molang Pack Type Validation", () => {
  const testCases: TestCase[] = [
    // Behavior Pack only queries
    {
      name: "query.scoreboard() in Behavior Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/behavior_pack/entities/example.json",
      data: "q.scoreboard('test')",
      shouldHaveError: false,
    },
    {
      name: "query.scoreboard() in Resource Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/resource_pack/entity/example.json",
      data: "q.scoreboard('test')",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    {
      name: "query.server_memory_tier() in Behavior Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/BP/entities/example.json",
      data: "q.server_memory_tier()",
      shouldHaveError: false,
    },
    {
      name: "query.server_memory_tier() in Resource Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/RP/entity/example.json",
      data: "q.server_memory_tier()",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    {
      name: "query.had_component_group() in Behavior Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/behaviorpack/entities/example.json",
      data: "q.had_component_group('group1')",
      shouldHaveError: false,
    },
    {
      name: "query.had_component_group() in Resource Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/resourcepack/entity/example.json",
      data: "q.had_component_group('group1')",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    // Resource Pack only queries
    {
      name: "query.client_memory_tier() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/resource_pack/entity/example.json",
      data: "q.client_memory_tier()",
      shouldHaveError: false,
    },
    {
      name: "query.client_memory_tier() in Behavior Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/behavior_pack/entities/example.json",
      data: "q.client_memory_tier()",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    {
      name: "query.is_local_player() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/RP/entity/example.json",
      data: "q.is_local_player()",
      shouldHaveError: false,
    },
    {
      name: "query.is_local_player() in Behavior Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/BP/entities/example.json",
      data: "q.is_local_player()",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    {
      name: "query.heartbeat_phase() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/resourcepack/entity/example.json",
      data: "q.heartbeat_phase()",
      shouldHaveError: false,
    },
    {
      name: "query.heartbeat_phase() in Behavior Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/behaviorpack/entities/example.json",
      data: "q.heartbeat_phase()",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    {
      name: "query.is_attached() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/resource/entity/example.json",
      data: "q.is_attached()",
      shouldHaveError: false,
    },
    {
      name: "query.is_attached() in Behavior Pack - should error",
      documentUri: "file:///c:/projects/MyAddon/behavior/entities/example.json",
      data: "q.is_attached()",
      shouldHaveError: true,
      errorCode: 'molang.function.wrong_pack_type',
    },
    // Queries without packType restrictions (should work in both)
    {
      name: "query.is_alive() in Behavior Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/behavior_pack/entities/example.json",
      data: "q.is_alive()",
      shouldHaveError: false,
    },
    {
      name: "query.is_alive() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/resource_pack/entity/example.json",
      data: "q.is_alive()",
      shouldHaveError: false,
    },
    {
      name: "query.health() in Behavior Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/BP/entities/example.json",
      data: "q.health()",
      shouldHaveError: false,
    },
    {
      name: "query.health() in Resource Pack - should pass",
      documentUri: "file:///c:/projects/MyAddon/RP/entity/example.json",
      data: "q.health()",
      shouldHaveError: false,
    },
    // Unknown pack type (should not error)
    {
      name: "query.scoreboard() in unknown path - should not error (no pack type detected)",
      documentUri: "file:///c:/projects/MyAddon/example.json",
      data: "q.scoreboard('test')",
      shouldHaveError: false,
    },
  ];

  for (const test of testCases) {
    it(test.name, () => {
      const doc = TestTextDocument.create(test.documentUri, "");
      const diagnoser = new TestDiagnoser();
      diagnose_molang_syntax_document(doc, diagnoser, test.data);

      if (test.shouldHaveError) {
        diagnoser.expectAny();
        if (test.errorCode) {
          expect(diagnoser.hasCode(test.errorCode)).toBe(true);
        }
      } else {
        // Allow info-level diagnostics (optimizations) but no warnings or errors
        const errorsAndWarnings = diagnoser.items.filter(
          item => item.severity >= 2 // warning or error
        );
        expect(errorsAndWarnings).toHaveLength(0);
      }
    });
  }
});
