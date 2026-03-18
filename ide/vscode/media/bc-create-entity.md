# Create BP-RP Entity Files

In Minecraft Bedrock, entities are defined by two paired files:

- **Behavior Pack (BP) entity** – the server-side definition that controls the entity's AI, components, and game logic. Located at `behavior_packs/.../entities/<name>.json`.
- **Resource Pack (RP) entity** – the client-side definition that controls the entity's appearance, geometry, textures, and animations. Located at `resource_packs/.../entity/<name>.json`.

> Note: The BP folder is named `entities` (plural) and the RP folder is named `entity` (singular) — this is the standard Minecraft Bedrock folder convention.

Both files are required for a fully functional custom entity.

## Steps

1. Open the command palette
2. Type in `Blockception: Create entity`
3. Enter the entity identifier in `namespace:name` format
4. The command generates:
   - `behavior_packs/.../entities/<name>.json` – server-side entity definition
   - `resource_packs/.../entity/<name>.json` – client-side entity definition

The generated files use [templates](command:workbench.action.openWalkthrough?%5B%22blockception.minecraft-bedrock-language-support%23bc-templates-tutorial%22%5D), so you can customize their content and file paths via your `.mcattributes` file.

> **Tip:** To create only one of the files, use `bc-create-behavior-entity` for the BP entity or `bc-create-resource-entity` for the RP entity individually.
