# Show Latest Minecraft Errors

Opens the latest error log produced by Minecraft, so you can quickly diagnose issues with your add-on or world without leaving VS Code.

## How to use

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type in `Blockception: Show latest errors`
3. The latest Minecraft error log will be opened in a new tab

## Where Minecraft stores its logs

Minecraft Bedrock stores log and error files in the `AppData` folder on Windows:

```
%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\logs\
```

The extension automatically searches this path for the most recently modified log file and opens it, so you always see the latest output without having to navigate the folder manually.

## Common errors you may see

- **Content errors** – malformed JSON in a behavior or resource pack file (e.g. missing commas, wrong field names)
- **Pack loading failures** – a pack could not be loaded due to a missing manifest, incompatible `min_engine_version`, or dependency resolution failure
- **Script errors** – runtime exceptions from GameTest or Scripting API modules
- **Missing identifiers** – references to entities, blocks, items, or sounds that do not exist in any loaded pack

## Tip

Use the **Problems panel** (`Ctrl+Shift+M`) alongside this command. The Problems panel shows diagnostics reported by the extension (invalid identifiers, schema violations, etc.) while the error log shows what Minecraft itself reported at runtime. Together they give you a complete picture of what is wrong with your project.
