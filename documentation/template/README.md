# Template System

This folder contains documentation for the template system used to create new Minecraft Bedrock files.

## Overview

The template system allows you to customize how the language server creates new files for your Minecraft projects. You can:

- Override default file templates
- Customize file naming patterns
- Use variables for dynamic content
- Create consistent file structures across your project

## Contents

- [Templates](./templates.md) - How to create and configure custom templates
- [Variables](./variables.md) - Available template variables for substitution

## Quick Start

Templates are configured through the [`.mcattributes`](../project/MCAttributes.md) file in your project root.

### Basic Example

```ini
# Customize entity file naming
template.behavior.entity.filename=entities/${{id.safe}}.entity.json

# Use a custom template file
template.behavior.entity.file=./.minecraft/templates/entity.bp.json
```

### Template File Example

```json
{
  "format_version": "1.20.41",
  "minecraft:entity": {
    "description": {
      "identifier": "${{id}}",
      "is_spawnable": true,
      "is_summonable": true
    },
    "components": {}
  }
}
```

## How Templates Work

1. **User triggers file creation** - Via command palette or IDE integration
2. **Template is selected** - Based on file type (entity, block, item, etc.)
3. **Variables are replaced** - `${{variable}}` syntax is substituted with actual values
4. **File is created** - At the specified location with the generated content

## Template Variables

The template system supports various variables that are automatically replaced:

- `${{id}}` - The identifier entered by the user
- `${{id.safe}}` - A sanitized version of the identifier
- `${{filename}}` - The name of the file being created
- `${{uuid}}` - A randomly generated UUID
- And more...

For a complete list, see [Variables](./variables.md).

## Available Templates

You can customize templates for:

### Behavior Pack
- Entities, blocks, items
- Animations and animation controllers
- Loot tables, recipes, trading
- Spawn rules, dialogues
- Manifests and more

### Resource Pack
- Entities, models, attachables
- Animations and animation controllers
- Particles, render controllers
- Texture definitions
- Sound definitions
- Manifests and more

### World Pack
- Manifests

For the complete list of template attributes, see [Templates](./templates.md).

## Best Practices

1. **Use version control** - Keep template files in your project repository
2. **Start with defaults** - Only override what you need to customize
3. **Test templates** - Create test files to verify your templates work correctly
4. **Use safe identifiers** - Prefer `${{id.safe}}` over `${{id}}` for filenames
5. **Document custom templates** - Add comments explaining customizations

## Examples

### Custom Entity Template

Create a file at `.minecraft/templates/entity.bp.json`:

```json
{
  "format_version": "1.20.41",
  "minecraft:entity": {
    "description": {
      "identifier": "${{id}}",
      "is_spawnable": true,
      "is_summonable": true,
      "is_experimental": false
    },
    "component_groups": {},
    "components": {
      "minecraft:type_family": {
        "family": ["${{id.safe.nonamespace}}"]
      },
      "minecraft:collision_box": {
        "width": 1,
        "height": 1
      },
      "minecraft:physics": {}
    },
    "events": {}
  }
}
```

Configure in `.mcattributes`:

```ini
template.behavior.entity.filename=entities/${{id.safe}}.json
template.behavior.entity.file=./.minecraft/templates/entity.bp.json
```

### Custom Filename Pattern

```ini
# Use different naming convention
template.behavior.block.filename=blocks/${{id.safe.nonamespace}}.block.bp.json
template.resource.block.filename=blocks/${{id.safe.nonamespace}}.block.rp.json
```

## Related Documentation

- [MCAttributes](../project/MCAttributes.md) - Configure templates in your project
- [Commands](../Commands.md) - Commands that use templates to create files
- [Style Guide](../Style%20Guide.md) - Coding conventions

## Troubleshooting

**Template not being used:**
- Check that `.mcattributes` is in the project root
- Verify the template file path is correct
- Ensure the template file exists at the specified location

**Variables not being replaced:**
- Use the correct syntax: `${{variable}}`
- Check that the variable name is valid (see [Variables](./variables.md))
- Ensure braces are doubled: `${{}}` not `${}`

**Invalid JSON after substitution:**
- Test your template with sample values
- Check for missing commas or quotes after variable substitution
- Use a JSON validator on the generated file

For more help, see the [Debugging](../Debugging.md) guide or open an issue on [GitHub](https://github.com/Blockception/minecraft-bedrock-language-server/issues).
