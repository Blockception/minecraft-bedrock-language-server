# Using Templates

Templates allow you to customize how files are created in your Minecraft Bedrock project. You can override default file names, locations, and content using template variables.

## Setup

1. Create a `.mcattributes` file in your project root (if it doesn't exist)
2. Define template attributes for the file types you want to customize

## Example: Customizing Entity Files

To customize entity file creation, add these lines to your `.mcattributes`:

```ini
template.behavior.entity.filename=entities/${{id.safe}}.json
template.behavior.entity.file=./templates/entity.bp.json
```

## Template Variables

Use `${{variable}}` syntax to insert dynamic values:

- `${{id}}` - The entity/block/item identifier
- `${{id.safe}}` - A safe version of the identifier
- `${{id.safe.nonamespace}}` - Safe identifier without namespace
- `${{pack.type}}` - Pack type (behavior, resource, etc.)
- `${{uuid}}` - Random UUID

## Creating a Custom Template

1. Create a `templates` folder in your project
2. Create a template file (e.g., `entity.bp.json`)
3. Use template variables in your template:

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

4. Reference the template in `.mcattributes`
5. Create a new entity using the command palette

## Learn More

For a complete list of template attributes and variables, see:

- [Templates Documentation](https://github.com/Blockception/minecraft-bedrock-language-server/blob/main/documentation/template/templates.md)
- [Template Variables](https://github.com/Blockception/minecraft-bedrock-language-server/blob/main/documentation/template/variables.md)
