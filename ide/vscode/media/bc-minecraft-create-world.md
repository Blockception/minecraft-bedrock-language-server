# Create a World Project

A **World** project is a complete Minecraft Bedrock project that bundles a world template together with its own Behavior Pack (BP) and Resource Pack (RP). Unlike standalone BP or RP projects, a World project ties all three components together so that the world always loads with the correct packs applied.

## What this command creates

Running **Create World Pack** generates the following structure in your workspace:

```
<project>/
  world/
    manifest.json
    world_behavior_packs.json
    world_resource_packs.json
  BP/
    manifest.json
    ...
  RP/
    manifest.json
    ...
```

- **`world/manifest.json`** – Declares the world template pack (type `world_template`). The UUIDs here are used to link the world to its packs.
- **`world_behavior_packs.json`** – Lists the BP UUID(s) that must be active when this world is loaded by Minecraft.
- **`world_resource_packs.json`** – Lists the RP UUID(s) that must be active when this world is loaded by Minecraft.

## Steps

1. Have a workspace open
2. Open the command palette
3. Type in `Create World Pack`
4. Type in the initials of the project you want to create. Such as `EP` or `ep` for example pack

> **Tip:** Minecraft expects the world folder to be placed inside the `minecraftWorlds` directory (e.g. `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_...\LocalState\games\com.mojang\minecraftWorlds`). During development, use the extension's export or symlink features to keep your workspace in sync with that location.
