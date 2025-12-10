# Guide: Creating Diagnostic Error Codes

This guide explains how to add new diagnostic error codes to the Minecraft Bedrock Language Server's diagnostic system.

## Table of Contents

- [Overview](#overview)
- [Diagnostic System Architecture](#diagnostic-system-architecture)
- [Error Code Naming Conventions](#error-code-naming-conventions)
- [Step-by-Step Guide](#step-by-step-guide)
- [Severity Levels](#severity-levels)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

The diagnostic system in this language server provides error checking and validation for Minecraft Bedrock projects. Diagnostics are implemented in the `packages/bedrock-diagnoser` package and help developers identify issues in their behavior packs, resource packs, and other project files.

## Diagnostic System Architecture

The diagnostic system consists of several key components:

### Core Interfaces

- **DiagnosticsBuilder**: Main interface for adding diagnostics
  - Located in: `packages/bedrock-diagnoser/src/types/diagnostics-builder.ts`
  - Provides the `add()` method to register diagnostic messages

- **DocumentDiagnosticsBuilder**: Extension for document-specific diagnostics
  - Includes a reference to the document being diagnosed

- **DiagnosticSeverity**: Enum for severity levels
  - `error`, `warning`, `info`, `hint`

### File Organization

Diagnostics are organized by category:

```
packages/bedrock-diagnoser/src/diagnostics/
├── behavior-pack/        # Behavior pack diagnostics
│   ├── animation/
│   ├── entity/
│   ├── mcfunction/
│   └── ...
├── resource-pack/        # Resource pack diagnostics
│   ├── animation/
│   ├── sounds/
│   └── ...
├── general/              # Generic validation (integers, floats, etc.)
├── minecraft/            # Minecraft-specific (selectors, effects, etc.)
├── molang/               # Molang expression diagnostics
└── errors/               # Common error utilities
```

## Error Code Naming Conventions

Diagnostic error codes follow a hierarchical naming pattern:

### Format

```
<category>.<subcategory>.<type>.<detail>
```

### Examples

- `behaviorpack.entity.event.missing` - Missing entity event in behavior pack
- `resourcepack.animation.missing` - Missing animation in resource pack
- `general.integer.invalid` - Invalid integer value
- `minecraft.selector.invalid` - Invalid selector syntax
- `general.integer.minimum` - Integer below minimum value
- `general.integer.maximum` - Integer above maximum value

### Category Guidelines

| Category | Usage |
|----------|-------|
| `behaviorpack` | Behavior pack specific issues |
| `resourcepack` | Resource pack specific issues |
| `general` | Generic validation issues (types, formats) |
| `minecraft` | Minecraft-specific concepts (selectors, effects, tags) |
| `json` | JSON parsing and validation |
| `diagnostics` | Internal diagnostic system issues |

### Common Subcategories

- `.missing` - Resource or definition not found
- `.invalid` - Invalid syntax or value
- `.deprecated` - Deprecated feature usage
- `.minimum` / `.maximum` - Value range violations
- `.duplicate` - Duplicate definition

## Step-by-Step Guide

### 1. Identify the Diagnostic Location

Determine which category your diagnostic belongs to:

- Is it specific to a behavior pack component? → `diagnostics/behavior-pack/`
- Is it specific to a resource pack component? → `diagnostics/resource-pack/`
- Is it a general validation? → `diagnostics/general/`
- Is it Minecraft-specific? → `diagnostics/minecraft/`

### 2. Create or Locate the Diagnostic Function

Find the appropriate file or create a new one if needed. For example:

```typescript
// packages/bedrock-diagnoser/src/diagnostics/behavior-pack/entity/diagnose.ts
```

### 3. Add the Diagnostic Call

Use the `diagnoser.add()` method with four parameters:

```typescript
diagnoser.add(
  position,        // Location in the document (string path or DocumentLocation)
  message,         // Human-readable error message
  severity,        // DiagnosticSeverity enum value
  code            // Error code string
);
```

### 4. Choose the Right Severity Level

See [Severity Levels](#severity-levels) section below.

### 5. Write Clear Error Messages

Error messages should:
- Be concise and descriptive
- Explain what is wrong
- Optionally suggest how to fix it
- Include relevant context (e.g., the problematic value)

### 6. Test Your Diagnostic

Create test cases to verify your diagnostic works correctly:

1. Create a test file with the problematic code
2. Run the diagnostic system
3. Verify the error is reported correctly
4. Test edge cases

## Severity Levels

Choose the appropriate severity level:

### Error (DiagnosticSeverity.error)

Use for issues that will **definitely cause problems** at runtime:

- Missing required resources (entities, animations, etc.)
- Invalid syntax that Minecraft cannot parse
- Type mismatches that will crash
- Security vulnerabilities

**Example:**
```typescript
diagnoser.add(
  value,
  `Cannot find entity definition: ${id}`,
  DiagnosticSeverity.error,
  'behaviorpack.entity.missing'
);
```

### Warning (DiagnosticSeverity.warning)

Use for issues that **might cause problems** or are **bad practice**:

- Missing optional resources
- Deprecated features
- Component groups not found
- Suspicious patterns

**Example:**
```typescript
diagnoser.add(
  path,
  `Event is using the deprecated run_command property, use queue_command instead`,
  DiagnosticSeverity.warning,
  'behaviorpack.entity.event.run_command'
);
```

### Info (DiagnosticSeverity.info)

Use for **suggestions** and **optimization opportunities**:

- Unnecessary code that can be simplified
- Performance improvements
- Style suggestions

**Example:**
```typescript
diagnoser.add(
  event_id,
  "'randomize' only has one entry and can therefore be removed.",
  DiagnosticSeverity.info,
  'behaviorpack.entity.event.randomize.length'
);
```

### Hint (DiagnosticSeverity.hint)

Use for **subtle suggestions** that don't impact functionality:

- Code style preferences
- Minor optimizations

## Best Practices

### 1. Use Consistent Error Codes

- Follow the naming convention: `category.subcategory.type`
- Use existing patterns when possible
- Check for similar diagnostics before creating new codes

### 2. Provide Helpful Messages

```typescript
// ❌ Bad: Vague message
diagnoser.add(value, 'Error', DiagnosticSeverity.error, 'error');

// ✅ Good: Clear and actionable
diagnoser.add(
  value,
  `Cannot find behavior pack animation definition: ${id}`,
  DiagnosticSeverity.error,
  'behaviorpack.animation.missing'
);
```

### 3. Include Context in Messages

```typescript
// ❌ Bad: No context
diagnoser.add(value, 'Invalid value', DiagnosticSeverity.error, 'invalid');

// ✅ Good: Shows the problematic value
diagnoser.add(
  value,
  `Invalid integer value: ${value.text}`,
  DiagnosticSeverity.error,
  'general.integer.invalid'
);
```

### 4. Position Accuracy

Use specific positions when possible:

```typescript
// For object properties
diagnoser.add('events/my_event/trigger', message, severity, code);

// For text offsets
diagnoser.add(value, message, severity, code); // value is Types.OffsetWord

// For document locations
diagnoser.add({ line: 10, character: 5 }, message, severity, code);
```

### 5. Reuse Diagnostic Functions

Create reusable diagnostic functions for common patterns:

```typescript
export function general_integer_diagnose(
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder,
  range?: { min: number; max: number }
): boolean {
  if (General.Integer.is(value.text)) {
    if (range) {
      const v = Number.parseInt(value.text);
      
      if (v < range.min) {
        diagnoser.add(
          value,
          `The value of ${v} is lower than the allowed minimum: ${range.min}`,
          DiagnosticSeverity.error,
          'general.integer.minimum'
        );
      }
      if (v > range.max) {
        diagnoser.add(
          value,
          `The value of ${v} is higher than the allowed maximum: ${range.max}`,
          DiagnosticSeverity.error,
          'general.integer.maximum'
        );
      }
    }
    return true;
  }

  diagnoser.add(
    value,
    `Invalid integer value: ${value.text}`,
    DiagnosticSeverity.error,
    'general.integer.invalid'
  );
  return false;
}
```

### 6. Handle Edge Cases

Consider and handle edge cases appropriately:

```typescript
// Check for undefined before processing
if (data === undefined) return;

// Handle both single values and arrays
const groups = typeof value === 'string' ? [value] : value;
```

## Examples

### Example 1: Simple Validation

Checking if a boolean value is valid:

```typescript
import { General, Types } from 'bc-minecraft-bedrock-types';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function general_boolean_diagnose(
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder
): void {
  if (General.Boolean.is(value.text)) return;

  diagnoser.add(
    value,
    `Invalid boolean value: ${value.text}`,
    DiagnosticSeverity.error,
    'general.boolean.invalid'
  );
}
```

### Example 2: Missing Resource

Checking if an animation exists:

```typescript
export function diagnose_animation_implementation(
  anim_id: string,
  user: User,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>
): void {
  const anim = diagnoser.context
    .getProjectData()
    .behaviors.animations.get(anim_id, diagnoser.project);
    
  if (anim === undefined) {
    return diagnoser.add(
      user.id,
      `Cannot find behaviors animations definition: ${anim_id}`,
      DiagnosticSeverity.error,
      'behaviorpack.animations.missing'
    );
  }
  
  // ... continue with further validation
}
```

### Example 3: Component Validation

Validating entity components with custom error codes:

```typescript
export function component_error<T>(
  message: string,
  code: string | number
): ComponentCheck<T> {
  return (name, _component, _context, diagnoser) => {
    diagnoser.add(name, message, DiagnosticSeverity.error, code);
  };
}

// Usage
const component_test: Record<string, ComponentCheck<Entity>> = {
  'minecraft:is_tamed': component_error(
    'This component can only be used by rideable entities',
    'behaviorpack.entity.component.is_tamed.invalid'
  ),
};
```

### Example 4: Conditional Diagnostics

Checking for deprecated features:

```typescript
if (event.run_command) {
  diagnoser.add(
    `events/${event_id}`,
    `Event is using the deprecated run_command property, use queue_command instead`,
    DiagnosticSeverity.warning,
    'behaviorpack.entity.event.run_command'
  );
}
```

### Example 5: Selector Validation

Complex validation with multiple error codes:

```typescript
export function minecraft_selector_diagnose(
  pattern: ParameterInfo,
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder
) {
  const sel = value.text;

  if (!sel.startsWith('@')) {
    // Handle fake entities
    const name = Text.UnQuote(sel);
    
    if (pattern.options?.allowFakePlayers === false) {
      diagnoser.add(
        value,
        'No fake players / names allowed',
        DiagnosticSeverity.error,
        'minecraft.selector.invalid'
      );
      return;
    }
    
    // Check if entity is defined
    const data = diagnoser.context.getProjectData().projectData;
    if (!data.general.fakeEntities.has(name)) {
      diagnoser.add(
        value,
        `Cannot find fake entity definition or name for: ${name}`,
        DiagnosticSeverity.warning,
        'minecraft.fakeentity.missing'
      );
    }
    return;
  }
  
  // Validate selector syntax
  const selector = Minecraft.Selector.Selector.parse(sel, value.offset);
  if (selector === undefined) {
    diagnoser.add(
      value,
      'Invalid selector',
      DiagnosticSeverity.error,
      'minecraft.selector.invalid'
    );
    return;
  }
  
  // Additional selector validation...
}
```

## Common Patterns

### Using the Errors Utility

For missing resources, use the `Errors.missing()` utility:

```typescript
import { Errors } from '../..';

// Check if animation exists
const anim = diagnoser.context
  .getProjectData()
  .behaviors.animations.get(anim_id, diagnoser.project);

if (anim === undefined) {
  // Automatically formats the error code as "behaviorpack.animations.missing"
  return Errors.missing('behaviors', 'animations', anim_id, diagnoser);
}
```

### Component Checks

For entity component validation:

```typescript
import { component_error, component_warning } from '../../utility/components/checks';

const component_checks: Record<string, ComponentCheck<T>> = {
  'minecraft:my_component': component_error(
    'This component requires additional setup',
    'behaviorpack.entity.component.my_component.invalid'
  ),
};
```

## Testing Your Diagnostics

After creating a diagnostic, test it:

1. **Create a test file** in `packages/bedrock-diagnoser/test/`
2. **Add test cases** for both valid and invalid inputs
3. **Verify the diagnostic code** matches what you expect
4. **Test edge cases** (undefined values, empty strings, etc.)

Example test structure:

```typescript
import { diagnose } from '../src/diagnostics/your-diagnostic';

describe('Your Diagnostic', () => {
  it('should report error for invalid value', () => {
    const diagnoser = createTestDiagnoser();
    const value = { text: 'invalid', offset: 0 };
    
    diagnose(value, diagnoser);
    
    expect(diagnoser.hasCode('your.diagnostic.code')).toBe(true);
  });
});
```

## Additional Resources

- [DiagnosticsBuilder Interface](../packages/bedrock-diagnoser/src/types/diagnostics-builder.ts)
- [Existing Diagnostics Examples](../packages/bedrock-diagnoser/src/diagnostics/)
- [Error Utilities](../packages/bedrock-diagnoser/src/diagnostics/errors/)
- [Contributing Guide](../CONTRIBUTING.md)

## Questions?

If you have questions about adding diagnostics:

1. Look at existing diagnostics in similar categories
2. Check the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
3. Open an issue for discussion
4. Join our community discussions

---

**Happy Diagnosing!** 🔍
