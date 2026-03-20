# Style Guide

## Diagnostics Code

All diagnostic codes must be fully lowercase and use singular nouns (no plurals).

Format: `<scope>.<sub-scope>.<descriptor>`

```
resourcepack.entity.missing
molang.variable.invalid
molang.variable.missing
```

## Diagnostics Message

Dynamic values inside diagnostic messages are wrapped in single quotes:

```
Missing a resourcepack definition of the entity: 'minecraft:creeper'
```

## TypeScript Conventions

- Follow the existing patterns in each package before introducing new patterns.
- Prefer `const` over `let`; avoid `var`.
- Use explicit return types for public functions and class methods.
- Use `interface` for object shapes and `type` for unions, intersections, and aliases.
- Avoid non-null assertions (`!`) unless unavoidable; use proper null checks instead.

## Naming Conventions

| Construct        | Convention        | Example                    |
| ---------------- | ----------------- | -------------------------- |
| Classes          | `PascalCase`      | `DiagnosticsBuilder`       |
| Interfaces       | `PascalCase`      | `ProjectData`              |
| Functions        | `camelCase`       | `getDiagnostics`           |
| Variables        | `camelCase`       | `blockCount`               |
| Constants        | `camelCase`       | `defaultTimeout`           |
| Enum members     | `PascalCase`      | `DiagnosticSeverity.Error` |
| Files            | `kebab-case`      | `block-properties.ts`      |
| Test files       | `*.test.ts`       | `commands.test.ts`         |

## File Organization

- Source files live under `src/`.
- Test files mirror the source structure under `test/`.
- Each package has its own `package.json` and `tsconfig.json`.

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

Examples:

```
feat(diagnoser): add block-property validation
fix(molang): correct variable scoping in nested expressions
docs: update Style Guide with naming conventions
```

- Keep the subject line under 72 characters.
- Use the imperative mood ("add", not "adds" or "added").
- Reference issues where relevant: `fix(commands): handle missing manifest (#123)`.
