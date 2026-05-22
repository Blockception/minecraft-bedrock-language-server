# MCLint — Configurable Linting Diagnostics

The `.mclint` file enables a configurable linting system for your Minecraft Bedrock project. Inspired by [ESLint](https://eslint.org/), it lets you define enforceable naming and formatting rules that fire as editor diagnostics during document analysis.

## File Location

Place a `.mclint` file in the **root** of your workspace (the same directory as `.mcattributes`, `.mcignore`, and `.mcdefinitions`):

```
my-project/
├── .mclint           ← lint configuration
├── .mcattributes
├── .mcignore
├── behavior_packs/
└── resource_packs/
```

## File Format

`.mclint` uses **JSON** syntax. The top-level object must contain a `rules` property:

```json
{
  "rules": {
    "<rule-id>": "<severity>",
    "<rule-id>": ["<severity>", ...options]
  }
}
```

### Severity Values

Each rule can be set to one of the following severity levels:

| Value | Alias | Meaning |
|-------|-------|---------|
| `"off"` | `0` | Rule is disabled |
| `"warn"` | `1` | Violation shown as a warning |
| `"error"` | `2` | Violation shown as an error |

### Rule Value Formats

- **Plain severity** — `"warn"`, `"error"`, or `"off"`
- **Severity with options** — `["warn", option1, option2, ...]`

---

## Built-in Rules

### `identity.format`

Validates that identifiers follow the `namespace:name` format (e.g. `myns:my_entity`). Identifiers without a colon separator are flagged.

**Options:** none

**Example:**
```json
{
  "rules": {
    "identity.format": "warn"
  }
}
```

**What it checks:** Entity identifiers, block identifiers, and other named game objects that require a namespace prefix.

---

### `namespace.allow`

Restricts identifiers to a specific set of allowed namespaces. Any identifier whose namespace is **not** in the list is flagged.

**Options:** `[severity, [allowedNamespace1, allowedNamespace2, ...]]`

**Example:**
```json
{
  "rules": {
    "namespace.allow": ["error", ["myns", "common"]]
  }
}
```

In the example above, only `myns:*` and `common:*` identifiers are allowed. An entity with identifier `other:pig` would be flagged.

---

### `namespace.deny`

Rejects identifiers whose namespace appears in the deny list.

**Options:** `[severity, [deniedNamespace1, deniedNamespace2, ...]]`

**Example:**
```json
{
  "rules": {
    "namespace.deny": ["error", ["minecraft"]]
  }
}
```

This is useful when you want to ensure your project never accidentally shadows vanilla `minecraft:*` identifiers.

---

### `namespace.required`

Requires that identifiers for entities, blocks, and items always include a namespace (i.e. the `namespace:name` format). Identifiers that do not contain a colon separator are flagged.

**Options:** none

**Example:**
```json
{
  "rules": {
    "namespace.required": "error"
  }
}
```

With this rule enabled, a definition such as `"identifier": "my_zombie"` is flagged because it is missing the namespace prefix. It must be written as `"my_namespace:my_zombie"`.

> **Note:** This is different from `identity.format`, which validates the full `namespace:name` pattern (including character restrictions). `namespace.required` only checks that a namespace separator (`:`) is present.

---

### `animation.naming`

Validates animation IDs against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "animation.naming": ["warn", "^animation\\.myns\\."]
  }
}
```

This requires all animations to begin with `animation.myns.`.

---

### `animation-controller.naming`

Validates animation controller IDs against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "animation-controller.naming": ["warn", "^controller\\.animation\\.myns\\."]
  }
}
```

This requires all animation controller IDs to begin with `controller.animation.myns.`.

---

### `animation-state.naming`

Validates animation controller **state** identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "animation-state.naming": ["warn", "^[a-z_]+$"]
  }
}
```

This requires all animation state names to use only lowercase letters and underscores.

---

### `biome.naming`

Validates biome identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "biome.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `block.naming`

Validates block identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "block.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `bone.naming`

Validates bone names in animations against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "bone.naming": ["warn", "^[a-z][a-z0-9_]*$"]
  }
}
```

---

### `entity.naming`

Validates entity identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "entity.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `feature.naming`

Validates feature identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "feature.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `feature-rule.naming`

Validates feature rule identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "feature-rule.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `fog.naming`

Validates fog setting identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "fog.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `item.naming`

Validates item identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "item.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `model.naming`

Validates model/geometry identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "model.naming": ["warn", "^geometry\\.myns\\."]
  }
}
```

This requires all geometry identifiers to begin with `geometry.myns.`.

---

### `molang.variable.naming`

Validates MoLang variable names (`v.*`, `variable.*`, `t.*`, `temp.*`) against a regular expression pattern. The pattern is matched against the **variable name** portion only (the part after the `v.` or `variable.` prefix).

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "molang.variable.naming": ["warn", "^[a-z][a-z0-9_]*$"]
  }
}
```

This requires all MoLang variables to use `snake_case`.

---

---

### `particle.naming`

Validates particle identifiers against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "particle.naming": ["warn", "^myns:[a-z_]+$"]
  }
}
```

---

### `render-controller.naming`

Validates render controller IDs against a regular expression pattern.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "render-controller.naming": ["warn", "^controller\\.render\\.myns\\."]
  }
}
```

This requires all render controller IDs to begin with `controller.render.myns.`.

---

### `sound.extensions`

Validates that sound path references in `sound_definitions.json` use only allowed file extensions. When a sound path explicitly includes a file extension, it must be one of the permitted values.

Paths **without** an extension are always accepted — Minecraft Bedrock resolves the actual file at runtime, so extension-free paths are the normal and recommended pattern.

**Options:** `[severity, [".ogg", ".wav"]]`

- The second element is the list of allowed extensions (each must include the leading dot).
- Defaults to `[".ogg", ".wav"]` when omitted.
- Extension matching is **case-insensitive**.

**Example — severity only (uses default allowed list):**
```json
{
  "rules": {
    "sound.extensions": "warn"
  }
}
```

**Example — custom allowed list:**
```json
{
  "rules": {
    "sound.extensions": ["error", [".ogg", ".wav", ".fsb"]]
  }
}
```

**What it checks:** Every `name` entry under `sound_definitions.json > sounds[].name`. A path like `sounds/ambient/rain.mp3` would be flagged because `.mp3` is not in the default allowed list, while `sounds/ambient/rain` (no extension) is always accepted.

---

### `mcfunction.naming`

Validates the name (ID) of each `.mcfunction` file against a regular expression pattern. The ID is the file path relative to the `functions/` directory, without the `.mcfunction` extension (e.g. `my_folder/my_function`).

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "mcfunction.naming": ["warn", "^[a-z][a-z0-9_/]*$"]
  }
}
```

This requires all function file names to use only lowercase letters, digits, underscores, and path separators.

**Diagnostic code:** `lint.mcfunction.naming`

---

### `fake-player.naming`

Validates **fake player names** used in commands such as `scoreboard players` against a regular expression pattern. Fake players are non-selector string targets like `#myScore` or `$counter`.

**Options:** `[severity, "regexPattern"]`

**Example:**
```json
{
  "rules": {
    "fake-player.naming": ["warn", "^#[a-z][a-z0-9_]*$"]
  }
}
```

This requires all fake player names to start with `#` followed by lowercase `snake_case`.

**Diagnostic code:** `lint.fake-player.naming`

---

## Complete Example

```json
{
  "rules": {
    "identity.format": "error",
    "namespace.allow": ["error", ["myns", "shared"]],
    "namespace.deny": "off",
    "namespace.required": "error",
    "animation.naming": ["warn", "^animation\\.myns\\."],
    "animation-controller.naming": ["warn", "^controller\\.animation\\.myns\\."],
    "animation-state.naming": ["warn", "^[a-z_]+$"],
    "biome.naming": ["warn", "^myns:[a-z_]+$"],
    "block.naming": ["warn", "^myns:[a-z_]+$"],
    "bone.naming": "off",
    "entity.naming": ["warn", "^myns:[a-z_]+$"],
    "feature.naming": ["warn", "^myns:[a-z_]+$"],
    "feature-rule.naming": ["warn", "^myns:[a-z_]+$"],
    "fog.naming": ["warn", "^myns:[a-z_]+$"],
    "item.naming": ["warn", "^myns:[a-z_]+$"],
    "model.naming": ["warn", "^geometry\\.myns\\."],
    "molang.variable.naming": ["warn", "^[a-z][a-z0-9_]*$"],
    "particle.naming": ["warn", "^myns:[a-z_]+$"],
    "render-controller.naming": ["warn", "^controller\\.render\\.myns\\."],
    "sound.extensions": ["warn", [".ogg", ".wav"]],
    "mcfunction.naming": ["warn", "^[a-z][a-z0-9_/]*$"],
    "fake-player.naming": ["warn", "^#[a-z][a-z0-9_]*$"]
  }
}
```

---

## Disabling Rules

To disable a rule entirely, set it to `"off"` (or `0`):

```json
{
  "rules": {
    "bone.naming": "off"
  }
}
```

---

## Rule Codes

Each lint rule produces a diagnostic with a code that can be referenced in inline disable comments (see [mc-disable](../mc-disable.md)):

| Rule | Diagnostic Code |
|------|-----------------|
| `identity.format` | `lint.identity.format` |
| `namespace.allow` | `lint.namespace.allow` |
| `namespace.deny` | `lint.namespace.deny` |
| `namespace.required` | `lint.namespace.required` |
| `animation.naming` | `lint.animation.naming` |
| `animation-controller.naming` | `lint.animation-controller.naming` |
| `animation-state.naming` | `lint.animation-state.naming` |
| `biome.naming` | `lint.biome.naming` |
| `block.naming` | `lint.block.naming` |
| `bone.naming` | `lint.bone.naming` |
| `entity.naming` | `lint.entity.naming` |
| `feature.naming` | `lint.feature.naming` |
| `feature-rule.naming` | `lint.feature-rule.naming` |
| `fog.naming` | `lint.fog.naming` |
| `item.naming` | `lint.item.naming` |
| `model.naming` | `lint.model.naming` |
| `molang.variable.naming` | `lint.molang.variable.naming` |
| `particle.naming` | `lint.particle.naming` |
| `render-controller.naming` | `lint.render-controller.naming` |
| `sound.extensions` | `lint.sound.extensions` |
| `mcfunction.naming` | `lint.mcfunction.naming` |
| `fake-player.naming` | `lint.fake-player.naming` |

---

## Interaction with `.mcattributes`

You can disable **specific diagnostic codes** project-wide using the `diagnostic.disable.<code>` attribute in `.mcattributes`. For example, to suppress all namespace allow violations:

```ini
diagnostic.disable.lint.namespace.allow=true
```

---

## Additional Rule Candidates

Based on the project structure, future rules may include:

- **`objective.naming`** — validate scoreboard objective names against a pattern
- **`tag.naming`** — validate tag names against a pattern
- **`sound.naming`** — validate sound event identifiers against a pattern
- **`texture.naming`** — validate texture paths against a pattern
- **`loot-table.naming`** — validate loot table file paths against a pattern

---

## Troubleshooting

- Ensure the file is named exactly `.mclint` (with the leading dot).
- The file must be valid JSON — use a JSON linter if you're unsure.
- Changes to `.mclint` take effect after saving the file. The language server detects `.mclint` as a project configuration file and re-traverses the workspace.
- If no `.mclint` file exists, all lint rules default to `"off"`.

For more help, see the [Debugging](../Debugging.md) guide or open an issue on [GitHub](https://github.com/Blockception/minecraft-bedrock-language-server/issues).
