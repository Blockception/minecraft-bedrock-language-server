# `.mcdefinitions`

The `.mcdefinitions` file lets you inject **custom definitions** into the extension's knowledge base. This is useful for defining custom identifiers, fake players, scoreboard objectives, and tags that the extension should recognize without them being present in actual pack files.

This file is created at the root of your workspace by the `bc.mcproject.create` command and uses the **`bc-minecraft-project`** language mode in VS Code, which provides syntax highlighting and completion.

---

## When to Use It

This is especially useful for:

- **Shared or library packs** where definitions live in a separate repository
- **Fake players** used in scoreboard operations that are never defined in a pack
- **Scoreboard objectives** set up by external scripts or tools
- **Tags** applied at runtime that the extension cannot discover statically

---

## Example

```ini
# Custom scoreboard objectives
objective.my_objective=dummy
objective.level_progress=dummy

# Fake player names used in scoreboards
fakePlayer.#global
fakePlayer.#counter
fakePlayer.#temp

# Custom tags
tag.admin
tag.vip
```

---

> **Tip:** After modifying `.mcdefinitions`, rescan your project using the **`bc.minecraft.project.scan`** command (`Blockception: (Re) Scan the minecraft project`) for the changes to take effect.
