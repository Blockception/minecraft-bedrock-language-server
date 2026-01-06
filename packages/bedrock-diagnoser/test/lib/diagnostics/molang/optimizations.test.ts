import { diagnose_molang_syntax_line } from '../../../../src/diagnostics/molang';
import { TestDiagnoser } from '../../../diagnoser';

interface OptimizationTestCase {
  name: string;
  data: string;
  expectedCode?: string;
}

describe('Molang Optimization Diagnostics', () => {
  describe('Constant Folding', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'addition of two constants',
        data: 'v.test + (1 + 2)',
        expectedCode: 'molang.optimization.constant-folding',
      },
      {
        name: 'multiplication of two constants',
        data: 'v.test + (5 * 3)',
        expectedCode: 'molang.optimization.constant-folding',
      },
      {
        name: 'division of two constants',
        data: 'v.test + (10 / 2)',
        expectedCode: 'molang.optimization.constant-folding',
      },
      {
        name: 'subtraction of two constants',
        data: 'v.test + (10 - 5)',
        expectedCode: 'molang.optimization.constant-folding',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Identity Operations', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'addition with 0 on right',
        data: 'v.temp + 0',
        expectedCode: 'molang.optimization.identity-operation',
      },
      {
        name: 'addition with 0 on left',
        data: '0 + v.temp',
        expectedCode: 'molang.optimization.identity-operation',
      },
      {
        name: 'subtraction with 0',
        data: 'v.temp - 0',
        expectedCode: 'molang.optimization.identity-operation',
      },
      {
        name: 'multiplication by 1 on right',
        data: 'v.temp * 1',
        expectedCode: 'molang.optimization.identity-operation',
      },
      {
        name: 'multiplication by 1 on left',
        data: '1 * v.temp',
        expectedCode: 'molang.optimization.identity-operation',
      },
      {
        name: 'division by 1',
        data: 'v.temp / 1',
        expectedCode: 'molang.optimization.identity-operation',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Constant Result Operations', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'multiplication by 0 on right',
        data: 'v.temp * 0',
        expectedCode: 'molang.optimization.constant-result',
      },
      {
        name: 'multiplication by 0 on left',
        data: '0 * v.temp',
        expectedCode: 'molang.optimization.constant-result',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Redundant Boolean Comparisons', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'comparison with true using ==',
        data: 'v.temp == true',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
      {
        name: 'comparison with false using ==',
        data: 'v.temp == false',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
      {
        name: 'comparison with true using !=',
        data: 'v.temp != true',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
      {
        name: 'comparison with false using !=',
        data: 'v.temp != false',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
      {
        name: 'true compared with variable',
        data: 'true == v.temp',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
      {
        name: 'false compared with variable',
        data: 'false != v.temp',
        expectedCode: 'molang.optimization.redundant-comparison',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Double Negation', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'double negation',
        data: '!!v.temp',
        expectedCode: 'molang.optimization.double-negation',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Redundant Unary Operators', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'unary plus operator',
        data: '+v.temp',
        expectedCode: 'molang.optimization.redundant-unary',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('Constant Conditions', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'ternary with true condition',
        data: 'v.test + (true ? 1 : 2)',
        expectedCode: 'molang.optimization.constant-condition',
      },
      {
        name: 'ternary with false condition',
        data: 'v.test + (false ? 1 : 2)',
        expectedCode: 'molang.optimization.constant-condition',
      },
      {
        name: 'ternary with 0 condition',
        data: 'v.test + (0 ? 1 : 2)',
        expectedCode: 'molang.optimization.constant-condition',
      },
    ];

    for (const test of tests) {
      it(`should detect: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        diagnoser.expectAny();
        if (test.expectedCode) {
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });

  describe('No False Positives', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'normal addition',
        data: 'v.temp + v.other',
      },
      {
        name: 'normal multiplication',
        data: 'v.temp * v.other',
      },
      {
        name: 'normal comparison',
        data: 'v.temp == v.other',
      },
      {
        name: 'single negation',
        data: '!v.temp',
      },
      {
        name: 'ternary with variable condition',
        data: 'v.temp ? 1 : 2',
      },
      {
        name: 'complex expression without optimizations',
        data: 'v.temp * 2 + v.other / 3',
      },
    ];

    for (const test of tests) {
      it(`should not flag: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        // Should not have optimization diagnostics
        const hasOptimizationDiag = diagnoser.items.some((d) =>
          (d.code as string).includes('molang.optimization'),
        );
        expect(hasOptimizationDiag).toBe(false);
      });
    }
  });

  describe('Complex Expressions', () => {
    const tests: OptimizationTestCase[] = [
      {
        name: 'nested expression with constant folding',
        data: '(1 + 2) * v.temp',
        expectedCode: 'molang.optimization.constant-folding',
      },
      {
        name: 'multiple optimizations in sequence',
        data: 'v.temp + 0 + v.other * 1',
      },
    ];

    for (const test of tests) {
      it(`should handle: ${test.name}`, () => {
        const diagnoser = new TestDiagnoser();
        diagnose_molang_syntax_line(test.data, diagnoser);

        if (test.expectedCode) {
          diagnoser.expectAny();
          expect(diagnoser.items.some((d) => d.code === test.expectedCode)).toBe(true);
        }
      });
    }
  });
});
