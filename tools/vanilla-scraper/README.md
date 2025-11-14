# Vanilla Scraper

A TypeScript tool for scraping Minecraft Bedrock vanilla data from the official Mojang samples.

## Overview

This scraper downloads and processes Minecraft Bedrock Edition data from the [bedrock-samples](https://github.com/Mojang/bedrock-samples) repository and generates TypeScript files containing:

- Blocks, entities, items, biomes, loot tables, and trading data from behavior packs
- Animations, models, textures, sounds, particles, and more from resource packs
- Metadata including effects, enchantments, dimensions, and potion data
- GitHub file references and format versions

## Usage

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Run Scraper

```bash
npm run scrape
```

This will:
1. Download the latest bedrock-samples from GitHub
2. Extract and process all relevant data
3. Generate TypeScript files in `../../packages/bedrock-vanilla-data/src/lib/`

### Clean

```bash
npm run clean
```

Removes the `dist` and `work` directories.

## Output Structure

The scraper generates files in the following structure:

```
packages/bedrock-vanilla-data/src/lib/
├── Vanilla/
│   ├── behaviorpack/
│   │   ├── blocks.ts
│   │   ├── entities.ts
│   │   ├── items.ts
│   │   ├── biomes.ts
│   │   ├── loot_tables.ts
│   │   ├── trading.ts
│   │   └── features.ts
│   ├── resourcepack/
│   │   ├── animations.ts
│   │   ├── animation_controllers.ts
│   │   ├── entities.ts
│   │   ├── fogs.ts
│   │   ├── models.ts
│   │   ├── particles.ts
│   │   ├── render_controllers.ts
│   │   ├── materials.ts
│   │   ├── sounds.ts
│   │   ├── sound_files.ts
│   │   ├── textures.ts
│   │   ├── texture_items.ts
│   │   └── texture_terrain.ts
│   └── sources.ts
├── Edu/
│   └── (similar structure for education edition)
├── General/
│   ├── biomes.ts
│   ├── effects.ts
│   ├── enchantments.ts
│   └── ...
└── versions.ts
```

## Differences from C# Version

This TypeScript implementation achieves the same result as the C# scraper with some differences:

1. **Platform**: Pure TypeScript/Node.js instead of .NET/C#
2. **Registry Access**: Does not access Windows registry for local Minecraft installations (relies on downloaded samples)
3. **Implementation**: Different code structure but same functionality
4. **Dependencies**: Uses `extract-zip` for unzipping instead of .NET libraries

## Development

The scraper is organized into modules:

- `index.ts` - Main entry point
- `utils.ts` - Utility functions for file operations and downloads
- `context.ts` - Context setup and folder management
- `types.ts` - TypeScript type definitions
- `metadata-scraper.ts` - Scrapes metadata from vanilladata_modules
- `bp-scraper.ts` - Scrapes behavior pack data
- `rp-scraper.ts` - Scrapes resource pack data
- `output.ts` - Output generation and TypeScript file writing
- `github-links.ts` - GitHub links generation
- `format-versions.ts` - Format version extraction
