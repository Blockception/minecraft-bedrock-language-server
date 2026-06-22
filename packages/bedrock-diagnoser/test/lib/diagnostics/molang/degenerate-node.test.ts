import { diagnose_molang_syntax } from '../../../../src/diagnostics/molang';
import { TestDiagnoser } from '../../../diagnoser';

describe('Molang degenerate node', () => {
  // Regression: a degenerate node (e.g. an empty `{}` produced by the parser) has no
  // `position`. Reporting it with `position === undefined` made the downstream range
  // resolve to a NaN character, which serializes to `null` over JSON-RPC and caused the
  // client to drop the entire diagnostic batch.
  test('reports an unknown-syntax diagnostic with a finite position for an empty `{}` node', () => {
    const diagnoser = new TestDiagnoser();

    // An empty object stands in for the degenerate node observed in the wild.
    diagnose_molang_syntax({} as any, diagnoser);

    expect(diagnoser.items).toHaveLength(1);
    const item = diagnoser.items[0];
    expect(item.code).toBe('molang.diagnoser.syntax');
    expect(typeof item.position).toBe('number');
    expect(Number.isFinite(item.position as number)).toBe(true);
  });
});
