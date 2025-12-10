# Guides

This folder contains step-by-step guides for implementing features and extending the Minecraft Bedrock Language Server.

## Overview

These guides are designed for developers who want to:

- Add new features to the language server
- Understand the codebase architecture
- Contribute to the project

## Contents

- [JSON Completion](./completion-json.md) - Comprehensive guide for adding JSON completion (autocomplete) support to new file types
- [Creating Diagnostics](./creating-diagnostics.md) - Guide for adding new diagnostic error codes to the language server

## Guide Structure

Each guide typically includes:

- **Overview** - What the feature does and when to use it
- **Architecture** - How the feature is structured in the codebase
- **Step-by-Step Implementation** - Detailed instructions for implementing the feature
- **Examples** - Code examples from the existing codebase
- **Best Practices** - Tips for writing maintainable code
- **Testing** - How to test your implementation
- **Common Issues** - Troubleshooting tips

## Before You Start

Before following any guide, make sure you:

1. Have cloned the repository and installed dependencies
2. Can build the project successfully (`npm run build`)
3. Are familiar with TypeScript and the Language Server Protocol
4. Have read the [Contributing Guide](../../CONTRIBUTING.md) and [Style Guide](../Style%20Guide.md)

## Related Documentation

- [Completion](../completion/) - Documentation for completion features
- [Project Configuration](../project/) - Project-level configuration
- [Style Guide](../Style%20Guide.md) - Code style and conventions
- [Debugging](../Debugging.md) - How to debug the language server

## Contributing New Guides

If you'd like to add a new guide:

1. Create a new markdown file in this folder
2. Follow the structure of existing guides
3. Include clear examples and explanations
4. Update this README to link to your new guide
5. Test all code examples and links

For questions or suggestions, please open an issue on [GitHub](https://github.com/Blockception/minecraft-bedrock-language-server/issues).
