# Creating Diagnostic Error Codes

A guide for adding new diagnostic error codes to the Minecraft Bedrock Language Server.

---

## Quick Start

1. Choose error code location based on type (behavior pack, resource pack, general, minecraft-specific)
2. Follow naming convention: `category.subcategory.type.detail`
3. Use `diagnoser.add()` with position, message, severity, and code
4. Test your diagnostic

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Naming Conventions](#naming-conventions)
- [Step-by-Step Guide](#step-by-step-guide)
- [Severity Levels](#severity-levels)
- [Best Practices](#best-practices)
- [Examples](#examples)

---

## Overview

The diagnostic system provides error checking and validation for Minecraft Bedrock projects. It helps developers identify issues in behavior packs, resource packs, and other project files.

**Package**: `packages/bedrock-diagnoser`

---

## Architecture

### Core Interfaces

| Interface | Purpose |
|-----------|---------|
| **DiagnosticsBuilder** | Main interface with `add()` method for adding diagnostics |
| **DocumentDiagnosticsBuilder** | Extension for document-specific diagnostics |
| **DiagnosticSeverity** | Severity levels: `error`, `warning`, `info`, `hint` |

📁 **Location**: `packages/bedrock-diagnoser/src/types/diagnostics-builder.ts`

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

---

## Naming Conventions

### Format Pattern

```
<category>.<subcategory>.<type>.<detail>
```

### Categories

| Category | Use For |
|----------|---------|
| `behaviorpack` | Behavior pack issues |
| `resourcepack` | Resource pack issues |
| `general` | Generic validation (types, formats) |
| `minecraft` | Minecraft concepts (selectors, effects, tags) |
| `json` | JSON parsing/validation |
| `diagnostics` | Internal system issues |

### Common Type Suffixes

| Suffix | Meaning |
|--------|---------|
| `.missing` | Resource/definition not found |
| `.invalid` | Invalid syntax or value |
| `.deprecated` | Deprecated feature |
| `.minimum` / `.maximum` | Value range violation |
| `.duplicate` | Duplicate definition |

### Examples

```typescript
'behaviorpack.entity.event.missing'     // Missing entity event
'resourcepack.animation.missing'        // Missing animation
'general.integer.invalid'               // Invalid integer
'minecraft.selector.invalid'            // Invalid selector
'general.integer.minimum'               // Below minimum
'general.integer.maximum'               // Above maximum
```

---

## Step-by-Step Guide

### 1️⃣ Identify Location

Choose the appropriate directory:

| Type | Directory |
|------|-----------|
| Behavior pack | `diagnostics/behavior-pack/` |
| Resource pack | `diagnostics/resource-pack/` |
| General validation | `diagnostics/general/` |
| Minecraft-specific | `diagnostics/minecraft/` |

### 2️⃣ Create or Locate Function

Find or create the diagnostic function file:

```typescript
// Example: packages/bedrock-diagnoser/src/diagnostics/behavior-pack/entity/diagnose.ts
```

### 3️⃣ Add Diagnostic Call

Use `diagnoser.add()` with four parameters:

```typescript
diagnoser.add(
  position,   // string path or DocumentLocation
  message,    // Human-readable error message
  severity,   // DiagnosticSeverity enum
  code        // Error code string
);
```

### 4️⃣ Choose Severity

See [Severity Levels](#severity-levels) section.

### 5️⃣ Write Clear Messages

✅ **Good messages:**
- Concise and descriptive
- Explain what's wrong
- Suggest fixes when possible
- Include relevant context

### 6️⃣ Test

1. Create test file with problematic code
2. Run diagnostic system
3. Verify error reported correctly
4. Test edge cases

---

## Severity Levels

### 🔴 Error

**When to use:** Issues that will definitely cause runtime problems

**Examples:**
- Missing required resources
- Invalid syntax Minecraft can't parse
- Type mismatches
- Security vulnerabilities

```typescript
diagnoser.add(
  value,
  `Cannot find entity definition: ${id}`,
  DiagnosticSeverity.error,
  'behaviorpack.entity.missing'
);
```

### 🟡 Warning

**When to use:** Issues that might cause problems or are bad practice

**Examples:**
- Missing optional resources
- Deprecated features
- Component groups not found

```typescript
diagnoser.add(
  path,
  `Event uses deprecated run_command, use queue_command instead`,
  DiagnosticSeverity.warning,
  'behaviorpack.entity.event.run_command'
);
```

### 🔵 Info

**When to use:** Suggestions and optimization opportunities

**Examples:**
- Unnecessary code
- Performance improvements
- Style suggestions

```typescript
diagnoser.add(
  event_id,
  "'randomize' only has one entry and can be removed",
  DiagnosticSeverity.info,
  'behaviorpack.entity.event.randomize.length'
);
```

### ⚪ Hint

**When to use:** Subtle suggestions that don't impact functionality

**Examples:**
- Code style preferences
- Minor optimizations

---

## Best Practices

### ✅ Do's

| Practice | Example |
|----------|---------|
| **Use consistent codes** | Follow `category.subcategory.type` pattern |
| **Be specific** | Include problematic value in message |
| **Be concise** | Keep messages short and clear |
| **Suggest fixes** | Tell user how to resolve the issue |
| **Reuse functions** | Use existing utilities like `Errors.missing()` |

### ❌ Don'ts

| Anti-pattern | Why |
|--------------|-----|
| Vague messages | "Error" tells user nothing |
| Generic codes | "error" doesn't categorize |
| Missing context | User can't identify the problem |
| Overly long messages | Hard to read in IDE |

### Message Examples

```typescript
// ❌ Bad: Vague
diagnoser.add(value, 'Error', DiagnosticSeverity.error, 'error');

// ✅ Good: Clear and specific
diagnoser.add(
  value,
  `Cannot find behavior pack animation: ${id}`,
  DiagnosticSeverity.error,
  'behaviorpack.animation.missing'
);
```

```typescript
// ❌ Bad: No context
diagnoser.add(value, 'Invalid value', DiagnosticSeverity.error, 'invalid');

// ✅ Good: Shows problematic value
diagnoser.add(
  value,
  `Invalid integer value: ${value.text}`,
  DiagnosticSeverity.error,
  'general.integer.invalid'
);
```

### Position Types

```typescript
// Object property path
diagnoser.add('events/my_event/trigger', message, severity, code);

// Text offset (OffsetWord)
diagnoser.add(value, message, severity, code);

// Document location
diagnoser.add({ line: 10, character: 5 }, message, severity, code);
```

### Reuse Utilities

Create reusable functions for common patterns:

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

### Handle Edge Cases

```typescript
// Check for undefined
if (data === undefined) return;

// Handle single values and arrays
const groups = typeof value === 'string' ? [value] : value;
```

---

## Examples

### 1. Simple Validation

**Task:** Check if boolean value is valid

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

### 2. Missing Resource Check

**Task:** Verify animation exists

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
  // Continue validation...
}
```

### 3. Component Validation

**Task:** Create reusable component checker

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
const checks: Record<string, ComponentCheck<Entity>> = {
  'minecraft:is_tamed': component_error(
    'This component requires rideable entities',
    'behaviorpack.entity.component.is_tamed.invalid'
  ),
};
```

### 4. Deprecated Feature Warning

**Task:** Warn about deprecated properties

```typescript
if (event.run_command) {
  diagnoser.add(
    `events/${event_id}`,
    `Event uses deprecated run_command, use queue_command instead`,
    DiagnosticSeverity.warning,
    'behaviorpack.entity.event.run_command'
  );
}
```

### 5. Complex Selector Validation

**Task:** Multiple validation checks with different error codes

```typescript
export function minecraft_selector_diagnose(
  pattern: ParameterInfo,
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder
) {
  const sel = value.text;

  // Validate selector syntax
  if (sel.startsWith('@')) {
    const selector = Minecraft.Selector.Selector.parse(sel, value.offset);
    if (selector === undefined) {
      diagnoser.add(
        value,
        'Invalid selector',
        DiagnosticSeverity.error,
        'minecraft.selector.invalid'
      );
    }
    return;
  }
  
  // Handle fake entities
  const name = Text.UnQuote(sel);
  if (pattern.options?.allowFakePlayers === false) {
    diagnoser.add(
      value,
      'No fake players / names allowed',
      DiagnosticSeverity.error,
      'minecraft.selector.invalid'
    );
  }
}
```

---

## Common Utilities

### Errors.missing()

Shorthand for missing resource errors:

```typescript
import { Errors } from '../..';

const anim = diagnoser.context
  .getProjectData()
  .behaviors.animations.get(anim_id, diagnoser.project);

if (anim === undefined) {
  // Generates code: "behaviorpack.animations.missing"
  return Errors.missing('behaviors', 'animations', anim_id, diagnoser);
}
```

### Component Helpers

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

---

## Testing

### Test Checklist

1. ✅ Create test file in `packages/bedrock-diagnoser/test/`
2. ✅ Add valid and invalid test cases
3. ✅ Verify diagnostic code matches
4. ✅ Test edge cases (undefined, empty strings)

### Example Test

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

---

## Resources

| Resource | Location |
|----------|----------|
| DiagnosticsBuilder Interface | `packages/bedrock-diagnoser/src/types/diagnostics-builder.ts` |
| Existing Examples | `packages/bedrock-diagnoser/src/diagnostics/` |
| Error Utilities | `packages/bedrock-diagnoser/src/diagnostics/errors/` |
| Contributing Guide | [CONTRIBUTING.md](../../CONTRIBUTING.md) |

---

## Need Help?

1. Check existing diagnostics in similar categories
2. Review the [Contributing Guide](../../CONTRIBUTING.md)
3. Open an issue for discussion
4. Join community discussions

---

**Happy Diagnosing!** 🔍
