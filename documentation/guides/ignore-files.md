# Working with Ignore Files

This guide covers everything you need to know about using ignore files in Minecraft Bedrock projects — what they are, when to use them, and how to avoid common pitfalls.

## Table of Contents

- [Overview](#overview)
- [Supported Ignore File Types](#supported-ignore-file-types)
- [Syntax Overview](#syntax-overview)
- [Practical Scenarios](#practical-scenarios)
- [Common Mistakes and Debugging](#common-mistakes-and-debugging)
- [Best Practices](#best-practices)

---

## Overview

The language server scans your entire project folder to provide diagnostics, autocomplete, and validation. By default it processes every file it finds — including third-party content, generated output, and temporary files that are not part of your actual source. This can cause:

- **False positives** — errors reported for files you do not own or maintain
- **Slow scans** — large vendored or generated folders increase scan time noticeably
- **Misleading results** — experimental or template content pollutes the diagnostics panel

Ignore files let you tell the language server which paths to skip, so that only the files that matter to you are validated.

---

## Supported Ignore File Types

### `.mcignore`

The primary ignore file for Minecraft Bedrock projects. Place it in the root of your workspace alongside your `.mcattributes` and `.mcdefinitions` files.

```
my-project/
├── .mcattributes
├── .mcdefinitions
├── .mcignore          ← here
├── behavior_packs/
└── resource_packs/
```

The `.mcignore` file is based on the same concept as `.gitignore`: each line is a glob pattern that matches files and folders to be excluded from scanning and diagnostics.

### Creating the `.mcignore` File

You can create the file with the **`Create MCProject files`** command in VS Code (`Blockception: Create MCProject files`). This creates a starter `.mcignore` alongside the other project configuration files. The file uses the **`bc-minecraft-project`** language mode, which provides syntax highlighting.

> You can also create the file manually — just name it exactly `.mcignore` (no extension, leading dot) and place it in the workspace root.

---

## Syntax Overview

### Basic Patterns

Each non-empty line in `.mcignore` is treated as a glob pattern. Lines starting with `#` or `##` are comments.

```ini
## This is a comment

## Ignore a specific folder by name (anywhere in the project)
Template

## Ignore a folder by explicit path from the workspace root
packs/vendor

## Ignore any file with a specific name extension, in any folder
**/*.template.json

## Ignore everything inside a folder
out/**
```

### Negation Patterns

Prefix a pattern with `!` to **re-include** paths that a previous pattern excluded. This is useful when you want to ignore a whole folder but keep a few specific files:

```ini
## Ignore the entire Template folder...
Template

## ...but still validate these specific files
!Template/settings.json
!Template/manifest.json
```

### Pattern Reference

| Pattern | What it matches |
|---------|----------------|
| `Temp` | Any file or folder named `Temp` at any depth |
| `Temp/` | A folder named `Temp` at any depth |
| `packs/vendor` | A specific path relative to the workspace root |
| `packs/vendor/**` | Everything inside `packs/vendor/` |
| `**/*.generated.json` | Any `.generated.json` file, at any depth |
| `!BP/**/*.json` | Re-include all JSON files inside any `BP` folder |

> **Tip:** Patterns without a leading `/` or `**` match at any level of the directory tree, similar to `.gitignore`.

---

## Practical Scenarios

### Scenario 1: Excluding Third-Party or Vendored Packs

If your project includes packs from another team or a marketplace download, you don't want the language server validating their content — it will report errors for things outside your control.

```ini
## Third-party packs downloaded from marketplace
packs/vendor/**

## A dependency managed externally
BP_External/**
RP_External/**
```

### Scenario 2: Skipping Build Output and Generated Files

Many workflows generate files as part of a build step (e.g. compiled scripts, auto-generated JSON, exported textures). These should not be validated because they are not hand-authored source files.

```ini
## Build output folders
out/**
dist/**
build/**

## Auto-generated JSON from a build script
**/*.generated.json
**/*.min.json
```

### Scenario 3: Excluding Test Packs

Development projects often include test packs or fixture data used only during automated testing. Excluding them keeps the diagnostics panel focused on your shipping content.

```ini
## Test packs and fixture data
test/**
tests/**
**/fixtures/**
**/test_data/**
```

### Scenario 4: Ignoring Heavy Resource Folders

Large texture atlases, high-resolution images, or sound banks can slow down the project scan without contributing any diagnosable content.

```ini
## Large asset folders that do not need validation
resource_packs/MyRP/textures/ui/**
resource_packs/MyRP/sounds/**
```

### Scenario 5: Template Folders with Selective Inclusion

You might keep template files in your workspace for reference while only wanting to validate a few key files within them.

```ini
## Ignore everything in the Template folder...
Template

## ...but keep the manifest and settings so they are validated
!Template/manifest.json
!Template/settings.json
```

### Scenario 6: Ignoring OS and Editor Artifacts

Operating systems and editors sometimes leave behind files that are not part of your project:

```ini
## Windows Explorer metadata
**/desktop.ini
**/$RECYCLE.BIN/**

## macOS metadata
**/.DS_Store

## Node.js dependencies (if using scripting)
**/node_modules
```

---

## Common Mistakes and Debugging

### Mistake 1: Changes Not Taking Effect

**Symptom:** You added or updated patterns in `.mcignore` but the files are still being validated.

**Fix:** After editing `.mcignore`, trigger a rescan using the **`bc.minecraft.project.scan`** command (`Blockception: (Re) Scan the minecraft project`). The language server does not automatically re-apply ignore rules to already-open files until the project is rescanned.

---

### Mistake 2: Patterns That Are Too Broad

**Symptom:** Files you want validated are no longer showing diagnostics.

**Example of an overly broad pattern:**
```ini
## Intended to ignore vendor folder, but ignores all BP folders
BP/**
```

**Fix:** Be more specific with the path:
```ini
## Only ignores files inside the vendor behavior pack
BP/vendor/**
```

---

### Mistake 3: Negation Patterns Not Working

**Symptom:** A `!` pattern does not seem to re-include a file.

**Cause:** Negation only works when the file was excluded by a pattern that came **before** the negation in the file. Order matters — the last matching pattern wins.

```ini
## ❌ This does not work — negation comes before the exclusion
!Template/settings.json
Template

## ✅ This works — negation comes after the exclusion
Template
!Template/settings.json
```

---

### Mistake 4: Wrong File Name or Location

**Symptom:** None of your patterns are being applied.

**Fix:** Verify that:
1. The file is named exactly `.mcignore` (with a leading dot, no extension)
2. The file is in the **root** of your workspace folder, not inside a sub-folder
3. The file uses plain text — not a `.txt` or `.ini` extension

---

### Mistake 5: Path Separator Issues

**Symptom:** A pattern works on one OS but not another.

**Fix:** Use forward slashes (`/`) in all patterns, regardless of your operating system. The language server normalizes paths internally.

```ini
## ✅ Use forward slashes
packs/vendor/**

## ❌ Avoid backslashes
packs\vendor\**
```

---

### Debugging Checklist

If your `.mcignore` patterns are not behaving as expected, work through this checklist:

1. **Is the file in the right place?** — workspace root, named exactly `.mcignore`
2. **Did you rescan?** — run `bc.minecraft.project.scan` after every edit
3. **Is pattern order correct?** — negations (`!`) must come after the exclusion pattern
4. **Is the pattern too broad or too narrow?** — test the glob pattern against a path manually
5. **Are you using forward slashes?** — backslashes are not supported

---

## Best Practices

### 1. Start Minimal

Add patterns only when you have a concrete reason: a false positive, a slow scan, or content you are not responsible for. An empty `.mcignore` is a perfectly valid starting point.

### 2. Comment Your Patterns

Every pattern that is not obvious should have a comment explaining why it exists. This helps teammates understand the reasoning:

```ini
## Vendored pack from the Marketplace — do not modify or diagnose
packs/vendor/**

## Build output — generated by our toolchain, not hand-authored
dist/**
```

### 3. Prefer Explicit Paths Over Broad Wildcards

Narrow patterns are safer. A pattern like `packs/vendor/**` is much less likely to accidentally exclude something important than `**/*.json`.

### 4. Include `.mcignore` in Version Control

Commit `.mcignore` to your repository so that all team members and CI systems benefit from the same exclusions. Treat it like `.gitignore` — it is a project configuration file.

### 5. Keep Negations Readable

When using negation patterns, group the exclusion and its exceptions together and add a comment:

```ini
## Ignore all templates except the shared manifest
Template/**
!Template/manifest.json
!Template/shared/**
```

### 6. Review Periodically

As your project evolves, the reasons for certain exclusions may no longer apply. Periodically review your `.mcignore` to remove patterns for folders that no longer exist or content that should now be validated.

---

## Related Documentation

- [MCIgnore Reference](../project/MCIgnore.md) — Quick syntax reference
- [Project Configuration](../project/README.md) — Overview of all project configuration files
- [MCAttributes](../project/MCAttributes.md) — Enable or disable specific diagnostics
- [Commands](../Commands.md) — Commands for creating project files and rescanning
- [Debugging](../Debugging.md) — How to debug the language server itself
