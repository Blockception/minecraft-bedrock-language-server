# generate-package-globs

Generates the `jsonValidation` glob patterns in `ide/vscode/package.json` from
a typed TypeScript config (`src/schema-mappings.ts`), replacing the ~700-line
hand-maintained JSON block with a deterministic, reviewable source of truth.

## Usage

```sh
# Regenerate ide/vscode/package.json (run from the repository root)
npm run generate -w generate-package-globs

# Check whether the file is up to date (used in CI)
npm run check -w generate-package-globs
```

## How it works

`src/schema-mappings.ts` exports a `SCHEMA_MAPPINGS` array. Each entry is one
of two shapes:

| Type | Description |
|------|-------------|
| `simple` | Static `fileMatch` array copied verbatim. |
| `pack` | Folder path expanded into the full set of RP/BP prefix patterns. |

For `pack` entries the generator emits **five shallow** patterns (one per pack
prefix) and, when `deepPath` is provided, **five deep** (`**/*`) patterns.
Optional `extra` and `negate` arrays are appended last.

### Resource-pack prefixes

```
resource_packs/*   *resource*pack*   *Resource*Pack*   *RP*   *rp*
```

### Behavior-pack prefixes

```
behavior_packs/*   *behavior*pack*   *Behavior*Pack*   *BP*   *bp*
```

## Adding a new schema

Add a new entry to `SCHEMA_MAPPINGS` in `src/schema-mappings.ts`, then run the
generator. The CI check will fail if the generated section in `package.json` is
not committed.
