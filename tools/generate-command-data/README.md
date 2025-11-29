# Generate Command Data Tool

This tool generates TypeScript command data files for Minecraft Bedrock Edition from the official Mojang command data source.

## Usage

### Direct execution

From this directory:

```bash
npm run generate
```

### Via the bedrock-commands package

From the `packages/bedrock-commands` directory:

```bash
make commands
```

## What it does

The tool:

1. Fetches the latest command data from the Mojang bedrock-samples repository
2. Converts the raw command data into TypeScript command definitions
3. Generates individual `.ts` files for each command in `packages/bedrock-commands/src/data/vanilla/`

## Dependencies

This tool depends on the `bc-minecraft-bedrock-command` package for type definitions.

## Implementation

- **command-import.ts**: Main entry point that orchestrates the data fetching, conversion, and saving
- **minecraft-data.ts**: Handles fetching command data from the Mojang repository
- **convert.ts**: Converts raw command data into TypeScript command definitions
- **mutate.ts**: Performs data transformations on command overloads
