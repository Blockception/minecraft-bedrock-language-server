# UI (`resource_pack/ui`) Support Guide

A standalone guide to the extension's support for Minecraft Bedrock Edition's JSON UI files, located under a resource pack's `ui/` folder.

---

## Table of Contents

- [Overview](#overview)
- [Diagnostics](#diagnostics)
  - [Control Type Errors](#control-type-errors)
  - [Inheritance (`@`) Errors](#inheritance--errors)
  - [Variable (`$`) Errors](#variable--errors)
  - [Binding Errors](#binding-errors)
  - [`_ui_defs.json` Registry Errors](#_ui_defsjson-registry-errors)
- [What Isn't Checked](#what-isnt-checked)
- [Diagnostic Code Reference](#diagnostic-code-reference)
- [Disabling a Diagnostic](#disabling-a-diagnostic)

---

## Overview

UI files define custom screens and modded menus using Minecraft's JSON UI format. The extension indexes every element across a resource pack and reports:

- Unrecognized or legacy control `type` values
- Broken or unresolvable `@` inheritance references
- `$variable` usages that are never declared anywhere in the project
- Malformed `bindings` entries
- Entries in `ui/_ui_defs.json` that don't resolve to a real file in the pack

All UI diagnostics are reported at `warning` severity.

---

## Diagnostics

### Control Type Errors

Every element and control's `type` field is checked against the set of control types Minecraft currently supports (`panel`, `label`, `button`, `image`, `grid`, etc.).

- A `type` that was never a valid control (a typo) is reported as `resourcepack.ui.type.invalid`.
- A `type` that used to work but has since been removed (e.g. `tab`, `carousel_label`) is reported separately as `resourcepack.ui.type.legacy`, so you know it isn't just a typo.

A `type` given as a `$variable` is resolved dynamically and is not checked.

### Inheritance (`@`) Errors

Elements and controls may extend another element with `my_control@namespace.parent`. The extension resolves `parent` (qualifying a bare name with the current file's `namespace`, if any) against every indexed UI element in the resource pack.

If the parent cannot be found, `resourcepack.ui.inheritance.missing` is reported on the key.

A parent supplied through a `$variable` (e.g. `my_control@$parent_name`) is resolved at runtime and cannot be statically checked, so it is skipped.

### Variable (`$`) Errors

The extension walks each element's `$variable` declarations — its own, every ancestor's in its `@` inheritance chain, any project-wide declaration of the same element, and `ui/_global_variables.json` — before checking usages.

A `$variable` used in a value but never declared anywhere in that set is reported as `resourcepack.ui.variable.undefined`.

### Binding Errors

Each entry in a `bindings` array is checked:

- An unrecognized `binding_type` (anything other than `global`, `view`, `collection`, `collection_details`, `none`) is reported as `resourcepack.ui.binding.type.invalid`.
- An unrecognized `binding_condition` is reported as `resourcepack.ui.binding.condition.invalid`.
- A `binding_type` of `collection` or `collection_details` without a `binding_collection_name` is reported as `resourcepack.ui.binding.collection_name.missing`.

### `_ui_defs.json` Registry Errors

`ui/_ui_defs.json` is the explicit list of UI files Minecraft actually loads for a resource pack. The extension validates it separately from ordinary UI files:

- A non-string entry in `ui_defs` is reported as `resourcepack.ui.defs.entry.invalid`.
- A listed path that doesn't resolve to a real file in the pack (respecting `.mcignore`) is reported as `resourcepack.ui.defs.missing_file`.

---

## What Isn't Checked

- `@` parents and control `type`s supplied through a `$variable` are resolved at runtime and are not statically validated.
- `$variable` usages nested under an `@` link that itself couldn't be resolved are not checked, since the inherited declarations they might rely on can't be reliably collected.
- A variable counts as "declared" if it is declared *anywhere* in the project under the same element id, even in a different file — this avoids false positives for legitimately inherited variables, but means a variable declared only on an unrelated element of the same name will also be accepted.

---

## Diagnostic Code Reference

| Code | Severity | Description |
|---|---|---|
| `resourcepack.ui.type.invalid` | Warning | Unrecognized control `type` |
| `resourcepack.ui.type.legacy` | Warning | Control `type` that no longer works |
| `resourcepack.ui.inheritance.missing` | Warning | `@` parent reference does not resolve |
| `resourcepack.ui.variable.undefined` | Warning | `$variable` used but never declared |
| `resourcepack.ui.binding.type.invalid` | Warning | Unrecognized `binding_type` |
| `resourcepack.ui.binding.condition.invalid` | Warning | Unrecognized `binding_condition` |
| `resourcepack.ui.binding.collection_name.missing` | Warning | Collection binding missing `binding_collection_name` |
| `resourcepack.ui.defs.entry.invalid` | Warning | Non-string entry in `ui_defs` |
| `resourcepack.ui.defs.missing_file` | Warning | `ui_defs` entry does not resolve to a file in the pack |

---

## Disabling a Diagnostic

Any of the codes above can be disabled per-file, per-line, or project-wide. See the [mc-disable guide](../mc-disable.md) for `// mc-disable` / `// mc-disable-next-line` comments, or add it to your `.mcattributes` file:

```ini
diagnostic.disable.resourcepack.ui.type.legacy=true
```
