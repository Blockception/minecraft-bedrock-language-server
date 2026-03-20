# Guide: Using and Extending Command Autocompletion

This guide explains how to use the command autocompletion (IntelliSense) features of the Minecraft Bedrock Language Server extension, how to configure them, and how to extend them with your own custom content.

## Table of Contents

- [Overview](#overview)
- [Triggering Completion](#triggering-completion)
- [What Is Supported](#what-is-supported)
  - [MCFunction Files](#mcfunction-files)
  - [JSON Files](#json-files)
  - [MoLang Expressions](#molang-expressions)
- [Configuration](#configuration)
  - [VSCode Settings](#vscode-settings)
  - [Project-Level Settings (.mcattributes)](#project-level-settings-mcattributes)
- [MCFunction Completion In Depth](#mcfunction-completion-in-depth)
  - [Command Names](#command-names)
  - [Command Parameters](#command-parameters)
  - [Entity Selectors](#entity-selectors)
  - [Documentation Comments](#documentation-comments)
  - [Region Markers](#region-markers)
- [Education Edition Commands](#education-edition-commands)
- [Extending with Custom Content](#extending-with-custom-content)
  - [Automatic Project Indexing](#automatic-project-indexing)
  - [The .mcdefinitions File](#the-mcdefinitions-file)
- [Troubleshooting](#troubleshooting)
- [Related Resources](#related-resources)

---

## Overview

The Minecraft Bedrock Language Server provides **context-aware autocompletion** as you type in:

- `.mcfunction` files — command names, parameters, entity selectors, and more
- JSON files — property keys and values within behavior pack and resource pack files
- MoLang expressions — queries, variables, and math functions

Completions are built from three data sources:

| Source | Description |
|---|---|
| **Project data** | Your own custom entities, items, blocks, tags, objectives, etc., automatically indexed from your workspace |
| **Vanilla data** | All built-in Minecraft Bedrock commands, entities, items, blocks, sounds, and more |
| **Education data** | Education Edition commands and content (opt-in — see [Education Edition Commands](#education-edition-commands)) |

---

## Triggering Completion

Completions can appear in two ways:

1. **Automatically** — As you type, the extension suggests relevant completions based on context.
2. **Manually** — Press **Ctrl+Space** (Windows/Linux) or **⌃Space** (macOS) at any point to open the completion list.

If you dismiss the completion list and want it back, use the keyboard shortcut above.

---

## What Is Supported

### MCFunction Files

In `.mcfunction` files, the extension provides:

- **Command name completion** — All vanilla Bedrock commands are available (e.g., `give`, `execute`, `scoreboard`, `summon`).
- **Parameter completion** — Context-aware suggestions for each parameter in a command, including:
  - World coordinates (with `~` relative and `^` local notation)
  - Entity selectors (`@a`, `@e`, `@p`, `@r`, `@s`) and their arguments
  - Block IDs, item IDs, entity IDs
  - Effect names, sound IDs, particle IDs
  - Game modes, slot types, difficulty levels
  - Scoreboard objectives and tags from your project
  - MoLang expressions in commands that accept them
- **Execute subcommands** — The `execute` command's subcommands (e.g., `execute as`, `execute if block`, `execute run`) are fully supported with their own parameter completions.

### JSON Files

In behavior pack and resource pack JSON files, the extension completes:

- **Behavior pack files** — Entities, items, blocks, animations, animation controllers, loot tables, families, block states, trading data, structures, and function references.
- **Resource pack files** — Entity renderers, block textures/models, attachables, materials, animations, animation controllers, fog definitions, textures, particles, models, sound definitions, and render controllers.

### MoLang Expressions

In MoLang contexts (inside JSON or `.mcfunction` commands), the extension offers:

- Query functions (`query.*`)
- Math functions (`math.*`)
- Variables (`variable.*`, `temp.*`)
- Context variables (`context.*`)

---

## Configuration

### VSCode Settings

The following settings control autocompletion. Access them via **File → Preferences → Settings** and search for `BC-MC`.

| Setting | Default | Description |
|---|---|---|
| `BC-MC.Completion.JSON` | `true` | Enable/disable JSON completion |
| `BC-MC.Completion.Lang.Dynamic` | `true` | Enable dynamic language file completion |
| `BC-MC.Completion.Lang.Comments` | `true` | Enable comment-based completion (e.g., `### region` markers) |
| `BC-MC.Education.Enable` | `false` | Include Education Edition commands and content |
| `BC-MC.Diagnostics.Enable` | `true` | Enable diagnostics globally (affects related features) |

To disable a specific type of completion, set the corresponding setting to `false`.

### Project-Level Settings (.mcattributes)

You can also configure completion at the **project level** using a `.mcattributes` file in your project root. Project-level settings override VSCode settings for that specific project.

**Example `.mcattributes` file:**

```ini
education.enable=true
diagnostic.enable=true
diagnostic.mcfunction=true
```

| Attribute | Description |
|---|---|
| `education.enable` | Enable Education Edition commands and content for this project |
| `diagnostic.enable` | Enable/disable all diagnostics for this project |
| `diagnostic.mcfunction` | Enable/disable mcfunction diagnostics for this project |
| `diagnostic.json` | Enable/disable JSON diagnostics for this project |

See [MCAttributes](../project/MCAttributes.md) for the full list of attributes.

---

## MCFunction Completion In Depth

### Command Names

When you start a new line (or press **Ctrl+Space** at the beginning of a line), you will see a list of all available commands. Each completion item includes:

- The command name
- A brief description of what the command does
- A link to the official Microsoft documentation

Commands are organized and include all vanilla Bedrock commands such as:

```
give, execute, scoreboard, summon, teleport, kill, effect, gamemode, ...
```

### Command Parameters

After you type a command name and a space, the extension analyzes the command syntax and suggests appropriate values for the next parameter. For example:

```mcfunction
# After typing "give " you will see player selector suggestions
give @s

# After typing "give @s " you will see item ID suggestions
give @s minecraft:diamond

# After typing "give @s minecraft:diamond " you will see integer suggestions
give @s minecraft:diamond 1
```

The extension understands the full syntax of each command, including optional parameters, flags, and nested structures.

### Entity Selectors

When a command expects an entity target, the extension suggests selectors:

- `@a` — All players
- `@e` — All entities
- `@p` — Nearest player
- `@r` — Random player
- `@s` — Executing entity

After typing a selector with `[`, the extension also suggests **selector arguments** such as:

- `type=` — Entity type
- `tag=` — Entity tag
- `name=` — Entity name
- `scores={…}` — Score filters
- `hasitem=[…]` — Item predicates
- `hasproperty={…}` — Property predicates
- `r=`, `rm=` — Range filters
- `x=`, `y=`, `z=` — Position filters

Values for these arguments (e.g., entity types, tag names, objective names) are drawn from your project data and vanilla data.

### Documentation Comments

When you call an `.mcfunction` file from another function or command, the extension shows the **first comment line** of the called function as its description. This lets you document your functions to improve the autocompletion experience:

```mcfunction
# Gives the player 10 coins and plays a reward sound
scoreboard players add @s coins 10
playsound random.orb @s
```

When another file references this function, `Gives the player 10 coins and plays a reward sound` appears as the completion description.

### Region Markers

You can use `# region` and `# endregion` comments to create collapsible code regions in your `.mcfunction` files:

```mcfunction
# region Setup
scoreboard objectives add kills dummy
scoreboard objectives setdisplay sidebar kills
# endregion

# region Gameplay
...
# endregion
```

Typing `#` will offer these markers as completions.

---

## Education Edition Commands

By default, Education Edition commands (such as `ability`, `classroommode`, `immutableworld`) are **not included** in completions. To enable them:

**Option 1 — VSCode setting (global):**
Set `BC-MC.Education.Enable` to `true` in your VSCode settings.

**Option 2 — Project setting (per project):**
Add the following to your `.mcattributes` file in the project root:

```ini
education.enable=true
```

Once enabled, Education Edition commands and their parameters are included in all mcfunction and JSON completions for that project.

---

## Extending with Custom Content

### Automatic Project Indexing

The extension automatically scans your workspace and indexes all custom content it finds:

- **Entities** defined in your behavior pack (`entities/` folder)
- **Items** defined in your behavior pack (`items/` folder)
- **Blocks** defined in your behavior pack (`blocks/` folder)
- **Animations** and **animation controllers**
- **Loot tables**, **particles**, **sounds**, **textures**, and more

Once indexed, these appear as completions wherever they are relevant. For example, custom entity IDs will appear in `summon` command completions, and custom sounds will appear in `playsound` completions.

The indexing happens automatically when you open a project. If you add new files, they are picked up as your project is rescanned.

### The .mcdefinitions File

For content that cannot be automatically detected — such as tags and scoreboard objectives that are created at runtime, or external definitions not present in files — you can declare them manually in a `.mcdefinitions` file in your project root.

**Example `.mcdefinitions` file:**

```ini
## Scoreboard objectives used in this map
objective=coins
objective=kills
objective=deaths

## Tags used in this map
tag=initialized
tag=spawned
tag=boss

## Custom entity names (runtime names given by /tag or /name)
name=Steve
name=Alex

## Entity families used in event components or selectors
family=npc
family=boss

## Explicit entity IDs (if not auto-detected)
entity=my_namespace:custom_mob
entity=my_namespace:custom_npc

## Custom blocks
block=my_namespace:custom_block

## Custom items
item=my_namespace:custom_item

## Custom sounds
sound=custom.sound.ambient

## Custom particles
particle=my_namespace:custom_particle
```

Once declared in `.mcdefinitions`, these values appear in all relevant completions. For example:

- `objective=coins` will make `coins` appear as a completion when editing scoreboard commands.
- `tag=initialized` will make `initialized` appear when typing `tag=` in entity selectors.
- `sound=custom.sound.ambient` will appear in `playsound` completions.

**Excluding items from completions:**
You can prefix any value with `!` to exclude it:

```ini
## Exclude a tag from completions (e.g., it is internal-only)
tag=!internal_flag

## Exclude an objective
objective=!debug_counter
```

See [MCDefinitions](../project/MCDefinitions.md) for the full list of supported definition types.

---

## Troubleshooting

### Completions are not appearing

1. **Check that the feature is enabled.** In VSCode settings, verify that `BC-MC.Completion.JSON` is `true` (for JSON files) and that `BC-MC.Diagnostics.Enable` is `true` overall.

2. **Check for a `.mcattributes` file.** If your project has a `.mcattributes` file, make sure it does not explicitly disable completions (e.g., `diagnostic.enable=false`).

3. **Try triggering manually.** Press **Ctrl+Space** to manually open the completion list. If it appears, completions are working but auto-trigger may be suppressed.

4. **Verify the file type is recognized.** The extension activates for `.mcfunction`, `.json`, `.jsonc`, and MoLang files. Check that your file has the correct extension and that VSCode has recognized it with the correct language mode (shown in the status bar at the bottom right).

5. **Check that the extension is active.** In VSCode, go to the Extensions panel and verify the Bedrock Development Extension is installed and enabled for your workspace.

6. **Try restarting the language server.** Open the command palette (**Ctrl+Shift+P**) and run `BC-MC: Diagnose All Files` to force the server to rescan your project.

### Completions appear but are missing custom content

1. **Check that your files are in the correct location.** Entities must be in the `entities/` folder, items in `items/`, etc., following standard Bedrock pack structure.

2. **Add missing definitions to `.mcdefinitions`.** If a tag, objective, or other runtime value is not being indexed, add it manually (see [The .mcdefinitions File](#the-mcdefinitions-file)).

3. **Check the `.mcignore` file.** If a `.mcignore` file exists in your project, ensure it does not exclude the files containing your custom definitions. See [MCIgnore](../project/MCIgnore.md) for details.

4. **Re-scan the project.** Use the command palette and run `BC-MC: Diagnose All Files` to trigger a rescan.

### Education Edition completions are missing

Enable Education Edition support as described in [Education Edition Commands](#education-edition-commands). This is disabled by default.

### Wrong completions are appearing

1. **Check the context.** Completions are context-sensitive — if an unexpected completion appears, verify the cursor position is correct and the surrounding JSON or command syntax is valid.

2. **Check for syntax errors.** If the command or JSON syntax before the cursor is malformed, the extension may not be able to determine the correct completion context.

---

## Related Resources

- [Completion System Overview](../completion/README.md) — High-level overview of the completion system
- [MCFunction Completion](../completion/Mcfunctions.md) — Details on comment-based documentation in mcfunction files
- [JSON Completion Guide](./completion-json.md) — Developer guide for adding new JSON completion support
- [MCAttributes](../project/MCAttributes.md) — Project-level configuration attributes
- [MCDefinitions](../project/MCDefinitions.md) — Declaring custom content for completion
- [MCIgnore](../project/MCIgnore.md) — Excluding files from project processing
- [Commands](../Commands.md) — All available extension commands
- [Microsoft Bedrock Commands Reference](https://learn.microsoft.com/en-us/minecraft/creator/commands/) — Official command documentation

---

For questions or to report issues, please open an issue on the [GitHub repository](https://github.com/Blockception/minecraft-bedrock-language-server/issues).
