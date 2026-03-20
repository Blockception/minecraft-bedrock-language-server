# Guide: Project Templates and Recommended Practices

This guide covers everything you need to know about using project templates with the Minecraft Bedrock Language Server extension — from finding the right template to adapting it for your team and keeping it up to date over time.

## Table of Contents

- [Overview](#overview)
- [Where to Find Templates](#where-to-find-templates)
- [Which Template Fits Your Scenario](#which-template-fits-your-scenario)
- [Starting a Project from a Template (Step-by-Step)](#starting-a-project-from-a-template-step-by-step)
- [Adapting Templates to Your Team's Needs](#adapting-templates-to-your-teams-needs)
- [Maintenance and Updating Workflow](#maintenance-and-updating-workflow)
- [Recommended Practices](#recommended-practices)
- [Troubleshooting](#troubleshooting)
- [Related Documentation](#related-documentation)

---

## Overview

The extension provides a built-in **template system** that creates correctly-structured Minecraft Bedrock files for you. When you run a creation command (e.g., `Behavior Pack: Create entities file`), the extension:

1. Picks a default file name and content for the file type.
2. Replaces placeholder variables (like `${{id}}` or `${{uuid}}`) with actual values.
3. Writes the file to the correct location inside your pack.

By adding a `.mcattributes` file to your project you can override any of those defaults with your own file names, folder structures, and content templates — giving every team member a consistent starting point.

---

## Where to Find Templates

### Built-in defaults

Every creation command ships with a sensible default template. You do not need to configure anything to use them. Run any command from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) under the **Blockception** prefix:

| Command group      | Example command                                  |
| ------------------ | ------------------------------------------------ |
| General            | `Create BP-RP entities files`                    |
| General            | `Create all manifests`                           |
| Behavior pack (BP) | `Behavior Pack: Create entities file`            |
| Behavior pack (BP) | `Behavior Pack: Create block file`               |
| Resource pack (RP) | `Resource Pack: Create model file`               |
| Resource pack (RP) | `Resource Pack: Create the particle file`        |
| World              | `World: Create all manifest`                     |

See [Commands](../Commands.md) for the full list.

### Custom templates in your project

Store your own template files anywhere inside your workspace — a `templates/` folder at the project root is a common convention:

```
my-addon/
├── .mcattributes          ← points the extension at your templates
├── templates/
│   ├── entity.bp.json
│   ├── entity.rp.json
│   └── block.bp.json
├── behavior_packs/
└── resource_packs/
```

Register each template file in `.mcattributes` using the `template.<type>.file` and `template.<type>.filename` attributes (see [Templates](../template/templates.md) for every available attribute).

### Community resources

The broader Minecraft Bedrock addon community maintains starter packs and template repositories. Useful places to look:

- **[Blockception GitHub](https://github.com/Blockception)** — the organisation that maintains this extension; watch the repository for official examples.
- **[minecraft-bedrock-language-server issues & discussions](https://github.com/Blockception/minecraft-bedrock-language-server/issues)** — community questions often include shared snippets and mini-templates.
- Bedrock addon communities on Discord and Reddit regularly share starter projects that pair well with this extension.

---

## Which Template Fits Your Scenario

| Scenario | Recommended starting point |
|---|---|
| Brand-new solo project | Use the built-in defaults. Run `Create BP-RP entities files` or the relevant creation command and let the extension scaffold the file. |
| Solo project with strict naming conventions | Add `.mcattributes` with custom `filename` attributes only; leave `file` unset to keep default content. |
| Small team sharing a workspace | Add `.mcattributes` **and** a `templates/` folder, commit both to source control. Every team member gets identical files. |
| Large team or multiple addons | Create a dedicated templates repository or a shared workspace folder. Reference template files via relative paths in `.mcattributes`. |
| Education Edition project | Set `education.enable=true` in `.mcattributes` in addition to configuring templates. |
| Rapid prototyping | Use built-in defaults for speed; promote files to custom templates once the design stabilises. |

---

## Starting a Project from a Template (Step-by-Step)

### 1 — Install the extension

Install **Blockception's Minecraft Bedrock Development Extension** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=BlockceptionLtd.blockceptionvscodeminecraftbedrockdevelopmentextension) if you have not done so already.

### 2 — Open (or create) your workspace

Open the root folder of your addon project in VS Code. If starting from scratch, create an empty folder and open it.

### 3 — Create project configuration files

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run:

```
Blockception: Create MCProject files
```

This creates the `.mcattributes`, `.mcdefinitions`, and `.mcignore` files in your workspace root.

### 4 — Create your pack manifests

Run the manifest creation commands to scaffold the pack structure:

```
Create all manifests
```

Or create individual pack manifests:

```
Behavior Pack: Create manifest
Resource Pack: Create manifest
World: Create all manifest
```

The extension generates `manifest.json` files with fresh UUIDs and default metadata filled in.

### 5 — Create your first content files

Use the creation commands to generate starter files for each content type you need. For example, to add a custom entity:

1. Open the Command Palette and run `Behavior Pack: Create entities file`.
2. Enter an identifier when prompted, such as `myaddon:my_entity`.
3. The extension creates `entities/myaddon/my_entity.json` (or your custom path) with a valid skeleton.
4. Run `Resource Pack: Create entities files` to create the matching client-side entity file.

Repeat for blocks, items, animations, and any other types you need.

### 6 — (Optional) Customise templates for your project

If the default file names or file contents do not match your conventions, add template overrides to `.mcattributes`. See [Adapting Templates to Your Team's Needs](#adapting-templates-to-your-teams-needs) below.

### 7 — Commit to source control

Commit `.mcattributes`, `.mcdefinitions`, `.mcignore`, your `templates/` folder, and all generated files to your repository so every collaborator starts from the same baseline.

---

## Adapting Templates to Your Team's Needs

### Customising file naming

Add `template.<type>.filename` entries to `.mcattributes` to control where files are created and what they are named. The value is itself a template string that supports `${{variable}}` substitution.

```ini
# Place behavior-pack entities under entities/<namespace>/<name>.json
template.behavior.entity.filename=entities/${{id.safe}}.json

# Use a different naming convention for blocks
template.behavior.block.filename=blocks/${{id.safe.nonamespace}}.block.bp.json
template.resource.block.filename=blocks/${{id.safe.nonamespace}}.block.rp.json
```

### Customising file content

1. Create a template file in your `templates/` folder, for example `templates/entity.bp.json`:

```json
{
  "format_version": "1.21.0",
  "minecraft:entity": {
    "description": {
      "identifier": "${{id}}",
      "is_spawnable": true,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {},
    "components": {
      "minecraft:type_family": {
        "family": ["${{id.safe.nonamespace}}"]
      },
      "minecraft:collision_box": {
        "width": 1.0,
        "height": 1.0
      },
      "minecraft:physics": {}
    },
    "events": {}
  }
}
```

2. Point `.mcattributes` at that file:

```ini
template.behavior.entity.file=./templates/entity.bp.json
```

The extension reads your file, substitutes all `${{variable}}` placeholders, and writes the result to the path specified by `template.behavior.entity.filename`.

### Available variables

| Variable | Example output |
|---|---|
| `${{id}}` | `myaddon:my_entity` |
| `${{id.safe}}` | `myaddon_my_entity` |
| `${{id.safe.nonamespace}}` | `my_entity` |
| `${{uuid}}` | `a1b2c3d4-...` (random UUID) |
| `${{pack}}` | full path to the pack folder |
| `${{pack.type}}` | `behavior`, `resource`, `skin`, or `world` |
| `${{pack.type.short}}` | `bp`, `rp`, `sp`, or `wp` |
| `${{filename}}` | the output file name |
| `${{filepath}}` | the full output file path |
| `${{folder}}` | the output folder path |
| `${{project.attributes:author}}` | value of `author` in `.mcattributes` |

See [Variables](../template/variables.md) for the complete reference.

### Adding team metadata

You can store arbitrary key/value pairs in `.mcattributes` and reference them inside template files via `${{project.attributes:<key>}}`:

```ini
# .mcattributes
author=ACME Studios
namespace=acme
```

```json
{
  "metadata": {
    "authors": ["${{project.attributes:author}}"]
  }
}
```

### Full example `.mcattributes`

```ini
# Project settings
author=ACME Studios
education.enable=false
diagnostic.enable=true
diagnostic.mcfunctions=true

# Entity templates
template.behavior.entity.filename=entities/${{id.safe}}.json
template.behavior.entity.file=./templates/entity.bp.json
template.resource.entity.filename=entity/${{id.safe}}.json
template.resource.entity.file=./templates/entity.rp.json

# Block templates
template.behavior.block.filename=blocks/${{id.safe.nonamespace}}.block.bp.json
template.behavior.block.file=./templates/block.bp.json

# Animation controller templates
template.behavior.animation_controller.filename=animation_controllers/${{id.safe}}.json
```

---

## Maintenance and Updating Workflow

### Keep templates in version control

Always commit your `templates/` folder and `.mcattributes` file. Treating them as source code means:

- All team members use the same template version.
- Template changes are reviewable in pull requests.
- You can roll back to an earlier template version if needed.

### Updating template content

When the default Minecraft Bedrock format version changes (for example, from `1.20.41` to `1.21.0`), update the `format_version` field in your template files and commit the change. All new files created after that point will use the updated version.

Existing files must be updated manually, so keep a project-wide search (`Ctrl+Shift+F`) handy to find outdated format versions.

### Reviewing extension updates

When a new version of the extension is released:

1. Read the release notes on the [GitHub releases page](https://github.com/Blockception/minecraft-bedrock-language-server/releases).
2. Check whether any new template attributes have been added (see [Templates](../template/templates.md)).
3. Add entries for any new attributes you want to customise.

### Syncing across multiple addons

If your team maintains several addons that share template conventions:

- Extract the `templates/` folder and `.mcattributes` into a shared repository or a git submodule.
- Each addon repo references the shared templates via a relative path (e.g., `../../shared-templates/entity.bp.json`).
- When the shared templates change, update the submodule reference in each addon.

---

## Recommended Practices

| Practice | Rationale |
|---|---|
| Use `${{id.safe}}` (not `${{id}}`) for file names | Prevents invalid characters in file paths. |
| Start with built-in defaults | Only override what you actually need to change. |
| Organise templates in a `templates/` folder | Keeps template files clearly separated from pack content. |
| Commit `.mcattributes` and `templates/` to source control | Ensures consistent file creation across the whole team. |
| Add comments to `.mcattributes` | Explains why a setting is present, helping future contributors. |
| Test templates with a sample identifier after editing | Catches JSON syntax errors and missing variables early. |
| Bump `format_version` in templates when Minecraft updates | Keeps new files compatible with the current game version. |
| Use `.mcignore` to exclude the `templates/` folder from analysis | Prevents the language server from diagnosing template placeholder syntax as errors. |

### Excluding the templates folder from diagnostics

Template files use `${{...}}` placeholders that are not valid JSON. Add the folder to `.mcignore` to prevent false diagnostic errors:

```ini
# .mcignore
templates/
```

---

## Troubleshooting

**Template not being applied**

- Verify that `.mcattributes` is saved in the **project root** (the folder VS Code opened).
- Check that the `template.<type>.file` path is correct relative to the project root.
- Confirm the template file exists at that path.

**Variables not replaced**

- Use `${{variable}}` — double braces, not single (`${}`).
- Check the variable name against [Variables](../template/variables.md).

**Invalid JSON after file creation**

- Open the generated file and look for unreplaced `${{...}}` tokens — this means the variable name is incorrect.
- Run the file through a JSON validator to find syntax issues.
- Test the template by creating a file with a simple identifier (no special characters).

**Diagnostics reporting errors inside `templates/`**

- Add `templates/` to your `.mcignore` file (see above).

For further help, see the [Debugging](../Debugging.md) guide or [open an issue](https://github.com/Blockception/minecraft-bedrock-language-server/issues) on GitHub.

---

## Related Documentation

- [Templates](../template/templates.md) — Complete list of template attributes for all file types
- [Variables](../template/variables.md) — All available `${{variable}}` substitution tokens
- [MCAttributes](../project/MCAttributes.md) — Full `.mcattributes` reference
- [MCIgnore](../project/MCIgnore.md) — Excluding files from analysis
- [Commands](../Commands.md) — All creation and utility commands
