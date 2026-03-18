# Create all language files

Language files (`.lang`) are the localization and translation files used by Minecraft Bedrock. They map string keys to human-readable text, allowing Minecraft to display pack names, item descriptions, entity names, and other UI strings in the player's chosen language.

## What This Command Does

Running **Create All Language Files** (`bc-create-language-all`) scans every pack detected in your workspace (Behavior Packs, Resource Packs, and World Packs) and creates the full set of locale files for each one:

- `texts/en_US.lang` – English (United States), and equivalent files for every other supported locale
- `texts/languages.json` – Lists all locales that Minecraft should load for this pack

The command is non-destructive: existing keys in your `.lang` files are preserved.

## How to Run

1. Open a workspace that contains at least one Minecraft Bedrock pack
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type `Create Language` and select **Blockception: Create all language files**
4. The files are written automatically — no further input is required

## File Format

Each `.lang` file uses a simple `key=value` format:

```ini
pack.name=My Awesome Pack
pack.description=Adds new blocks and items to Minecraft
item.mypack:cool_sword.name=Cool Sword
```

- Lines beginning with `##` are comments and are ignored by Minecraft.
- Keys are case-sensitive and must be unique within a file.
- Only the file for the player's active locale is loaded at runtime; `en_US.lang` is used as a fallback.

## The `languages.json` File

`texts/languages.json` tells Minecraft which locale files exist in your pack. It is a JSON array of locale codes:

```json
["en_US", "de_DE", "fr_FR"]
```

The **Create All Language Files** command generates this file automatically based on the full set of supported Minecraft locales.

## Tips

> **Auto-populate keys:** Use the **`bc.minecraft.language.add`** command to scan the current pack and automatically insert missing translation keys into your `.lang` files, saving you from having to write every key by hand.

> **Dynamic key completion:** Enable the **`BC-MC.Completion.Lang.Dynamic`** setting to get IntelliSense completions for `.lang` keys as you type, based on the keys already present in your pack's language files.
