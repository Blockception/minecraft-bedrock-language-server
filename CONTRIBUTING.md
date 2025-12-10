# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a
change, creating an issue for a feature request is also acceptable. For smaller fixes, additions or changes a simple fork and pull request is sufficient.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Version Management with Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to manage package versions and changelogs. When making changes that should trigger a version bump, you need to create a changeset.

### Creating a Changeset

When you make a change that affects any package (bug fix, new feature, breaking change), run:

```bash
npm run changeset
```

This will prompt you to:
1. Select which packages are affected by your change
2. Choose the type of version bump (major, minor, or patch)
3. Provide a summary of the change

The changeset will be saved as a markdown file in the `.changeset` directory. Include this file in your pull request.

### Version Bump Guidelines

- **Major**: Breaking changes that require users to update their code
- **Minor**: New features that are backward compatible
- **Patch**: Bug fixes and minor improvements

### How It Works

When your PR is merged to `main`:
1. The changesets GitHub Action will detect the changeset files
2. It will automatically create or update a "Version Packages" PR
3. This PR will contain all version bumps and updated CHANGELOGs
4. When the Version PR is merged, all affected packages will be versioned accordingly
5. The release workflow can then publish the updated packages

### Manual Version Update

If you need to manually update versions (not recommended), you can run:

```bash
npm run version-packages
```

This will consume all changesets and update package versions and changelogs.
