# `.mclint`

The `.mclint` file adds **configurable linting rules** for your Minecraft Bedrock project. It lets you enforce naming conventions and namespace rules with `off`, `warn`, and `error` severities.

You can create this file at your project root with the `bc.mcproject.create` command (`Blockception: Create MCProject files`), then customize rules to match your project style.

---

## Minimal Example

```json
{
  "rules": {
    "identity.format": "error",
    "namespace.required": "error",
    "animation.naming": ["warn", "^animation\\.my_pack\\."],
    "molang.variable.naming": ["warn", "^[a-z][a-z0-9_]*$"]
  }
}
```

---

## How to Use It

1. Create `.mclint` in the workspace root.
2. Add or adjust rules under `rules`.
3. Save the file to apply changes.
4. Run **`bc.minecraft.project.scan`** (`Blockception: (Re) Scan the minecraft project`) if you want to force an immediate re-scan.

---

> **Tip:** See the full rule catalog and options in [MCLint documentation](https://github.com/Blockception/minecraft-bedrock-language-server/blob/main/documentation/project/MCLint.md).
