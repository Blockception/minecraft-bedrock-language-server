# `.mcignore`

The `.mcignore` file works like a `.gitignore` – **glob patterns** listed here cause matching files and folders to be excluded from the extension's scanning and diagnostics.

This file is created at the root of your workspace by the `bc.mcproject.create` command and uses the **`bc-minecraft-project`** language mode in VS Code, which provides syntax highlighting and completion.

---

## When to Use It

Common uses:

- **Third-party or vendored packs** that should not be validated
- **Generated or build output folders** that are not part of the source
- **Experimental content** not yet ready for validation

---

## Example

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

> **Tip:** After modifying `.mcignore`, rescan your project using the **`bc.minecraft.project.scan`** command (`Blockception: (Re) Scan the minecraft project`) for the changes to take effect.
