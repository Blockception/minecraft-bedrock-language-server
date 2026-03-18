# Create a Behavior Pack

A **Behavior Pack** (BP) is one of the two main pack types in Minecraft Bedrock Edition. It defines the *logic* of your add-on and can contain:

- **Entities** – custom mobs and their AI, attributes, and components
- **Items** – custom items with behaviors and properties
- **Blocks** – custom blocks and their properties
- **Recipes** – crafting, smelting, and brewing recipes
- **Loot tables** – what entities or blocks drop on death/break
- **Spawn rules** – where and how entities spawn in the world

## How to create a Behavior Pack

1. Have a workspace open in VS Code
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type `Create Behavior Pack` and select the command
4. Enter the initials for your project (e.g. `EP` for *Example Pack*)

## Generated files and folders

After running the command, the following structure is created inside your workspace:

```
<initials>_bp/
├── manifest.json
└── .mcattributes
```

- **`manifest.json`** – Describes the pack to Minecraft. It contains the pack's name, description, unique UUID, version, and the module type (`data` for a BP). You can also add a `dependencies` array here to link this BP to a Resource Pack.
- **`.mcattributes`** – A configuration file used by this extension to understand the project layout. It tells the language server which pack folders belong to which pack type so that diagnostics, completions, and other features work correctly.

> **Tip – Linking a BP to an RP:** To connect your Behavior Pack to a Resource Pack, add the RP's header UUID as a dependency in `manifest.json`:
>
> ```json
> "dependencies": [
>   {
>     "uuid": "<resource-pack-header-uuid>",
>     "version": [1, 0, 0]
>   }
> ]
> ```
>
> This tells Minecraft to always load the two packs together, so entities, blocks, and items can reference their matching client-side definitions.
