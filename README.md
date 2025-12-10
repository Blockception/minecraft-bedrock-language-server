# Minecraft Bedrock Language Server Monorepo

[![📋 Test All](https://github.com/Blockception/minecraft-bedrock-language-server/actions/workflows/npm-ci.yml/badge.svg)](https://github.com/Blockception/minecraft-bedrock-language-server/actions/workflows/npm-ci.yml)

Welcome to the Blockception Minecraft Bedrock Language Server monorepo! This repository contains all core packages, tools, and extensions for Minecraft Bedrock Edition development, including the language server, diagnostics, project helpers, and more.

## Table of Contents

- [About](#about)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [Code Style & Linting](#code-style--linting)
- [Testing](#testing)
- [Documentation](#documentation)
- [FAQ](#faq)
- [License](#license)

---

## About

This monorepo is the home for all Blockception Minecraft Bedrock development tools, including:

- **Language Server**: Provides rich language features for Bedrock scripting and project files.
- **Diagnostics**: Advanced error checking and validation for Bedrock projects.
- **Project Utilities**: Helpers for managing, building, and validating Bedrock projects.
- **VSCode Extensions**: Editor integration for a seamless development experience.

Our goal is to provide a unified, modern, and extensible toolkit for Minecraft Bedrock creators.

---

## Monorepo Structure

The repository is organized as a monorepo, containing multiple packages and tools:

```
/
├── packages/                # Core packages (commands, diagnoser, types, etc.)
├── ide/                     # Editor integrations (VSCode, shared, base)
├── documentation/           # Guides, API docs, and tutorials
├── resources/               # Assets and shared resources
├── coverage/                # Test coverage reports
├── ...                      # Root configs, scripts, and meta files
```

Each package or tool is self-contained with its own `package.json`, source code, and tests.

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v8+)
- **Git**

### 1. Clone the Repository

```sh
git clone https://github.com/Blockception/minecraft-bedrock-language-server.git
cd minecraft-bedrock-language-server
```

### 2. Install Dependencies

Install all dependencies for every package:

```sh
npm install
```

### 3. Build the Monorepo

Compile all TypeScript packages:

```sh
npm run build
```

### 4. (Optional) Run Tests

To verify everything is working:

```sh
npm test
```

---

## Development Workflow

- **All packages** are managed together. Use root-level npm scripts to build, lint, and test all packages.
- **Individual packages** can be developed and tested in isolation (see their respective `README.md` for details).
- **VSCode extension**: Develop and debug from `ide/vscode`.

### Useful Commands

- `npm run build` – Build all packages
- `npm run lint` – Lint all code
- `npm test` – Run all tests
- `npm run clean` – Clean build artifacts
- `npm run changeset` – Create a changeset for version management (see [CONTRIBUTING.md](CONTRIBUTING.md))

---

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting issues or pull requests.

### How to Contribute

1. Fork the repo and create your branch from `main`.
2. Make your changes, following the code style and commit guidelines.
3. Add or update tests as needed.
4. Run `npm run lint` and `npm test` to ensure code quality.
5. **Create a changeset** if your changes affect package versions (see [CONTRIBUTING.md](CONTRIBUTING.md) for details).
6. Submit a pull request with a clear description.

---

## Code Style & Linting

- We use **ESLint** for code quality and style.
- Run `npm run lint` before committing.
- Follow the [Style Guide](documentation/Style%20Guide.md) for consistency.

---

## Testing

- Each package contains its own tests (see `/test` folders).
- Run all tests with `npm test`.
- Coverage reports are generated in `/coverage`.

---

## Documentation

- See the [documentation/](documentation/) folder for guides, API docs, and tutorials.
- Key docs:
  - [Commands](documentation/Commands.md)
  - [Debugging](documentation/Debugging.md)
  - [Json Validation](documentation/Json%20Validation.md)
  - [Style Guide](documentation/Style%20Guide.md)
  - [Completion](documentation/completion/Mcfunctions.md)
  - [Project Attributes](documentation/project/MCAttributes.md)

---

## FAQ

**Q: Can I use a single package outside the monorepo?**  
A: Yes! Each package is published independently and can be used standalone.

**Q: How do I add a new package?**  
A: Create a new folder in `packages/`, add a `package.json`, and follow the structure of existing packages.

**Q: Who maintains this project?**  
A: Blockception and the open-source community. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

This project is licensed under the [BSD 3-Clause License](LICENSE).

---

For any questions, suggestions, or support, please open an issue or join our community discussions!

# Contributors

Special thanks to these awesome people for helping out these projects 😄

**Minecraft Bedrock Language Server**  
<a href="https://github.com/Blockception/minecraft-bedrock-language-server/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Blockception/minecraft-bedrock-language-server" />
</a>  
**Vscode plugin**  
<a href="https://github.com/Blockception/VSCode-Bedrock-Development-Extension/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Blockception/VSCode-Bedrock-Development-Extension" />
</a>  
**Schemas**  
<a href="https://github.com/Blockception/Minecraft-bedrock-json-schemas/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Blockception/Minecraft-bedrock-json-schemas" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
