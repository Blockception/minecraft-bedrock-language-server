# BC-Minecraft-Bedrock-Diagnoser

<p align="center">
	<a href="https://www.npmjs.com/package/bc-minecraft-bedrock-diagnoser">
		<img alt="npm" src="https://img.shields.io/npm/v/bc-minecraft-bedrock-diagnoser">
		<img alt="npm" src="https://img.shields.io/npm/dt/bc-minecraft-bedrock-diagnoser">
	</a>
</p>

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

First, read the [contributing guide](../../CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```

## Adding New Diagnostics

For detailed instructions on how to create new diagnostic error codes, see the [Creating Diagnostics Guide](../../documentation/guides/creating-diagnostics.md).
