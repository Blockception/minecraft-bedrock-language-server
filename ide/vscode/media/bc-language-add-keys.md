# Auto-populate translation keys

Once your `.lang` files exist, you can automatically fill them with keys from your current pack using the **Add all from pack to language file** command (`bc.minecraft.language.add`).

## How to use it

1. Open a `.lang` file from your pack's `texts/` folder (e.g. `texts/en_US.lang`)
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type `Add all from pack` and select **Blockception: Add all from pack to language file**
4. Missing keys from the current pack are appended to the file automatically

> **Note:** The command only appends keys that are not already present, so running it multiple times is safe — existing translations are never overwritten.

## Why this is useful

When you add a new item, block, or entity to your pack, its translation keys won't appear in your `.lang` files until you add them. Instead of hunting down every key by hand, run this command and all new keys are inserted for you — ready for you to fill in the display text.

## Next step

Enable **dynamic key completion** so that key names are suggested as you type inside any `.lang` file.
