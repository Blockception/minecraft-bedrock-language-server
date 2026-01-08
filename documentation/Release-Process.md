# Release Process

This document describes the complete release process for the Minecraft Bedrock Language Server monorepo.

## Overview

The repository uses **Release Drafter** for release notes. The process is automated with minimal manual intervention required.

## Package Structure

This repository contains multiple packages that can be versioned and released independently:

**Core Bedrock packages:**
- `bc-minecraft-bedrock-types` - Core type definitions
- `bc-minecraft-bedrock-vanilla-data` - Vanilla data structures
- `bc-minecraft-bedrock-command` - Command parsing and handling
- `bc-minecraft-molang` - Molang expression support
- `bc-minecraft-bedrock-project` - Project management
- `bc-minecraft-bedrock-diagnoser` - Diagnostic tools

**IDE/LSP packages:**
- `@blockception/ide-shared` - Shared IDE utilities
- `bc-minecraft-lsp-client` - LSP client implementation
- `bc-minecraft-lsp` - Language server implementation (depends on all Bedrock packages above)
- `blockceptionvscodeminecraftbedrockdevelopmentextension` - VS Code extension

**Independent packages:**
- `bc-minecraft-bedrock-shared` - Independent shared utilities
- `bc-minecraft-project` - Base project utilities
- `vanilla-scraper` - Data extraction tool
- `generate-command-data` - Command data generator

## Process Flow

```
Developer PR → Main Branch → Version Update (Auto/Manual) → Release Draft → Published Release
     ↓            ↓              ↓                            ↓              ↓
  Changes      Automated      Automated Workflow         Maintainer     Auto-publish
  Merged    Release Draft    Creates Version PR          Creates        to NPM &
            Created          (Release creates tags)       Release        Marketplace
```

## Step-by-Step Process

### 1. Developer Makes Changes

When a developer makes changes:

```bash
# Make your code changes
git checkout -b fix/some-bug

# Make changes to the code

# Commit everything
git add .
git commit -m "fix: description of the fix"
git push origin fix/some-bug
```

Create a pull request with your changes.

### 2. PR is Merged to Main

When the PR is merged to `main`, the Release Drafter workflow runs:

#### Release Drafter Workflow
- **What it does**: Creates or updates a release draft in GitHub Releases
- **Draft contents**:
  - Aggregated changelog entries
  - Categorized changes (features, fixes, etc.)
  - Version number based on labels
- **File**: `.github/workflows/release-drafter.yaml`

### 3. Version Update

When ready to release, maintainers update package versions. This can be done automatically or manually:

#### Option A: Automated Version Bump (Recommended)

Use the NPM Version Bump workflow (`.github/workflows/npm-version-bump.yaml`):

1. Go to **Actions** → **📦 NPM Version Bump**
2. Click **Run workflow**
3. Select the version bump type:
   - `patch` - Bug fixes and minor changes (0.0.X)
   - `minor` - New features, backwards compatible (0.X.0)
   - `major` - Breaking changes (X.0.0)
   - `prepatch` - Pre-release patch (0.0.X-0)
   - `preminor` - Pre-release minor (0.X.0-0)
   - `premajor` - Pre-release major (X.0.0-0)
4. The workflow will automatically:
   - Update all package.json files in packages and VSCode IDE
   - Create a Pull Request with the version changes
5. After merging the PR:
   - Create a GitHub Release to automatically generate git tags

#### Option B: Manual Version Update

Manually update package versions if you need more control:

**What to update:**
- ✅ Version numbers in package.json files for affected packages
- ✅ CHANGELOG entries for each package
- ✅ Internal dependencies to match new versions

**Best practices:**
- Follow semantic versioning (major.minor.patch)
- Update all interdependent packages together
- Keep the LSP and extension versions synchronized

### 4. Create and Publish Release

**Maintainer action required:**

1. Go to [GitHub Releases](https://github.com/Blockception/minecraft-bedrock-language-server/releases)
2. Find the latest draft release
3. Review the release notes
4. Edit if necessary
5. Click "Publish release"

**When release is published:**
- Release Pipeline workflow is triggered (`.github/workflows/release-pipeline.yaml`)
- VSCode extension is automatically published to marketplace
- NPM packages can be published (may require additional workflow setup)

## Version Bump Guidelines

When manually updating versions, choose the appropriate bump type:

### Patch (0.0.X)
- Bug fixes
- Documentation updates
- Performance improvements
- Internal refactoring (no API changes)

**Example**: Fixing type inference bug - bump from 1.2.3 to 1.2.4

### Minor (0.X.0)
- New features (backwards compatible)
- New APIs or functions
- Deprecations (with backwards compatibility)
- Significant enhancements

**Example**: Adding new completion provider - bump from 1.2.3 to 1.3.0

### Major (X.0.0)
- Breaking changes
- Removed APIs
- Changed behavior that affects existing code
- Requires user migration

**Example**: Changing API signature - bump from 1.2.3 to 2.0.0

## Package Dependencies

When updating versions, be mindful of package dependencies:

- The `bc-minecraft-lsp` package depends on all core Bedrock packages
- The VS Code extension depends on the LSP package
- Update dependent packages when their dependencies are updated
- Ensure version ranges in package.json files are compatible

## Emergency Hotfixes

For critical bugs that need immediate release:

1. Create a fix and merge PR to main
2. Manually update version in affected package.json files
3. Update CHANGELOG files
4. Commit and push the version updates
5. Create and publish a new release

## Skipping Version Bumps

For changes that don't affect any packages (e.g., CI updates, tooling changes):
- No version update needed
- Changes will still be included in Release Drafter notes if properly labeled

## Troubleshooting

### Release Drafter not creating drafts
- Check workflow permissions in repository settings
- Verify labels are correctly applied to PRs
- Review `.github/release-drafter.yml` configuration

## Related Files

- `.github/workflows/release-drafter.yaml` - Release draft creation
- `.github/workflows/release-pipeline.yaml` - Publishing automation
- `.github/release-drafter.yml` - Release notes configuration
- `CONTRIBUTING.md` - Contributor guidelines

## Best Practices

1. **Test before releasing** - ensure CI passes before publishing releases
2. **Keep versions synchronized** - especially for interdependent packages
3. **Document breaking changes** - clearly in CHANGELOG and release notes
4. **Follow semantic versioning** - consistently across all packages
5. **Review release drafts carefully** - before publishing

## Questions?

- Check the [Contributing Guide](../CONTRIBUTING.md)
- Review past releases for examples
- Ask in repository discussions or issues
