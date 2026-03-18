# `.mcattributes`

The `.mcattributes` file is the **primary configuration file** for the Blockception Minecraft extension. It controls which packs are recognized and how the extension behaves.

This file is created at the root of your workspace by the `bc.mcproject.create` command and uses the **`bc-minecraft-project`** language mode in VS Code, which provides syntax highlighting and completion.

---

## Key Settings

### `project.nature`

Defines the type of project. Set this to `Minecraft Bedrock` to enable all Bedrock-specific features.

```ini
project.nature=Minecraft Bedrock
```

### `diagnostics.*`

Override diagnostic settings on a per-project basis.

```ini
diagnostics.enable=true
diagnostics.json=true
diagnostics.mcfunction=true
```

### `template.folder`

Path to a custom templates directory. See the **Using Templates** walkthrough for more details.

```ini
template.folder=./templates
```

---

## Full Example

```ini
project.nature=Minecraft Bedrock

diagnostics.enable=true
diagnostics.json=true
diagnostics.mcfunction=true

template.folder=./templates
```

---

> **Tip:** After modifying `.mcattributes`, rescan your project using the **`bc.minecraft.project.scan`** command (`Blockception: (Re) Scan the minecraft project`) for the changes to take effect.
