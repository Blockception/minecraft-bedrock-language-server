# JSON Completion

This guide explains how to add JSON completion (autocomplete) to the Minecraft Bedrock Language Server. JSON completion provides intelligent suggestions when editing JSON files for Minecraft Bedrock Edition projects.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Step-by-Step Implementation](#step-by-step-implementation)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Testing](#testing)

---

## Overview

JSON completion in the language server provides context-aware autocomplete suggestions when users are editing JSON files. The system:

- **Detects file types** based on file paths and naming conventions
- **Matches JSON paths** to determine where the cursor is in the JSON structure
- **Provides relevant completions** based on project data, vanilla data, and education edition data
- **Handles both behavior packs and resource packs**

---

## Architecture

### Key Files and Components

1. **Entry Point**
   - `ide/base/server/src/lsp/completion/on-request.ts` - Main completion request handler
   - Routes completion requests based on language ID (JSON, mcfunction, molang, etc.)

2. **JSON Completion Router**
   - `ide/base/server/src/lsp/completion/minecraft/json/document.ts` - Handles JSON document completion
   - Detects pack type and delegates to appropriate handler

3. **Pack-Specific Handlers**
   - `ide/base/server/src/lsp/completion/minecraft/behavior-pack/main.ts` - Behavior pack completions
   - `ide/base/server/src/lsp/completion/minecraft/resource-pack/main.ts` - Resource pack completions

4. **JsonPathCompletion Builder**
   - `ide/base/server/src/lsp/completion/builder/json-path.ts` - Core class for path-based completion
   - Matches JSON paths and triggers completion providers

5. **File-Specific Completion Modules**
   - Individual files for each JSON type (entities, items, blocks, animations, etc.)
   - Located in `ide/base/server/src/lsp/completion/minecraft/behavior-pack/` and `resource-pack/`

---

## Step-by-Step Implementation

### Step 1: Identify the JSON File Type

First, determine which JSON file type you want to add completion for. The language server uses:

- **FileType detection** from `bc-minecraft-bedrock-project` package
- File path patterns (e.g., files in `entities/` folder, files ending with `.entity.bp.json`)

Check existing patterns in `bc-minecraft-bedrock-project/src/project/behavior-pack/file-type.ts` or `resource-pack/file-type.ts`.

### Step 2: Create a Completion Module

Create a new TypeScript file for your completion provider in the appropriate folder:

- **Behavior Pack**: `ide/base/server/src/lsp/completion/minecraft/behavior-pack/`
- **Resource Pack**: `ide/base/server/src/lsp/completion/minecraft/resource-pack/`

**File naming convention**: Use kebab-case matching the JSON type (e.g., `loot-tables.ts`, `spawn-rules.ts`).

### Step 3: Implement the Basic Completion Function

Every completion module should export a `provideCompletion` function:

```typescript
import { Identifiable } from 'bc-minecraft-bedrock-types/src/types/identifiable';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../constants';
import { IsEducationEnabled } from '../../../../project/attributes';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The [type] definition: ${item.id}`;
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.[Type] });

  // Add project data
  builder.generate(context.database.ProjectData.behaviorPacks.[type], generateDoc);
  
  // Add vanilla data
  builder.generate(MinecraftData.vanilla.BehaviorPack.[type], generateDoc);

  // Add education data if enabled
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.BehaviorPack.[type], generateDoc);
  }
}
```

### Step 4: Add JSON Path-Based Completion

For completions that appear at specific locations in the JSON structure, implement `provideJsonCompletion`:

```typescript
import { JsonPathCompletion } from '../../builder';

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return myJsonCompletion.onCompletion(context);
}

const myJsonCompletion = new JsonPathCompletion(
  {
    match: 'path/to/property',  // String match (checks if path ends with this)
    onCompletion: provideCompletion,
  },
  {
    match: /regex_pattern$/,     // Regex match
    onCompletion: provideCompletion,
  },
  {
    match: (path) => path.includes('condition'),  // Function match
    onCompletion: provideCompletion,
  }
);
```

### Step 5: Register in Main Handler

Add your completion handler to the appropriate main file:

**For Behavior Pack** (`behavior-pack/main.ts`):

```typescript
import * as YourModule from './your-module';

export function provideJsonCompletion(context: Context<JsonCompletionContext>) {
  switch (FileType.detect(context.document.uri)) {
    // ... existing cases ...
    case FileType.your_type:
      return YourModule.provideJsonCompletion(context);
    // ... rest of cases ...
  }
}
```

**For Resource Pack** (`resource-pack/main.ts`):

```typescript
import * as YourModule from './your-module';

export function provideJsonCompletion(context: Context<JsonCompletionContext>) {
  switch (FileType.detect(context.document.uri)) {
    // ... existing cases ...
    case FileType.your_type:
      return YourModule.provideJsonCompletion(context);
    // ... rest of cases ...
  }
}
```

### Step 6: Ensure Data is Available

Make sure the data you're completing is:

1. **Available in the database** (`context.database.ProjectData`)
2. **Available in vanilla data** (`MinecraftData.vanilla`)
3. **Collected during project processing** (check the relevant package in `packages/`)

---

## Examples

### Example 1: Simple Item Completion

From `behavior-pack/items.ts`:

```typescript
export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = (item: Identifiable) => `The item definition: ${item.id}`;
  const builder = context.builder;

  // Project data
  builder.generate(context.database.ProjectData.behaviorPacks.items, generateDoc, Kinds.Completion.Item);

  // Spawn eggs
  context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
    builder.add({
      label: entity.id + '_spawn_egg',
      documentation: 'The spawn egg for entity: ' + entity.id,
      kind: Kinds.Completion.Entity,
    });
  });

  // Vanilla data
  builder.generate(MinecraftData.vanilla.BehaviorPack.items, generateDoc, Kinds.Completion.Item);

  // Education data
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.BehaviorPack.items, generateDoc, Kinds.Completion.Item);
  }
}

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return itemJsonCompletion.onCompletion(context);
}

const itemJsonCompletion = new JsonPathCompletion(
  JsonPathMatch.create('minecraft:icon/texture', provideCompletion)
);
```

### Example 2: Complex Entity Completion with Multiple Paths

From `behavior-pack/entity/main.ts`:

```typescript
const entityJsonCompletion = new JsonPathCompletion(
  {
    match: /throw_sound|hit_sound|spawn_sound$/,
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: 'minecraft:ambient_sound_interval/event_name',
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: 'event',
    onCompletion: EntityEvents.provideCompletion,
  },
  {
    match: 'block/name',
    onCompletion: Blocks.provideCompletion,
  },
  {
    match: 'minecraft:loot/table',
    onCompletion: LootTables.provideCompletion,
  },
  {
    match: /item|items|feed_items|spawn_item$/,
    onCompletion: Item.provideCompletion,
  },
  {
    match: (path) => path.includes('minecraft:entity/description/animations/'),
    onCompletion: (c) => {
      Animations.provideCompletion(c);
      AnimationControllers.provideCompletion(c);
    },
  }
);
```

### Example 3: Loot Table with Property Context

From `behavior-pack/loot-tables.ts`:

```typescript
export function provideJsonCompletion(context: Context<JsonCompletionContext>): void {
  const property = JsonCompletionContext.getProperty(context);
  if (property === undefined) return;

  switch (property) {
    case 'name':
      return Items.provideCompletion(context);
  }
}
```

---

## Best Practices

### 1. Use Consistent Patterns

- Follow the existing file structure and naming conventions
- Use the same import patterns and module organization
- Keep completion logic separated by file type

### 2. Provide Good Documentation

- Use descriptive documentation strings in completion items
- Help users understand what each completion represents
- Include the ID in the documentation for clarity

### 3. Support All Data Sources

Always include:
- **Project data** (user's custom content)
- **Vanilla data** (Minecraft's built-in content)
- **Education data** (when enabled in project settings)

### 4. Use Appropriate Completion Kinds

Use the correct `Kinds.Completion` type:
- `Block` for blocks
- `Entity` for entities
- `Item` for items
- `Animation` for animations
- `Sound` for sounds
- etc.

This helps the IDE display proper icons and categorization.

### 5. Handle Edge Cases

- Check if data exists before accessing it
- Handle education edition settings properly
- Consider both behavior and resource pack contexts

### 6. Match JSON Paths Carefully

When using `JsonPathCompletion`:
- **String matches** check if the path ends with the string
- **Regex matches** can be more flexible but must be precise
- **Function matches** offer the most control but add complexity

Test your path matching to ensure it triggers in the right places.

### 7. Reuse Existing Completion Functions

Many completion providers can be reused across different contexts:
- Entity completions can be used in spawn rules, loot tables, etc.
- Item completions can be used in trades, loot tables, recipes, etc.
- Sound completions can be used in entities, sound definitions, etc.

---

## Testing

### Manual Testing

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Run the VSCode extension** in debug mode:
   - Open the workspace in VSCode
   - Press F5 to launch the Extension Development Host
   - Open a Minecraft Bedrock project
   - Test completion in relevant JSON files

3. **Test scenarios**:
   - Create a new JSON file of your type
   - Position cursor in the location where completion should appear
   - Trigger completion (Ctrl+Space)
   - Verify correct items appear
   - Test with project data, vanilla data, and education mode

### Automated Testing

Consider adding unit tests in the test folders:
- Test that completion providers return expected items
- Test JSON path matching logic
- Test data filtering and transformation

---

## Common Issues

### Completion Not Appearing

1. **Check FileType detection**: Ensure your file is being detected with the correct FileType
2. **Check JSON path**: Verify the path matching logic is correct
3. **Check settings**: JSON completion must be enabled in user settings
4. **Check data availability**: Ensure the data source exists in the database

### Wrong Completions Appearing

1. **Path matching too broad**: Make your path matching more specific
2. **Wrong completion kind**: Use the appropriate `Kinds.Completion` type
3. **Incorrect data source**: Verify you're pulling from the correct database

### Performance Issues

1. **Filter data early**: Don't generate all completions if only a subset is needed
2. **Use efficient matching**: Prefer string matches over complex regex or functions
3. **Cache when appropriate**: Consider caching frequently used data

---

## Additional Resources

- [Json Validation Documentation](../Json%20Validation.md) - Learn about JSON schema validation
- [Mcfunctions Completion](./Mcfunctions.md) - Learn about mcfunction completion
- [Style Guide](../Style%20Guide.md) - Follow the project style guidelines
- [Source Code](../../ide/base/server/src/lsp/completion/) - Browse existing completion implementations

---

For questions or contributions, please open an issue or pull request on the [GitHub repository](https://github.com/Blockception/minecraft-bedrock-language-server).
