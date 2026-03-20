# Debugging

This guide explains how to build and run the extension locally for development and debugging.

## Prerequisites

Before you can build or debug the extension, install the required dependencies:

```sh
npm install -g vsce
npm install
```

## Building

Compile all packages and the extension with:

```sh
npm run compile
```

## Running the Extension Locally

1. Open the repository in VSCode.
2. Switch to the **Run and Debug** panel (`Ctrl+Shift+D` / `Cmd+Shift+D`).
3. Ensure the extension has been built (see [Building](#building) above).
4. Select the **`Client + Server (vscode-plugin)`** launch configuration from the dropdown.
5. Press **Play** (or `F5`) to launch a new Extension Development Host window.

The new window runs with only this extension active. You can open any Minecraft Bedrock workspace there to test your changes. If you modify code, rebuild and restart the debug session to pick up the changes.

> **Note:** You may need to restart the debug session after switching workspaces for all features to initialize correctly.
