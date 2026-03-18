# Configuring Your Project

The extension uses three special project files to understand the structure and configuration of a Minecraft Bedrock workspace. These files are created by the `bc.mcproject.create` command and are placed at the root of your workspace.

All three files use the **`bc-minecraft-project`** language mode in VS Code, which provides syntax highlighting and completion.

---

## `.mcattributes`

The `.mcattributes` file is the **primary configuration file** for the extension. It controls which packs are recognized and how the extension behaves.

### Key settings

- **`project.nature`** – Defines the type of project (e.g. `Minecraft Bedrock`).
- **`diagnostics.*`** – Override diagnostic settings on a per-project basis.
- **`template.folder`** – Path to a custom templates directory (see the [Using Templates](command:workbench.action.openWalkthrough?%7B%22category%22%3A%22Blockception.bc-minecraft-bedrock-project%23blockception-minecraft-basics%22%2C%22step%22%3A%22bc-templates-tutorial%22%7D) step).

### Example

```ini
project.nature=Minecraft Bedrock

diagnostics.enable=true
diagnostics.json=true
diagnostics.mcfunction=true

template.folder=./templates
```

---

## `.mcdefinitions`

The `.mcdefinitions` file lets you inject **custom definitions** into the extension's knowledge base. This is useful for defining custom identifiers, fake players, scoreboard objectives, and tags that the extension should recognize without them being present in actual pack files.

This is especially useful for shared or library packs where definitions live in a separate repository.

### Example

```ini
# Custom scoreboard objectives
objective.my_objective=dummy

# Fake player names used in scoreboards
fakePlayer.#global
fakePlayer.#counter
```

---

## `.mcignore`

The `.mcignore` file works like a `.gitignore` – **glob patterns** listed here cause matching files and folders to be excluded from the extension's scanning and diagnostics.

Common uses:

- Ignoring third-party or vendored packs that should not be validated
- Excluding generated or build output folders
- Skipping experimental content not yet ready for validation

### Example

```
# Vendored/third-party packs
packs/vendor/**

# Build output
out/**
dist/**

# Node modules
**/node_modules
```

---

> **Tip:** After modifying any of these files, rescan your project using the **`bc.minecraft.project.scan`** command (`Blockception: (Re) Scan the minecraft project`) for the changes to take effect.
