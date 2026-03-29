# Setting Up a Minecraft Bedrock Project from Scratch

A step-by-step guide for new users who want to start a Minecraft Bedrock Edition project with full language server support.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Creating the Initial Folder Structure](#creating-the-initial-folder-structure)
- [Creating and Configuring Project Files](#creating-and-configuring-project-files)
  - [.mcattributes](#mcattributes)
  - [.mcdefinitions (optional)](#mcdefinitions-optional)
  - [.mcignore (optional)](#mcignore-optional)
- [Creating Your First Pack Files](#creating-your-first-pack-files)
  - [Behavior Pack manifest](#behavior-pack-manifest)
  - [Resource Pack manifest](#resource-pack-manifest)
- [Verifying Extension and Tooling Activation](#verifying-extension-and-tooling-activation)
- [What to Do If Errors Appear at Startup](#what-to-do-if-errors-appear-at-startup)
- [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, make sure you have the following installed and ready:

| Requirement | Version | Notes |
|-------------|---------|-------|
| [Visual Studio Code](https://code.visualstudio.com/) | Latest stable | The supported editor for this extension |
| [Blockception's Minecraft Bedrock Development](https://marketplace.visualstudio.com/items?itemName=BlockceptionLtd.blockceptionvscodeminecraftbedrockdevelopmentextension) VSCode extension | Latest | Install from the VSCode Marketplace |
| [Git](https://git-scm.com/) | Any recent version | Recommended for version control |

### Installing the VSCode Extension

1. Open Visual Studio Code.
2. Open the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **"Blockception Minecraft Bedrock Development"**.
4. Click **Install**.
5. Reload VSCode when prompted.

---

## Creating the Initial Folder Structure

A Minecraft Bedrock project separates content into **behavior packs** (logic) and **resource packs** (assets). Both live inside a single workspace folder that also contains the language server configuration files.

### Recommended Layout

```
my-bedrock-project/
├── .mcattributes           ← language server configuration
├── .mcdefinitions          ← custom definitions (optional)
├── .mcignore               ← exclude files from scanning (optional)
├── behavior_packs/
│   └── my_pack_bp/
│       ├── manifest.json
│       ├── entities/
│       ├── items/
│       └── functions/
└── resource_packs/
    └── my_pack_rp/
        ├── manifest.json
        ├── entity/
        ├── models/
        └── texts/
```

### Create the folders

```bash
mkdir -p my-bedrock-project/behavior_packs/my_pack_bp
mkdir -p my-bedrock-project/resource_packs/my_pack_rp
cd my-bedrock-project
```

Then open the `my-bedrock-project` folder in VSCode (`File → Open Folder`). All language server features operate relative to this workspace root.

---

## Creating and Configuring Project Files

The language server reads three optional-but-recommended configuration files from the **workspace root** (the folder you opened in VSCode). The fastest way to generate all three at once is to run the built-in command:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **`Blockception: Create a minecraft project`** (`bc.mcproject.create`).

This creates `.mcattributes`, `.mcdefinitions`, and `.mcignore` with sensible defaults. You can then edit them as described below.

### `.mcattributes`

This is the **primary configuration file**. It controls which diagnostics and completions the extension enables for this project.

**Minimal starting configuration:**

```ini
diagnostic.enable=true
```

**Recommended configuration with diagnostics enabled:**

```ini
diagnostic.enable=true
diagnostic.json=true
diagnostic.mcfunction=true
diagnostic.lang=true
diagnostic.objective=true
diagnostic.tags=true
```

**All supported settings:**

| Setting | Description |
|---------|-------------|
| `diagnostic.enable` | Master switch for all diagnostics |
| `diagnostic.json` | Validate JSON files (entities, items, blocks, etc.) |
| `diagnostic.lang` | Validate `.lang` translation files |
| `diagnostic.mcfunction` | Validate `.mcfunction` command files |
| `diagnostic.objective` | Check scoreboard objective references |
| `diagnostic.tags` | Check entity tag references |
| `education.enable` | Enable Education Edition content (`true`/`false`) |
| `completion.json` | Enable JSON completion suggestions |
| `completion.lang.comments` | Enable lang file comment completion |
| `completion.lang.dynamic` | Enable dynamic lang file completion |

> **See also:** [MCAttributes reference](../project/MCAttributes.md) and the [`.mcattributes` guide](../../ide/vscode/media/bc-mcattributes.md)

---

### `.mcdefinitions` (optional)

Use this file to register custom identifiers that the language server cannot detect automatically — for example, objectives set by external scripts, tags applied at runtime, or fake player names used in scoreboards.

**Example:**

```ini
## Scoreboard objectives
objective=coins
objective=level

## Tags used in commands
tag=initialized
tag=admin

## Fake player names
name=#global
name=#temp
```

> **See also:** [MCDefinitions reference](../project/MCDefinitions.md)

---

### `.mcignore` (optional)

Works like `.gitignore`. Add glob patterns for files or folders that the extension should skip when scanning your project. This is useful for vendored packs, generated output, or large asset folders that do not need validation.

**Example:**

```
## Third-party packs — do not scan
packs/vendor/**

## Build output
out/**
dist/**

## Node modules (if you have a scripting API project)
**/node_modules
```

> **See also:** [MCIgnore reference](../project/MCIgnore.md)

---

## Creating Your First Pack Files

Each pack must have a `manifest.json` at its root. Without it the extension cannot detect the pack type and will not provide completion or diagnostics for that pack's files.

### Behavior Pack manifest

Create `behavior_packs/my_pack_bp/manifest.json`:

```json
{
  "format_version": 2,
  "header": {
    "name": "My Pack",
    "description": "My first Bedrock behavior pack",
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "version": [1, 0, 0],
    "min_engine_version": [1, 20, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
      "version": [1, 0, 0]
    }
  ]
}
```

> **Important:** Replace every `x` and `y` block with a real UUID. You can generate UUIDs at [uuidgenerator.net](https://www.uuidgenerator.net/). Each `header` and each entry in `modules` must have its own unique UUID — do not reuse the same value.

### Resource Pack manifest

Create `resource_packs/my_pack_rp/manifest.json`:

```json
{
  "format_version": 2,
  "header": {
    "name": "My Pack Resources",
    "description": "My first Bedrock resource pack",
    "uuid": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "version": [1, 0, 0],
    "min_engine_version": [1, 20, 0]
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      "version": [1, 0, 0]
    }
  ]
}
```

> **Tip:** If you want this resource pack to depend on the behavior pack, add a `dependencies` array to the resource pack's `header` containing the behavior pack's header UUID.

---

## Verifying Extension and Tooling Activation

After completing the steps above, verify that the extension is running correctly:

### 1. Check the language mode

Open any `.mcfunction` file or one of the JSON files inside your pack. The status bar at the bottom of VSCode should show the correct language mode (e.g., **`mcfunction`** or **`JSON`**). If it shows **Plain Text**, the extension has not recognized the file — check the file path and the `manifest.json`.

### 2. Trigger a project scan

Open the Command Palette and run **`Blockception: (Re) Scan the minecraft project`** (`bc.minecraft.project.scan`). This forces the extension to re-read all configuration files and re-index your packs.

### 3. Confirm completion works

Open one of your JSON files (for example, `entities/sample.json` inside the behavior pack) and start typing a Bedrock entity component. Autocomplete suggestions should appear. If they do not, check that:

- The file is inside a recognized `behavior_packs/` or `resource_packs/` folder.
- The pack folder contains a valid `manifest.json`.
- `.mcattributes` contains `project.nature=Minecraft Bedrock`.

### 4. Check the Output panel

Open **View → Output** and select **"Minecraft Bedrock Language Server"** (or similar) from the dropdown. Any initialization messages or errors will appear here.

### 5. Confirm diagnostics are active

Add an intentional error to a `.mcfunction` file, such as a misspelled command. A red squiggly underline and a problem in the **Problems** panel (`Ctrl+Shift+M` / `Cmd+Shift+M`) confirm that diagnostics are working.

---

## What to Do If Errors Appear at Startup

### Extension does not activate

- Confirm the extension is installed and enabled in VSCode.
- Make sure you opened a **folder** (`File → Open Folder`), not a single file.
- Check that `.mcattributes` is in the workspace **root** (not inside a sub-folder).

### "Cannot find module" or similar error in Output panel

- This is usually a version mismatch between the extension and VSCode. Try:
  1. Update the extension to the latest version.
  2. Reload VSCode (`Ctrl+Shift+P` → **Developer: Reload Window**).

### No completions or diagnostics for a pack

- Verify the pack folder contains a valid `manifest.json` with `"format_version": 2`.
- Check the `"type"` field in the `modules` array: behavior packs use `"data"`, resource packs use `"resources"`.
- Make sure the pack folder is named consistently and not excluded by `.mcignore`.
- Run **`bc.minecraft.project.scan`** after making changes to configuration files.

### Unexpected errors on valid files

- Check `.mcdefinitions` — an entry with an incorrect prefix or syntax can cause false positives.
- Temporarily set `diagnostic.enable=false` in `.mcattributes` and rescan to confirm the extension is the source of the errors.
- Re-enable individual diagnostic categories one at a time to isolate the problem.

### Everything looks fine but errors persist

1. Open the Command Palette and run **Developer: Reload Window**.
2. If the problem continues, check the [GitHub Issues page](https://github.com/Blockception/minecraft-bedrock-language-server/issues) to see if it is a known bug.
3. If not already reported, open a new issue with the contents of the Output panel and the relevant configuration files.

---

## Next Steps

Once your project is set up and the extension is running:

- **Templates** — Speed up file creation with custom file templates: [Templates guide](../../ide/vscode/media/bc-templates-tutorial.md)
- **Language files** — Add translations for your pack: [Language Files guide](../../ide/vscode/media/bc-language-intro.md)
- **Commands reference** — See all available extension commands: [Commands](../Commands.md)
- **JSON Validation** — Understand how schema validation works: [JSON Validation](../Json%20Validation.md)
- **Project configuration** — Full reference for all project files: [Project Configuration](../project/README.md)
