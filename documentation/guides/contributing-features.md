# Contributing Your Own Diagnostics, Autocompletions, or Definitions

A workflow-centric guide for contributors who want to add diagnostics, completions, or custom type definitions to the Minecraft Bedrock Language Server — whether for the upstream repository or for private use.

---

## Table of Contents

- [Who This Guide Is For](#who-this-guide-is-for)
- [Prerequisites and Setup](#prerequisites-and-setup)
- [Understanding What You Can Contribute](#understanding-what-you-can-contribute)
- [Finding the Right Place to Make Changes](#finding-the-right-place-to-make-changes)
- [Step-by-Step Contribution Workflow](#step-by-step-contribution-workflow)
- [Implementing Your Feature](#implementing-your-feature)
- [Writing Tests](#writing-tests)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Getting Help and Reviews](#getting-help-and-reviews)
- [Contributing for Private Use](#contributing-for-private-use)

---

## Who This Guide Is For

This guide is for anyone who wants to:

- Add a **new diagnostic** (error/warning/info check) for Bedrock project files
- Add or extend **autocomplete (completion)** suggestions in JSON or mcfunction files
- Contribute **custom type definitions** or project definitions
- Make changes for **private use** without opening a pull request

No prior experience with language servers is required, but familiarity with **TypeScript** and **npm workspaces** will help.

---

## Prerequisites and Setup

### Tools Required

- **Node.js** v18 or later — [nodejs.org](https://nodejs.org/)
- **npm** v8 or later (bundled with Node.js)
- **Git** — [git-scm.com](https://git-scm.com/)
- **VSCode** (optional, but recommended) — [code.visualstudio.com](https://code.visualstudio.com/)

### 1. Fork the Repository

Click **Fork** on the [GitHub repository page](https://github.com/Blockception/minecraft-bedrock-language-server) to create your own copy.

### 2. Clone Your Fork

```sh
git clone https://github.com/<your-username>/minecraft-bedrock-language-server.git
cd minecraft-bedrock-language-server
```

### 3. Install Dependencies

This installs dependencies for all packages in the monorepo:

```sh
npm install
```

### 4. Build the Project

Compile all TypeScript packages:

```sh
npm run build
```

### 5. Run Tests

Verify that everything works before making changes:

```sh
npm test
```

If all tests pass, you are ready to start contributing.

---

## Understanding What You Can Contribute

The language server supports several types of features, each living in a specific package:

| Feature | What It Does | Where to Look |
|---------|-------------|---------------|
| **Diagnostics** | Reports errors, warnings, or hints for invalid content in Bedrock files | `packages/bedrock-diagnoser/` |
| **Completions** | Suggests values when editing JSON or mcfunction files | `ide/base/server/src/lsp/completion/` |
| **Definitions (Go-to-Definition)** | Navigates from a reference to its definition | `ide/base/server/src/lsp/definition/` |
| **Type definitions / project data** | Describes types, entities, blocks, and other Bedrock concepts | `packages/bedrock-types/` and `packages/bedrock-project/` |
| **Custom project definitions** | User-defined tags, entities, objectives via `.mcattributes` / `.mcdefinitions` | See [MCDefinitions](../project/MCDefinitions.md) |

### Quick Decision Chart

```
Do you want to check for mistakes in files?
  → Add a Diagnostic (see packages/bedrock-diagnoser/)

Do you want to suggest values while typing?
  → Add a Completion (see ide/base/server/src/lsp/completion/)

Do you want Ctrl+Click / Go-to-Definition to work?
  → Add a Definition handler (see ide/base/server/src/lsp/definition/)

Do you want to describe your own entities, tags, etc.?
  → Use .mcdefinitions (see documentation/project/MCDefinitions.md)
```

---

## Finding the Right Place to Make Changes

### Diagnostics

All diagnostic logic lives in:

```
packages/bedrock-diagnoser/src/diagnostics/
├── behavior-pack/        # Checks for behavior pack files (entities, items, blocks, …)
├── resource-pack/        # Checks for resource pack files (animations, sounds, …)
├── general/              # Generic value checks (integers, booleans, floats, …)
├── minecraft/            # Minecraft-specific checks (selectors, effects, …)
├── molang/               # Molang expression checks
└── errors/               # Shared error utilities
```

Look for a subfolder that matches the type of file or concept you are checking. If one already exists, add your check to the relevant file in that folder. If not, create a new subfolder following the existing pattern.

### Completions

Completion logic lives in:

```
ide/base/server/src/lsp/completion/minecraft/
├── behavior-pack/        # Completions for behavior pack JSON files
├── resource-pack/        # Completions for resource pack JSON files
└── (general)             # Shared completion utilities
```

Each file type (entity, item, block, …) typically has its own `.ts` file.

### Definitions (Go-to-Definition)

Definition handlers live in:

```
ide/base/server/src/lsp/definition/
```

### Vanilla / Type Data

If your change requires adding new Minecraft data (new entity IDs, block states, etc.):

- **Vanilla data**: `packages/bedrock-vanilla-data/`
- **Type definitions**: `packages/bedrock-types/`

---

## Step-by-Step Contribution Workflow

### 1. Open an Issue (Recommended for New Features)

Before starting significant work, [open an issue](https://github.com/Blockception/minecraft-bedrock-language-server/issues) to describe the change you want to make. This lets maintainers provide early feedback, avoid duplicate work, and guide your implementation.

For **small fixes** (typos, minor corrections, obvious bugs), you can skip this step and open a pull request directly.

### 2. Create a Branch

Create a dedicated branch from `main`:

```sh
git checkout main
git pull origin main
git checkout -b feature/my-feature-name
```

Use a descriptive branch name such as `feature/diagnose-missing-loot-table` or `fix/entity-event-completion`.

### 3. Make Your Changes

Follow the [Implementing Your Feature](#implementing-your-feature) section below.

### 4. Lint Your Code

```sh
npm run lint
```

Fix any warnings or errors before continuing.

### 5. Run the Tests

```sh
npm test
```

All existing tests must pass. If you added new tests, make sure those pass too.

### 6. Commit Your Changes

Use clear and concise commit messages:

```sh
git add .
git commit -m "feat(diagnoser): add missing loot table diagnostic"
```

### 7. Push and Open a Pull Request

```sh
git push origin feature/my-feature-name
```

Then open a pull request on GitHub (see [Submitting a Pull Request](#submitting-a-pull-request)).

---

## Implementing Your Feature

### Adding a Diagnostic

See the detailed guide: [Creating Diagnostics](./creating-diagnostics.md)

**Quick example** — checking that a required property exists:

```typescript
// packages/bedrock-diagnoser/src/diagnostics/behavior-pack/loot-table/diagnose.ts
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export function diagnose_loot_table_pool(
  pool: LootPool,
  path: string,
  diagnoser: DiagnosticsBuilder
): void {
  if (!pool.rolls) {
    diagnoser.add(
      `${path}/rolls`,
      'Loot table pool is missing required property: rolls',
      DiagnosticSeverity.error,
      'behaviorpack.loot_table.pool.rolls.missing'
    );
  }
}
```

**Error code naming**: follow the `category.subcategory.type.detail` convention (all lowercase). See the [Style Guide](../Style%20Guide.md) for details.

---

### Adding a Completion

See the detailed guide: [JSON Completion](./completion-json.md)

**Quick example** — suggesting loot table file names:

```typescript
// ide/base/server/src/lsp/completion/minecraft/behavior-pack/my-feature.ts
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder;

  // Suggest items from the current project
  builder.generate(
    context.database.ProjectData.behaviorPacks.loot_tables,
    (item) => `Loot table: ${item.id}`
  );

  // Suggest vanilla items
  builder.generate(
    MinecraftData.vanilla.BehaviorPack.loot_tables,
    (item) => `Vanilla loot table: ${item.id}`
  );
}
```

Then register this function in the appropriate `main.ts` for behavior pack or resource pack completions.

---

### Adding a Custom Type Definition

If you want to describe a new Minecraft concept (for example, a new component or a new field on an existing entity), update the relevant files in:

- `packages/bedrock-types/` — TypeScript interfaces and types
- `packages/bedrock-project/` — Project-level parsing and data collection

After changing type data, rebuild and rerun the tests to make sure the rest of the codebase still compiles.

---

### Using Custom Project Definitions (Private Use)

If you only want custom definitions **locally** (for your own workspace, without modifying the repository), use the `.mcdefinitions` project file. See [MCDefinitions](../project/MCDefinitions.md) for the full reference.

---

## Writing Tests

Every diagnostic addition should have a corresponding test. The test infrastructure uses **Jest** and a custom test helper in `packages/bedrock-diagnoser/test/`.

### Test File Location

Place tests under:

```
packages/bedrock-diagnoser/test/lib/diagnostics/<category>/<subcategory>/
```

### Example Test

```typescript
// packages/bedrock-diagnoser/test/lib/diagnostics/behavior-pack/loot-table/pool.test.ts
import { TestDiagnoser } from '../../../../diagnoser';
import { diagnose_loot_table_pool } from '../../../../../src/diagnostics/behavior-pack/loot-table/diagnose';

describe('diagnose_loot_table_pool', () => {
  it('should report an error when rolls is missing', () => {
    const diagnoser = TestDiagnoser.create();
    diagnose_loot_table_pool({} as any, 'pools/0', diagnoser);

    expect(diagnoser.count).toBeGreaterThan(0);
    expect(diagnoser.items[0].code).toBe('behaviorpack.loot_table.pool.rolls.missing');
  });

  it('should not report an error when rolls is present', () => {
    const diagnoser = TestDiagnoser.create();
    diagnose_loot_table_pool({ rolls: 1 } as any, 'pools/0', diagnoser);

    expect(diagnoser.count).toBe(0);
  });
});
```

Run only the tests for the package you changed:

```sh
cd packages/bedrock-diagnoser
npm test
```

Or run all tests from the root:

```sh
npm test
```

---

## Submitting a Pull Request

### What to Include in Your PR Description

A good pull request description helps reviewers understand and approve your change faster. Include:

1. **What the change does** — One or two sentences summarizing the new feature or fix.
2. **Why it is needed** — Link to the related issue if one exists (e.g., `Closes #123`).
3. **How to test it manually** — Describe any steps the reviewer can follow to verify the change.
4. **Checklist** (optional but appreciated):
   - [ ] I have run `npm run lint` and fixed all warnings
   - [ ] I have run `npm test` and all tests pass
   - [ ] I have added tests for new functionality
   - [ ] I have updated documentation where relevant

### PR Title Convention

Use a short, descriptive title in imperative mood:

```
feat(diagnoser): add missing loot table pool diagnostic
fix(completion): correct entity event suggestions in behavior packs
docs: add contributor guide for custom features
```

### What Reviewers Look For

- **Naming conventions**: error codes and function names follow the [Style Guide](../Style%20Guide.md)
- **Test coverage**: new diagnostics or completions have tests
- **Scope**: the change is focused and does not include unrelated modifications
- **Code style**: code is formatted consistently with the rest of the codebase

---

## Getting Help and Reviews

| Resource | Purpose |
|----------|---------|
| [GitHub Issues](https://github.com/Blockception/minecraft-bedrock-language-server/issues) | Report bugs, request features, or ask for guidance before starting |
| [GitHub Discussions](https://github.com/Blockception/minecraft-bedrock-language-server/discussions) | General questions and community conversation |
| Pull request comments | Ask for clarification or feedback directly on your PR |
| [CONTRIBUTING.md](../../CONTRIBUTING.md) | High-level contribution guidelines |
| [Code of Conduct](../../CODE_OF_CONDUCT.md) | Community standards |

**Tips for getting faster reviews:**

- Keep pull requests small and focused on one thing.
- Write a clear description so reviewers understand your intent without reading all the code.
- Respond promptly to review comments to keep the conversation moving.
- If a PR sits for more than a week without feedback, leave a polite comment to ping reviewers.

---

## Contributing for Private Use

If you want to use these features in your own tooling **without** contributing back to the repository:

1. **Fork the repository** (see [Prerequisites and Setup](#prerequisites-and-setup)).
2. Make your changes on your fork — you do not need to open a pull request.
3. **Link your fork** locally instead of the published npm packages:
   ```sh
   npm run build
   npm link
   ```
4. In your own project, link to your local build:
   ```sh
   npm link bc-minecraft-bedrock-diagnoser
   ```
5. Rebuild your fork whenever you update it:
   ```sh
   npm run build
   ```

For workspace-level custom definitions that do not require code changes, see [MCDefinitions](../project/MCDefinitions.md) and [MCAttributes](../project/MCAttributes.md).

---

## Related Guides

- [Creating Diagnostics](./creating-diagnostics.md) — Detailed reference for adding diagnostic error codes
- [JSON Completion](./completion-json.md) — Detailed reference for adding autocomplete support
- [MCDefinitions](../project/MCDefinitions.md) — Define custom entities, tags, and objectives per project
- [Style Guide](../Style%20Guide.md) — Code style conventions
- [Debugging](../Debugging.md) — How to debug the language server during development

---

**Happy contributing!** 🎉 If you get stuck, open an issue — the maintainers are happy to help.
