# mc-disable Feature

This feature allows you to disable specific diagnostic codes in your files using special comments.

## Usage

### Disable diagnostic for entire file

Add a comment at the top of your file to disable a diagnostic for the entire file:

```mcfunction
// mc-disable behaviorpack.mcfunction.empty
// mc-disable minecraft.objective.missing, minecraft.tag.missing
```

You can disable multiple codes:
- On separate lines
- On the same line, separated by commas

### Disable diagnostic for next line

Add a comment on the line before the code that triggers the diagnostic:

```mcfunction
// mc-disable-next-line behaviorpack.mcfunction.empty
say Hello World
```

## Quick Fixes

When you have a diagnostic in your code, you now have three quick fix options:

1. **Disable in project** - Adds the diagnostic code to your `.mcattributes` file (project-wide)
2. **Disable for this file** - Adds a `// mc-disable` comment at the top of the current file
3. **Disable for this line** - Adds a `// mc-disable-next-line` comment on the line before the diagnostic

## Examples

### Example 1: Disable empty mcfunction warning

```mcfunction
// mc-disable-next-line behaviorpack.mcfunction.empty
```

### Example 2: Disable multiple errors in a file

```mcfunction
// mc-disable minecraft.objective.missing
// mc-disable minecraft.tag.missing
scoreboard players add @a obj 1
tag @s add customTag
```

### Example 3: Using commas to disable multiple codes

```mcfunction
// mc-disable-next-line minecraft.objective.missing, minecraft.tag.missing
scoreboard players add @a obj 1
```

## Syntax

- Format: `// mc-disable <code>[, <code2>, ...]`
- Format: `// mc-disable-next-line <code>[, <code2>, ...]`
- Codes are separated by commas
- Whitespace around codes is trimmed
- Comments must start with `//` followed by `mc-disable` or `mc-disable-next-line`
- The directive must be on its own line
