# Releasing

This repo ships several artifacts:

- VS Code extension (folder: `ide/vscode`)
- Independent npm packages (folder: `packages/*`)
- Drafted GitHub Releases (automated notes via Release Drafter)

Below is the end-to-end guide for each, plus how the CI workflows wire it all together.

## Release notes with Release Drafter

- A Release Drafter workflow runs on every push to `main` and updates a draft release with grouped changes.
	- Workflow: `.github/workflows/release-drafter.yaml`
	- Config: `.github/release-drafter.yml`
- Labels drive both the section grouping and the version bump:
	- Categories: feature/enhancement, bug/fix, documentation, CI/CD, etc.
	- Version resolver: add label `major`, `minor`, or `patch` on a PR to influence the next version; default is patch.
- When you’re ready to ship, publish the drafted release on GitHub. That event can kick off further automation (see Release pipeline below).

Quick links:

- Config categories and labels: `.github/release-drafter.yml`
- Action used: `release-drafter/release-drafter@v6`

## Releasing the VS Code extension

There are two supported paths: through CI (recommended) or locally.

### CI: Release via GitHub Actions

- Reusable workflow: `.github/workflows/release-ide.yaml`
- Marketplace item: https://marketplace.visualstudio.com/items?itemName=BlockceptionLtd.blockceptionvscodeminecraftbedrockdevelopmentextension
- Requirements:
	- Node version is read from `.nvmrc` (currently `v24`).
	- Secret `VSCODE_KEY` must be set in the repo/org as a VS Code Marketplace Personal Access Token (PAT) for the publisher `BlockceptionLtd`.

Ways to trigger:

- Manually: run the “Release IDE” workflow from the Actions tab.
- Automatically: publishing a GitHub Release triggers the pipeline in `.github/workflows/release-pipeline.yaml`, which calls the IDE release and then attaches built artifacts to the GitHub Release.

What the workflow does:

1. Checks out the repo and installs dependencies at the repo root.
2. Runs `npm run compile` to build all workspaces.
3. Packages the VS Code extension in `ide/vscode` with `npx vsce package`, producing `vscode-extension.vsix` and uploads it as a build artifact.
4. Publishes the `.vsix` to the Marketplace using `@vscode/vsce publish` and `VSCE_PAT`.

### Local: Package and publish from your machine

Prerequisites:

- Node.js matching `.nvmrc` (v24 at time of writing)
- A VS Code Marketplace PAT for the `BlockceptionLtd` publisher set as env var `VSCE_PAT`

Commands (PowerShell):

```powershell
# Install deps at repo root
npm ci

# Build all workspaces (or build just the VSCode package)
npm run compile

# Package the extension (outputs ide/vscode/vscode-extension.vsix)
pushd ide/vscode
npx vsce package --no-dependencies --no-git-tag-version --out vscode-extension.vsix

# Publish to the Marketplace
npx @vscode/vsce publish --packagePath ./vscode-extension.vsix
popd
```

Tip: You can also install the `.vsix` locally in VS Code for sanity checks before publishing.

## Releasing npm packages

Packages are published independently. The GitHub Action `.github/workflows/release-npm-packages.yaml` can publish the following matrix:

- `bedrock-commands`
- `bedrock-diagnoser`
- `bedrock-project`
- `bedrock-types`
- `bedrock-vanilla-data`
- `molang`
- `packages/project` (directory maps to `bc-minecraft-project`)

### CI: Release via GitHub Actions

- Trigger “Release NPM Packages” from the Actions tab (manual) or call it from another workflow.
- What it does for each package in the matrix:
	1. `npm ci` at the repo root
	2. `npm run compile` in the package folder
	3. `npm run test`
	4. `npm publish`

Auth note: Ensure npm auth is available in the workflow runner (e.g., set a repository/organization secret `NODE_AUTH_TOKEN` and configure npm to use it, or use an `.npmrc` with a token). The provided workflow currently calls `npm publish` directly; add an auth step if required for your registry.

### Local: Release from your machine

Prerequisites:

- You must be logged in to npm with permission to the `bc-*` packages (`npm whoami` should work)
- Node per `.nvmrc`

Per package (example for `packages/molang`):

```powershell
pushd packages/molang

# Optional: bump version (SemVer or your package’s scheme)
npm version patch

# Build and test
npm run compile
npm test

# Publish
npm publish

popd
```

Notes:

- Many packages enforce tests on publish via `prepublishOnly` (see each `package.json`).
- Versioning is independent per package. Some use a Minecraft-aligned scheme like `1.21.114-0`; follow the existing pattern for that package.

## Release pipeline (GitHub Release ➜ artifacts + Marketplace)

Workflow: `.github/workflows/release-pipeline.yaml`

- Trigger: when a GitHub Release is published (`on: release: types: released`).
- Jobs:
	- Calls the IDE release workflow to build and publish the VS Code extension.
	- Downloads all artifacts produced by prerequisite jobs (e.g., the `.vsix`).
	- Uploads those artifacts to the GitHub Release assets (keeps the release page in sync with what was published).

## Versioning and labels

- Prefer Semantic Versioning for libraries unless a package explicitly uses a game-aligned scheme.
- Use PR labels to signal the intended bump in Release Drafter:
	- `major`, `minor`, `patch` — influences the next drafted version
	- Functional labels (feature, fix, documentation) improve the generated changelog sections.

## Quick checklists

VS Code extension:

- [ ] Tests are green and the extension builds
- [ ] Marketplace PAT (`VSCODE_KEY` / `VSCE_PAT`) is set in the environment you use
- [ ] Run the “Release IDE” workflow, or package and publish locally

npm packages:

- [ ] Bump the version in the package you intend to release
- [ ] `npm run compile` and `npm test` succeed
- [ ] npm auth is configured (`npm whoami` works)
- [ ] Publish via the Action or locally with `npm publish`

GitHub Release:

- [ ] Confirm the drafted notes look good (labels are categorized correctly)
- [ ] Publish the draft as a release to trigger the pipeline
- [ ] Verify Marketplace and Release assets

## Troubleshooting

- VS Code publish fails with 401: the `VSCODE_KEY`/`VSCE_PAT` token is missing, expired, or doesn’t have rights to publisher `BlockceptionLtd`.
- npm publish fails with auth error: ensure your local `npm login` is valid or configure `NODE_AUTH_TOKEN` in CI and an npmrc that uses it.
- Wrong version in draft release: adjust labels on the merged PRs or manually edit the release title before publishing.

