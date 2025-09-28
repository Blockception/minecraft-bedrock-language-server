# BC-Minecraft-Bedrock-Diagnoser

[![Npm Package & Publish](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/npm-publish.yml)
[![Npm Test](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/npm-test.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/npm-test.yml)
[![tagged-release](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/tagged-release.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Diagnoser/actions/workflows/tagged-release.yml)

A typescript package library that provides diagnostics for minecraft bedrock projects

```ts
const context: DiagnoserContext = {
  getDiagnoser: (doc: TextDocument, project: MCProject) => { ... },
  getDocument: (uri: string) => { ... },
  getFiles: (folder: string, ignores: MCIgnore) => { ... },
  cache: ProjectData
};

const diagnoser = new Diagnoser(context);

diagnoser.process(doc): boolean;
diagnoser.processFolder(folder, ignores): void;
diagnoser.processPack(pack): void;
```

## Contributing

First, read the [contributing guide](./CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```
