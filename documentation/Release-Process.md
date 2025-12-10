# Release Process

This document describes the complete release process for the Minecraft Bedrock Language Server monorepo.

## Overview

The repository uses **Changesets** for version management and **Release Drafter** for release notes. The process is highly automated with minimal manual intervention required.

## Process Flow

```
Developer PR → Main Branch → Version PR → Release Draft → Published Release
     ↓            ↓              ↓             ↓              ↓
  Changeset   Automated      Review &     Maintainer     Auto-publish
              Version PR      Merge        Creates        to NPM &
              Created                      Release        Marketplace
```

## Step-by-Step Process

### 1. Developer Makes Changes

When a developer makes changes that should trigger a version bump:

```bash
# Make your code changes
git checkout -b fix/some-bug

# Create a changeset
npm run changeset

# Follow the prompts to:
# - Select affected packages
# - Choose bump type (major/minor/patch)
# - Provide a description

# Commit everything including the changeset file
git add .
git commit -m "fix: description of the fix"
git push origin fix/some-bug
```

The changeset file will be created in `.changeset/` directory and should be committed with your PR.

### 2. PR is Merged to Main

When the PR is merged to `main`, two automated workflows run in parallel:

#### Changesets Version Workflow
- **What it does**: Creates or updates a "Version Packages" PR
- **PR contents**:
  - Version bumps for all affected packages
  - Updated CHANGELOG.md files
  - Updated internal dependencies
- **File**: `.github/workflows/changesets-version.yaml`

#### Release Drafter Workflow
- **What it does**: Creates or updates a release draft in GitHub Releases
- **Draft contents**:
  - Aggregated changelog entries
  - Categorized changes (features, fixes, etc.)
  - Version number based on labels
- **File**: `.github/workflows/release-drafter.yaml`

### 3. Review "Version Packages" PR

The automatically created "Version Packages" PR should be reviewed by maintainers:

**What to check:**
- ✅ Version bumps are correct for each package
- ✅ CHANGELOG entries are accurate
- ✅ Internal dependencies are properly updated
- ✅ No unintended packages are being versioned

**If changes look good:**
```bash
# Merge the PR (via GitHub UI)
```

### 4. Version PR is Merged

When the "Version Packages" PR is merged:
- All package versions are updated in the repository
- CHANGELOGs are updated with the latest changes
- Release Drafter creates a new draft for the new version

### 5. Create and Publish Release

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

When creating changesets, choose the appropriate bump type:

### Patch (0.0.X)
- Bug fixes
- Documentation updates
- Performance improvements
- Internal refactoring (no API changes)

**Example**: Fixing type inference bug
```bash
npm run changeset
# Select package(s)
# Choose "patch"
# Description: "Fixed type inference for entity components"
```

### Minor (0.X.0)
- New features (backwards compatible)
- New APIs or functions
- Deprecations (with backwards compatibility)
- Significant enhancements

**Example**: Adding new completion provider
```bash
npm run changeset
# Select package(s)
# Choose "minor"
# Description: "Added completion support for dialogue files"
```

### Major (X.0.0)
- Breaking changes
- Removed APIs
- Changed behavior that affects existing code
- Requires user migration

**Example**: Changing API signature
```bash
npm run changeset
# Select package(s)
# Choose "major"
# Description: "BREAKING: Changed parse() to return Result<T, Error>"
```

## Multiple Packages

If your change affects multiple packages, select all of them in the changeset:

```bash
npm run changeset
# Use Space to select multiple packages
# All selected packages can have different bump types
```

The generated changeset will look like:
```markdown
---
'bc-minecraft-bedrock-types': minor
'bc-minecraft-bedrock-project': patch
---

Added new entity types and updated project parser
```

## Emergency Hotfixes

For critical bugs that need immediate release:

1. Create a changeset with your fix
2. Merge PR to main
3. Immediately merge the auto-created "Version Packages" PR
4. Create and publish a new release

## Skipping Version Bumps

For changes that don't affect any packages (e.g., CI updates, tooling changes):
- **Don't create a changeset**
- The changes won't trigger version bumps
- They will still be included in Release Drafter notes if properly labeled

## Troubleshooting

### Changeset workflow fails
- Check that all dependencies in package.json files are valid
- Ensure no merge conflicts in package.json files
- Verify changesets configuration is correct

### Version numbers look wrong
- Review the changesets in the "Version Packages" PR
- Check previous version numbers in package.json files
- Ensure bump types were chosen correctly

### Release Drafter not creating drafts
- Check workflow permissions in repository settings
- Verify labels are correctly applied to PRs
- Review `.github/release-drafter.yml` configuration

## Related Files

- `.changeset/config.json` - Changesets configuration
- `.github/workflows/changesets-version.yaml` - Automated version PR creation
- `.github/workflows/release-drafter.yaml` - Release draft creation
- `.github/workflows/release-pipeline.yaml` - Publishing automation
- `.github/release-drafter.yml` - Release notes configuration
- `CONTRIBUTING.md` - Contributor guidelines including changeset usage

## Best Practices

1. **Always create a changeset** for changes that affect packages
2. **Be descriptive** in changeset summaries - they become CHANGELOG entries
3. **Select correct bump type** - follow semantic versioning
4. **Review Version PRs carefully** before merging
5. **Keep changesets focused** - one logical change per changeset
6. **Test before releasing** - ensure CI passes before publishing releases

## Questions?

- Read the [Changesets documentation](https://github.com/changesets/changesets)
- Check the [Contributing Guide](../CONTRIBUTING.md)
- Review [examples](./.changeset/README.example.md)
- Ask in repository discussions or issues
