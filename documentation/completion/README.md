# Completion Documentation

This folder contains documentation for the autocomplete and IntelliSense features provided by the Minecraft Bedrock Language Server.

## Overview

The completion system provides intelligent suggestions while editing Minecraft Bedrock files, including:

- **Mcfunction files** - Command completion and syntax suggestions
- **JSON files** - Property completion and value suggestions
- **Molang expressions** - Query and function completion

## Contents

- [Mcfunctions](./Mcfunctions.md) - Completion for mcfunction files, including how comments are used for completion text

## Related Documentation

For detailed guides on implementing JSON completion features, see:

- [JSON Completion Guide](../guides/completion-json.md) - Comprehensive guide for adding JSON completion support

## How Completion Works

The language server analyzes your project structure and provides context-aware completions based on:

1. **Project data** - Your custom entities, items, blocks, and other definitions
2. **Vanilla data** - Built-in Minecraft content
3. **Education data** - Education Edition content (when enabled)

Completions are triggered automatically as you type or manually with keyboard shortcuts (typically Ctrl+Space).

## Configuration

Completion features can be configured through:

- VSCode settings
- [Project attributes](../project/MCAttributes.md) in the `.mcattributes` file

For more information about project configuration, see the [Project Configuration](../project/) documentation.
