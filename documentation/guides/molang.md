# Molang Language Support Guide

A standalone guide to working with Molang in the Minecraft Bedrock Language Server extension. Whether you are a new content creator or a veteran script author, this guide explains every Molang-related feature the extension provides so you can write scripts faster and with fewer mistakes.

---

## Table of Contents

- [Overview](#overview)
- [Syntax Highlighting & Language Files](#syntax-highlighting--language-files)
- [Auto-Completion (IntelliSense)](#auto-completion-intellisense)
  - [Top-Level Namespaces](#top-level-namespaces)
  - [Query Functions (`query` / `q`)](#query-functions-query--q)
  - [Math Functions (`math` / `m`)](#math-functions-math--m)
  - [Variables (`variable` / `v`)](#variables-variable--v)
  - [Temp Variables (`temp` / `t`)](#temp-variables-temp--t)
  - [Context Variables (`context` / `c`)](#context-variables-context--c)
  - [Resource References](#resource-references)
  - [Animations & Animation Controllers](#animations--animation-controllers)
  - [Pack-Aware Completions](#pack-aware-completions)
- [Hover Documentation](#hover-documentation)
- [Diagnostic Errors & Warnings](#diagnostic-errors--warnings)
  - [Syntax Errors](#syntax-errors)
  - [Scope & Identifier Errors](#scope--identifier-errors)
  - [Function Errors](#function-errors)
  - [Variable Undefined Errors](#variable-undefined-errors)
  - [Optimization Hints](#optimization-hints)
- [Diagnostic Code Reference](#diagnostic-code-reference)
- [Practical Tips to Avoid Common Errors](#practical-tips-to-avoid-common-errors)
- [Debugging & Iterating on Molang Scripts](#debugging--iterating-on-molang-scripts)
- [Cheat Sheet Command](#cheat-sheet-command)

---

## Overview

Molang is Minecraft Bedrock Edition's expression language used in animations, animation controllers, render controllers, entities, particles, and more. The extension provides:

- **Syntax highlighting** for standalone `.molang` files and Molang expressions embedded inside JSON files.
- **IntelliSense completions** for all built-in namespaces, query functions, math functions, and project-defined variables.
- **Hover documentation** with parameter descriptions and deprecation notices.
- **Real-time diagnostics** (errors, warnings, and informational hints) for syntax mistakes, unknown functions, wrong argument counts, wrong pack placement, and optimization opportunities.

---

## Syntax Highlighting & Language Files

The extension registers a dedicated language identifier for Molang (`mc-molang`). Standalone Molang files (`.molang`) receive full syntax highlighting for:

- Namespaces (`query`, `math`, `variable`, `temp`, `context`, `geometry`, `texture`, `material`, `this`)
- Operators (`+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`, `?:`, `??`)
- String literals, numeric literals, and boolean constants
- Statement terminators (`;`)
- Function calls and their argument lists

Molang expressions embedded as string values inside JSON files (for example, in animation controllers or render controllers) are also recognized and highlighted automatically.

---

## Auto-Completion (IntelliSense)

The extension triggers IntelliSense for Molang expressions in two ways:

1. **In `.molang` files** – completions are active everywhere in the document.
2. **Inside JSON strings** – completions activate when the extension detects that the string value is a Molang expression (e.g., transition conditions, animation blend weights).

### Top-Level Namespaces

When you start typing a Molang expression from scratch, the extension offers all valid top-level namespaces:

| Label | Kind | Description |
|---|---|---|
| `query` | Class | Game query functions |
| `variable` | Variable | Entity-defined variables |
| `math` | Class | Math utility functions |
| `texture` | Property | Texture resource references |
| `material` | Property | Material resource references |
| `geometry` | Property | Geometry resource references |
| `temp` | Variable | Temporary (per-evaluation) variables |
| `this` | Struct | Reference to the current object |

> **Tip:** The short-form aliases (`q.`, `v.`, `m.`, `t.`, `c.`) are also supported and trigger the same completions.

### Query Functions (`query` / `q`)

After typing `query.` or `q.`, the extension lists every built-in query available in the current pack. Each completion item includes:

- The full query name (e.g., `query.is_baby`)
- Inline documentation describing what the query returns
- Parameter names and their descriptions when the query accepts arguments (e.g., `query.get_actor_info_id(identifier)`)
- A **deprecated** badge and a replacement suggestion for queries that have been superseded

### Math Functions (`math` / `m`)

After typing `math.` or `m.`, the extension lists all built-in math functions with their parameter lists:

- `math.abs(value)` – absolute value
- `math.sin(degrees)`, `math.cos(degrees)` – trigonometric functions
- `math.sqrt(value)` – square root
- `math.clamp(value, min, max)` – clamp a value to a range
- `math.lerp(start, end, t)` – linear interpolation
- … and many more

### Variables (`variable` / `v`)

After typing `variable.` or `v.`, the extension lists all variables that have been **defined** in the current project (entities, animations, etc.). Only variables that appear in an assignment (`variable.foo = …`) in any project file are suggested here, so the list stays relevant to your project.

### Temp Variables (`temp` / `t`)

After typing `temp.` or `t.`, the extension lists temporary variables referenced elsewhere in the current expression set.

### Context Variables (`context` / `c`)

After typing `context.` or `c.`, the extension lists context variables available for the entity type associated with the current file (e.g., `context.other`, `context.player_offhand_arm_angle`).

### Resource References

| Prefix | What is listed |
|---|---|
| `geometry.` | Geometry definitions found in the current resource pack |
| `texture.` | Texture shorthand names from render controllers / entity client files |
| `material.` | Material names available in the pack |

After typing `animation.` or `controller.`, the extension suggests animation and animation-controller IDs from the appropriate pack (behavior pack or resource pack, based on the file's location).

### Pack-Aware Completions

The extension detects whether the file being edited belongs to a **behavior pack** or a **resource pack** and adjusts completions accordingly:

- Animation and animation-controller suggestions come from the correct pack type.
- Queries that are only valid in one pack type are not shown when working in the other.

---

## Hover Documentation

Hovering over any Molang identifier shows a tooltip with:

- **For query functions:** full name, description, and a list of accepted parameters with their types and documentation.
- **For math functions:** name, description, and parameter list.
- **For deprecated items:** a notice indicating the function is deprecated plus the recommended replacement.
- **For variable/context namespaces:** a short description of the namespace.

Example hover content for `query.is_baby`:

```
query.is_baby

Returns 1.0 if the entity is a baby, 0.0 otherwise.
```

Example hover content for a deprecated query:

```
query.has_cape

Deprecated: replace with query.cape_texture
```

---

## Diagnostic Errors & Warnings

The extension validates Molang expressions in real time and reports problems directly in the editor. Diagnostics appear as red (error), yellow (warning), or blue (info) underlines. Open the **Problems** panel (`Ctrl+Shift+M`) to see a full list.

### Syntax Errors

If an expression cannot be parsed at all, you receive an error at the exact character position where parsing failed.

**Common causes:**

- Unclosed parentheses: `math.sin(q.anim_time`
- Missing operand: `variable.speed *`
- Invalid character in an identifier

**Example diagnostic:**

```
[error] molang.syntax.unexpected_token – Unexpected token ';' at position 18
```

### Scope & Identifier Errors

| Situation | Diagnostic Code | Severity |
|---|---|---|
| Nothing after `scope.` (e.g., `variable.`) | `molang.identifier.invalid` | Error |
| Unrecognised namespace (e.g., `foo.bar`) | `molang.identifier.scope` | Error |

**Valid scopes:** `query`/`q`, `math`/`m`, `variable`/`v`, `temp`/`t`, `context`/`c`, `geometry`, `texture`, `material`, `array`, `this`.

Using any other namespace prefix is reported as `molang.identifier.scope`.

### Function Errors

| Situation | Diagnostic Code | Severity |
|---|---|---|
| Function scope is not `query`/`math` | `molang.function.scope` | Error |
| Function does not exist (e.g., `query.typo`) | `molang.function.query.typo` | Error |
| Function is deprecated | `molang.function.deprecated` | Error |
| Function used in wrong pack type | `molang.function.wrong_pack_type` | Error |
| Wrong number of arguments | `molang.function.arguments` | Error |
| Wrong argument type | `molang.function.arguments.type` | Error |

**Example – deprecated function:**

```
[error] molang.function.deprecated – molang function has been deprecated:
    replace it with: query.cape_texture
```

**Example – wrong pack type:**

```
[error] molang.function.wrong_pack_type – query.movement_direction is only available in
    Behavior Packs, but is being used in a Resource Pack
```

**Example – wrong argument count:**

```
[error] molang.function.arguments – wrong amount of arguments, expected 3 but got 2
```

### Variable Undefined Errors

When the extension can determine that a variable or resource reference is **used** but never **assigned** anywhere in the project, it reports:

```
[error] molang.variable.undefined – variable.speed is used by, but no definition is found
    by: Entities with id: foo:my_entity
```

This cross-file check works across the entire workspace so orphaned variable references are caught even when the assignment lives in a different file.

### Optimization Hints

Optimization diagnostics are informational (`info` severity) – they do not prevent Minecraft from running the expressions, but they highlight code that can be simplified for clarity or performance.

| Situation | Diagnostic Code | Example |
|---|---|---|
| Identity operation (no effect) | `molang.optimization.identity-operation` | `variable.x + 0`, `variable.x * 1` |
| Constant result | `molang.optimization.constant-result` | `variable.x * 0` |
| Constant folding opportunity | `molang.optimization.constant-folding` | `2.0 + 3.0` |
| Redundant boolean comparison | `molang.optimization.redundant-comparison` | `query.is_baby == true` |
| Double negation | `molang.optimization.double-negation` | `!!query.is_baby` |
| Redundant unary plus | `molang.optimization.redundant-unary` | `+variable.speed` |
| Constant condition in ternary | `molang.optimization.constant-condition` | `true ? 1.0 : 0.0` |

**Example messages:**

```
[info] molang.optimization.identity-operation – addition with 0 has no effect, replace with variable.x
[info] molang.optimization.redundant-comparison – comparison with true is redundant, use the left expression directly
[info] molang.optimization.double-negation – double negation can be simplified by removing both negations
[info] molang.optimization.constant-folding – constant expression can be pre-calculated at author time
```

---

## Diagnostic Code Reference

| Code | Severity | Description |
|---|---|---|
| `molang.syntax.*` | Error | Parsing / syntax failure |
| `molang.identifier.invalid` | Error | Nothing after the `.` separator |
| `molang.identifier.scope` | Error | Unrecognised namespace prefix |
| `molang.function.scope` | Error | Function call on a non-function namespace |
| `molang.function.<scope>.<id>` | Error | Unknown function name |
| `molang.function.deprecated` | Error | Deprecated function |
| `molang.function.wrong_pack_type` | Error | Function unavailable in this pack type |
| `molang.function.arguments` | Error | Wrong number of arguments |
| `molang.function.arguments.type` | Error | Wrong argument type |
| `molang.variable.undefined` | Error | Variable used but never assigned |
| `molang.context.undefined` | Error | Context variable used but not defined |
| `molang.optimization.identity-operation` | Info | No-op arithmetic (e.g., `+ 0`) |
| `molang.optimization.constant-result` | Info | Expression always produces the same value |
| `molang.optimization.constant-folding` | Info | Two literal values can be pre-computed |
| `molang.optimization.redundant-comparison` | Info | Comparison with a boolean literal |
| `molang.optimization.double-negation` | Info | `!!expr` can be simplified |
| `molang.optimization.redundant-unary` | Info | Unary `+` has no effect |
| `molang.optimization.constant-condition` | Info | Ternary condition is always true or false |

---

## Practical Tips to Avoid Common Errors

### 1. Always use a recognised namespace

Only the following prefixes are valid in Molang:

```
query.   q.
math.    m.
variable. v.
temp.    t.
context. c.
geometry.
texture.
material.
array.
this
```

Any other prefix (e.g., `entity.speed`) will be flagged as `molang.identifier.scope`.

### 2. Assign variables before using them

The extension performs cross-file analysis. If `variable.speed` is used in an animation but never assigned in any entity or animation file, you will see `molang.variable.undefined`. Fix it by adding an initialization in the entity definition:

```json
"scripts": {
  "initialize": [ "variable.speed = 0.0;" ]
}
```

### 3. Use short aliases sparingly in team projects

`q.is_baby` and `query.is_baby` are identical to Minecraft, but mixing both forms inside the same project can make code harder to read. Pick one convention and stick to it.

### 4. Match argument counts exactly

Many queries require a fixed number of arguments. Check the hover tooltip or completion item documentation before calling a query with parameters. Example of a common mistake:

```
# Wrong: missing argument
query.get_equipped_item_name()

# Correct
query.get_equipped_item_name(0)
```

### 5. Do not use deprecated queries

The extension flags deprecated queries as **errors** so they are easy to spot. Follow the replacement suggestion shown in the hover tooltip or the diagnostic message. Deprecated queries may be removed in future Minecraft releases.

### 6. Use the correct query in the correct pack

Some queries only exist in Behavior Packs (e.g., server-side entity queries) while others are Resource Pack-only (e.g., rendering-related queries). The extension reports `molang.function.wrong_pack_type` when you use a query in the wrong context. Move the expression to the correct pack or find the equivalent query for the target pack.

### 7. Address optimization hints for cleaner scripts

Optimization hints (`info` severity) do not block functionality, but they often point to logic mistakes:

- `variable.speed * 0` almost certainly is a bug – the result is always `0`.
- `!!query.is_baby` can simply be `query.is_baby` (double negation cancels out).
- `2.0 + 3.0` wastes evaluation time – replace with `5.0` directly.

### 8. Use temporary variables to avoid repeating expensive queries

Molang evaluates every expression from scratch each frame. If you use the same query result multiple times, store it in a `temp` variable:

```
# Inefficient – query called twice
(query.is_baby ? 0.5 : 1.0) * query.is_baby
```

```
# Better – query called once
temp.is_baby = query.is_baby;
temp.is_baby ? 0.5 * temp.is_baby : 1.0
```

---

## Debugging & Iterating on Molang Scripts

### Step 1: Open the Problems Panel

Press `Ctrl+Shift+M` (Windows/Linux) or `Cmd+Shift+M` (macOS) to open the **Problems** panel. Every Molang diagnostic in your workspace is listed here with the file name, line, column, severity, and code.

### Step 2: Run a full project diagnosis

Use the command palette (`Ctrl+Shift+P`) and run:

```
Blockception: Run diagnose on project
```

This forces the extension to re-validate every file in the workspace, which is useful after adding new files or renaming variables.

### Step 3: Hover over underlined code

Hover over any red-underlined Molang token to see the full diagnostic message, including the diagnostic code and (for deprecated queries) the recommended replacement.

### Step 4: Use IntelliSense to explore available functions

When you are unsure which query to use, type `query.` and browse the completion list. Each item shows a description. For queries with parameters, the description lists the parameter names and what they represent.

### Step 5: Check the Molang Cheat Sheet

Open the command palette and run:

```
Blockception: Cheat sheet: Molang
```

This opens an in-editor reference of all Molang queries and math functions, useful when you want to search across the full API without leaving the editor.

### Step 6: Inspect Minecraft content logs

If an expression passes extension validation but still behaves unexpectedly in-game, check the **Minecraft content log**. Use the command:

```
Blockception: Open latest errors
```

This opens the most recent content log produced by Minecraft, where Molang runtime errors are reported.

### Step 7: Iterate with small changes

Molang expressions are re-validated every time you save. A tight edit-save loop (or enabling auto-save) lets you see diagnostics appear and disappear in real time as you fix issues.

---

## Cheat Sheet Command

The extension exposes a dedicated Molang cheat sheet through the command palette:

| Command | Description |
|---|---|
| `Blockception: Cheat sheet: Molang` | Opens an in-editor view listing all Molang queries, math functions, and their parameters |

This is the fastest way to look up a query signature without leaving the editor or opening a browser.

---

**Happy scripting!** 🎮
