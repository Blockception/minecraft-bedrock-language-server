# Project Configuration

This folder contains documentation for project-level configuration files used by the Minecraft Bedrock Language Server.

## Overview

The language server uses special configuration files to customize behavior for individual projects. These files allow you to:

- Configure diagnostics and validation settings
- Define custom entities, tags, and objectives
- Exclude files and folders from analysis
- Customize file templates

## Configuration Files

### [MCAttributes](./MCAttributes.md)

The `.mcattributes` file stores project settings and attributes.

**Key features:**
- Enable/disable diagnostics for different file types
- Configure Education Edition support
- Set template preferences
- Override default plugin settings

**Example:**
```ini
diagnose=true
diagnose.mcfunctions=true
education.enable=false
```

### [MCDefinitions](./MCDefinitions.md)

The `.mcdefinitions` file specifies custom definitions that exist in your project but may not be easily detected by the language server.

**Key features:**
- Define custom tags
- Declare objectives
- Specify entity names
- List entity families
- Exclude unwanted definitions

**Example:**
```ini
# Tags used in the map
tag=initialized
tag=enemy

# Objectives
objective=coins
objective=health
```

### [MCIgnore](./MCIgnore.md)

The `.mcignore` file uses glob patterns to exclude files and folders from the project, similar to `.gitignore`.

**Key features:**
- Exclude template files
- Ignore test data
- Skip auto-generated files
- Support for negation patterns

**Example:**
```ini
# Ignore template folders
Template/
**/templates/

# But include specific files
!Template/settings.json
```

## File Locations

These configuration files should be placed in the root of your Minecraft project:

```
my-project/
├── .mcattributes
├── .mcdefinitions
├── .mcignore
├── behavior_packs/
└── resource_packs/
```

## How It Works

1. The language server searches for these files when opening a project
2. Settings are applied at the project level
3. If no configuration files exist, default settings are used
4. Changes to configuration files are detected automatically

## Best Practices

- **Start simple** - Add configuration only when needed
- **Use comments** - Document why settings are configured a certain way
- **Share configurations** - Include these files in version control
- **Test thoroughly** - Verify that exclusions and definitions work as expected

## Related Documentation

- [Commands](../Commands.md) - Commands for creating project files
- [Templates](../template/) - Template configuration and variables
- [Style Guide](../Style%20Guide.md) - General coding and documentation style

## Troubleshooting

If configuration changes aren't taking effect:

1. Check for syntax errors in your configuration files
2. Reload the VSCode window
3. Verify file names are exactly `.mcattributes`, `.mcdefinitions`, or `.mcignore`
4. Check the language server output for error messages

For more help, see the [Debugging](../Debugging.md) guide or open an issue on [GitHub](https://github.com/Blockception/minecraft-bedrock-language-server/issues).
