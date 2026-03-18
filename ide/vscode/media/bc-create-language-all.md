# Create all language files

The **Create all language files** command (`bc-create-language-all`) scans every pack detected in your workspace — Behavior Packs, Resource Packs, and World Packs — and generates the full set of locale files for each one in a single step.

## What gets created

For each pack the command writes:

- `texts/en_US.lang` — English (United States) translations, and an equivalent file for every other supported Minecraft locale
- `texts/languages.json` — The list of locale codes that Minecraft will load for this pack

The command is non-destructive: any keys you have already added to existing `.lang` files are preserved.

## How to run

1. Open a workspace that contains at least one Minecraft Bedrock pack
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type `Create Language` and select **Blockception: Create all language files**
4. The files are written automatically — no further input is required

## Next step

Open one of the generated `.lang` files and use **Add all from pack to language file** (`bc.minecraft.language.add`) to populate it with all the translation keys from your pack.
