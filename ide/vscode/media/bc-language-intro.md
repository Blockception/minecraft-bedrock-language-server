# What are language files?

Minecraft Bedrock uses `.lang` files to store all human-readable text shown in-game — pack names, item names, entity names, UI strings, and more. Each `.lang` file contains translations for one locale so players can see the game in their own language.

## File location

Language files live inside a `texts/` folder at the root of each pack:

```
my_bp/
└── texts/
    ├── languages.json
    ├── en_US.lang
    ├── de_DE.lang
    └── fr_FR.lang
```

`languages.json` is a JSON array that tells Minecraft which locale files exist in your pack:

```json
["en_US", "de_DE", "fr_FR"]
```

## The `key=value` format

Each line in a `.lang` file maps a translation key to a display string:

```ini
## Pack identity
pack.name=My Awesome Pack
pack.description=Adds new blocks and items to Minecraft

## Items
item.mypack:cool_sword.name=Cool Sword
item.mypack:iron_nugget.name=Iron Nugget
```

- Lines beginning with `##` are comments and are ignored by Minecraft.
- Keys are case-sensitive and must be unique within a file.
- `en_US.lang` is the fallback locale; Minecraft uses it when the player's locale file is missing a key.

## Next step

Use the **Create all language files** command to generate the full set of `.lang` files for every pack in your workspace automatically.
