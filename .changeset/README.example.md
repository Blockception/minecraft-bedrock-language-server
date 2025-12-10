# Changesets Example Workflow

This document provides a quick example of how to use changesets in this repository.

## Scenario: You fixed a bug in the `bc-minecraft-bedrock-types` package

### Step 1: Create a changeset

After making your code changes, run:

```bash
npm run changeset
```

You'll be prompted to:
1. Select which packages are affected (e.g., `bc-minecraft-bedrock-types`)
2. Choose the bump type (patch for bug fixes)
3. Provide a summary (e.g., "Fixed type inference for entity components")

This creates a markdown file in `.changeset/` directory.

### Step 2: Commit and create PR

```bash
git add .
git commit -m "fix: correct entity component type inference"
git push
```

Then create a pull request with your changes.

### Step 3: Merge your PR

Once your PR is reviewed and merged to `main`:
- The changesets GitHub Action automatically detects your changeset
- It creates or updates a PR titled "chore: version packages"
- This PR contains all the version bumps and CHANGELOG updates

### Step 4: Review and merge the Version PR

Review the "Version Packages" PR to ensure version bumps are correct, then merge it.

### Step 5: Publish (done by maintainers)

When a GitHub release is created, the CI/CD pipeline automatically publishes the updated packages to npm and marketplace.

## Example Changeset File

```markdown
---
'bc-minecraft-bedrock-types': patch
---

Fixed type inference for entity components
```

## Multiple Package Changes

If your change affects multiple packages, select all of them when creating the changeset:

```markdown
---
'bc-minecraft-bedrock-types': patch
'bc-minecraft-bedrock-project': patch
---

Updated shared type definitions across packages
```

## Version Bump Guidelines

- **patch**: Bug fixes, documentation, minor changes (0.0.X)
- **minor**: New features, backwards compatible (0.X.0)
- **major**: Breaking changes (X.0.0)

## Linked Packages

This repository uses **linked packages** to ensure related packages are versioned together. When you create a changeset for one package in a linked group, **all packages in that group will receive the same version bump**.

### Linked Groups:
1. **Core Bedrock packages**: types, vanilla-data, command, molang, bedrock-project, diagnoser
2. **IDE/LSP packages**: ide-shared, lsp-client, lsp, vscode extension

**Example**: If you create a patch changeset for `bc-minecraft-bedrock-types`, all other core Bedrock packages will also receive a patch bump automatically. You only need to create the changeset for the package you directly modified.

For more details, see the [Release Process](../documentation/Release-Process.md) documentation.
