# Molang Optimization Framework

This directory contains the framework for detecting optimization opportunities in Molang expressions. The framework is designed to be extensible, making it easy to add new optimization rules without modifying core diagnostic logic.

## Architecture

The optimization system consists of three main components:

1. **Framework** (`optimization-framework.ts`) - The core infrastructure for defining and applying optimization rules
2. **Rules** (`optimization-rules.ts`) - The default set of optimization rules
3. **Integration** (`expressions.ts`) - Integration with the diagnostic system

## Adding New Optimization Rules

### Quick Example

Here's how to add a new optimization rule:

```typescript
import { OptimizationCategory, OptimizationRule, createDefaultOptimizationRegistry } from './optimization-rules';
import { DiagnosticSeverity } from '../../types';
import { ExpressionNode, NodeType } from 'bc-minecraft-molang';

// Create a custom category
const myCustomCategory: OptimizationCategory = {
  name: 'My Custom Optimizations',
  description: 'Custom rules for my specific use case',
  rules: [
    {
      code: 'molang.optimization.my-custom-rule',
      name: 'My custom optimization',
      severity: DiagnosticSeverity.info,
      matches(node: ExpressionNode): boolean {
        // Return true if this node should trigger the optimization suggestion
        return node.type === NodeType.BinaryOperation && /* your logic here */;
      },
      getMessage(node: ExpressionNode): string {
        return 'Your helpful message explaining what can be optimized';
      },
    },
  ],
};

// Register the category
const registry = createDefaultOptimizationRegistry();
registry.registerCategory(myCustomCategory);
```

### Using Helper Functions

The framework provides helper functions to make common patterns easier:

```typescript
import { OptimizationRuleHelpers } from './optimization-framework';

// Check if a node is a literal with a specific value
OptimizationRuleHelpers.isLiteralValue(node, '0');

// Check if a node is a boolean literal (true/false)
OptimizationRuleHelpers.isBooleanLiteral(node);

// Check if both operands are literals
OptimizationRuleHelpers.hasTwoLiteralOperands(node);

// Create a rule for binary operations with a specific right-hand literal
OptimizationRuleHelpers.createBinaryRightLiteralRule(
  '+',  // operator
  '0',  // literal value
  'molang.optimization.identity-operation',  // diagnostic code
  'addition with 0 has no effect',  // message
);
```

## Built-in Optimization Categories

### 1. Constant Folding
Detects when two constant values can be pre-calculated at author time.

**Examples:**
- `1 + 2` → suggests pre-calculating to `3`
- `5 * 3` → suggests pre-calculating to `15`

### 2. Identity Operations
Detects mathematical operations that have no effect.

**Examples:**
- `x + 0` → suggests removing `+ 0`
- `x * 1` → suggests removing `* 1`
- `x / 1` → suggests removing `/ 1`

### 3. Constant Result
Detects operations that always produce the same result regardless of inputs.

**Examples:**
- `x * 0` → always results in `0`

### 4. Redundant Boolean Comparisons
Detects comparisons with boolean literals that can be simplified.

**Examples:**
- `x == true` → suggests using `x` directly
- `x == false` → suggests using `!x`
- `x != false` → suggests using `x` directly

### 5. Double Negation
Detects double negation that can be removed.

**Examples:**
- `!!x` → suggests removing both negations

### 6. Redundant Unary Operators
Detects unary operators that have no effect.

**Examples:**
- `+x` → suggests removing the unary plus

### 7. Constant Conditions
Detects conditional expressions with constant conditions.

**Examples:**
- `true ? a : b` → suggests replacing with `a`
- `false ? a : b` → suggests replacing with `b`

## Rule Interface

Each optimization rule implements the `OptimizationRule` interface:

```typescript
interface OptimizationRule {
  // Unique diagnostic code (e.g., 'molang.optimization.constant-folding')
  code: string;
  
  // Human-readable name
  name: string;
  
  // Severity level (typically DiagnosticSeverity.info for optimizations)
  severity: DiagnosticSeverity;
  
  // Returns true if this rule applies to the given node
  matches(node: ExpressionNode): boolean;
  
  // Returns the diagnostic message for this optimization
  getMessage(node: ExpressionNode): string;
}
```

## Advanced Usage

### Creating Complex Rules

For more complex patterns, implement custom matching logic:

```typescript
{
  code: 'molang.optimization.complex-pattern',
  name: 'Complex pattern optimization',
  severity: DiagnosticSeverity.info,
  matches(node: ExpressionNode): boolean {
    // Complex matching logic
    if (node.type !== NodeType.BinaryOperation) return false;
    const binOp = node as BinaryOperationNode;
    
    // Check for specific patterns
    if (binOp.operator === '&&') {
      // Check both sides
      const leftIsTrue = OptimizationRuleHelpers.isLiteralValue(binOp.left, 'true');
      const rightIsTrue = OptimizationRuleHelpers.isLiteralValue(binOp.right, 'true');
      return leftIsTrue || rightIsTrue;
    }
    
    return false;
  },
  getMessage(node: ExpressionNode): string {
    // Generate contextual message
    const binOp = node as BinaryOperationNode;
    const leftIsTrue = OptimizationRuleHelpers.isLiteralValue(binOp.left, 'true');
    return leftIsTrue 
      ? 'AND operation with true on left is redundant'
      : 'AND operation with true on right is redundant';
  },
}
```

### Organizing Rules

Group related rules into categories for better organization:

```typescript
const advancedMathCategory: OptimizationCategory = {
  name: 'Advanced Math Optimizations',
  description: 'Optimizations for complex mathematical expressions',
  rules: [
    // Multiple related rules
    rule1,
    rule2,
    rule3,
  ],
};
```

## Testing

When adding new rules, add corresponding test cases to `test/lib/diagnostics/molang/optimizations.test.ts`:

```typescript
describe('My Custom Optimization', () => {
  it('should detect my pattern', () => {
    const diagnoser = new TestDiagnoser();
    diagnose_molang_syntax_text('', diagnoser, 'my test expression');
    
    diagnoser.expectAny();
    expect(diagnoser.diagnostics.some(d => d.code === 'molang.optimization.my-custom-rule')).toBe(true);
  });
  
  it('should not flag valid expressions', () => {
    const diagnoser = new TestDiagnoser();
    diagnose_molang_syntax_text('', diagnoser, 'valid expression');
    
    const hasMyDiag = diagnoser.diagnostics.some(d => d.code === 'molang.optimization.my-custom-rule');
    expect(hasMyDiag).toBe(false);
  });
});
```

## Best Practices

1. **Keep rules simple and focused** - Each rule should check for one specific pattern
2. **Use clear, actionable messages** - Users should understand what to change and why
3. **Avoid false positives** - Only flag patterns that are genuinely suboptimal
4. **Use info severity** - Optimizations are suggestions, not errors
5. **Document your rules** - Add comments explaining the pattern and why it matters
6. **Add tests** - Every rule should have test coverage
7. **Consider performance** - The matching function is called for every node in the tree

## Performance Considerations

The framework traverses the entire expression tree once and checks each node against all registered rules. To maintain good performance:

- Keep `matches()` functions lightweight
- Return early from `matches()` when possible
- Use type checks before accessing node properties
- Avoid expensive operations in `matches()`

## Contributing

When contributing new optimization rules:

1. Add your rule to `optimization-rules.ts` or create a new file
2. Add comprehensive tests in `optimizations.test.ts`
3. Update this README with your new category/rule
4. Ensure all tests pass: `npm test`
5. Build the project: `npm run build`
