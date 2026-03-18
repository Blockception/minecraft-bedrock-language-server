# Create a Resource Pack

A **Resource Pack** in Minecraft Bedrock lets you customize the visual and audio experience of the game. It can contain:

- **Textures** – custom block, item, entity, and UI textures
- **Sounds** – custom sound effects and music
- **Models** – custom geometry for entities and blocks
- **UI** – custom HUD and screen layouts
- **Animations** – visual animation definitions

## How to Create a Resource Pack

1. Have a workspace open
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type in `Create Resource Pack`
4. Type in the initials of the project you want to create (e.g. `EP` for *Example Pack*)

## Generated Files & Folders

The command creates a new resource pack folder in your workspace with the following structure:

```
<initials>_RP/
├── manifest.json
├── pack_icon.png
└── texts/
    └── en_US.lang
```

### `manifest.json`

The `manifest.json` file identifies your resource pack to Minecraft. It contains the pack name, description, version, and a unique UUID so Minecraft can distinguish it from other packs.

### `.mcattributes`

A `.mcattributes` file is created (or updated) at the root of your workspace. This file helps the Blockception extension understand the layout of your project — for example, which folders are resource packs and which are behavior packs — enabling accurate diagnostics and completions.

## 💡 Tip: Naming Conventions

Use short uppercase initials followed by `_RP` for the pack folder name (e.g. `EP_RP`, `MY_RP`). This makes it easy to distinguish the resource pack from any associated behavior pack (`EP_BP`) and keeps your workspace tidy.
