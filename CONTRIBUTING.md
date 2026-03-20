# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Creating an issue for a feature request is also acceptable. For smaller fixes, additions, or changes a simple fork and pull request is sufficient.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md); please follow it in all your interactions with the project.

## Branching and Pull Requests

1. Fork the repository and create a new branch from `main` with a descriptive name (e.g. `feat/block-validation` or `fix/typo-in-readme`).
2. Make your changes, following the [Style Guide](documentation/Style%20Guide.md).
3. Add or update tests for any code you change (see the [Testing](#testing) section below).
4. Run `npm run lint` and `npm test` to confirm everything passes before opening a PR.
5. Submit a pull request against `main` with a clear title and description. Reference any related issues.

## Testing

- Tests live in the `test/` folder of each package and mirror the `src/` structure.
- Run all tests from the repo root with `npm test`.
- When adding tests that call functions expecting a `DocumentDiagnosticsBuilder`, use `TestDiagnoser.createDocument` rather than `TestDiagnoser.create`.

## Contributing Features

Looking to add diagnostics, autocompletions, or custom type definitions? See the [Contributing Features Guide](documentation/guides/contributing-features.md) for a step-by-step workflow covering setup, implementation, testing, and submitting a pull request.
