# bc-minecraft-bedrock-types

## 9.0.9

### Patch Changes

- 64f1c5e: Fixed type inference for entity components

  ````

  ## Multiple Package Changes

  If your change affects multiple packages, select all of them when creating the changeset:

  ```markdown
  ---
  'bc-minecraft-bedrock-types': patch
  'bc-minecraft-bedrock-project': patch
  ---

  Updated shared type definitions across packages
  ````

  ## Version Bump Guidelines
  - **patch**: Bug fixes, documentation, minor changes (0.0.X)
  - **minor**: New features, backwards compatible (0.X.0)
  - **major**: Breaking changes (X.0.0)

  ## Linked Packages

  This repository uses **linked packages** to ensure related packages are versioned together. When you create a changeset for one package in a linked group, **all packages in that group will receive the same version bump**.

  ### All Core Packages (Single Linked Group):

  All 10 packages are linked together: **types, vanilla-data, command, molang, bedrock-project, diagnoser, ide-shared, lsp-client, lsp, vscode extension**

  **Why all together?** The `bc-minecraft-lsp` package depends on all core Bedrock packages, creating a dependency chain that requires synchronized versioning across the entire stack.

  **Example**: If you create a patch changeset for `bc-minecraft-bedrock-types`, **all 10 packages** (including the VS Code extension) will receive a patch bump automatically. You only need to create the changeset for the package you directly modified.

  **Independent packages** that version separately: `@blockception/packages-shared`, `bc-minecraft-project`, `vanilla-scraper`

  For more details, see the [Release Process](../documentation/Release-Process.md) documentation.
