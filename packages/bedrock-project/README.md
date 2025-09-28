# Blockception Minecraft Bedrock Project

[![Npm Package & Publish](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-publish.yml)
[![npm-unit-test](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-test.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/npm-test.yml)
[![tagged-release](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/tagged-release.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Project/actions/workflows/tagged-release.yml)  
![npm](https://img.shields.io/npm/v/bc-minecraft-project)

A project that deals with caching, summarizing Minecraft bedrock data

```ts
const context: ProjectContext = {
  getDocument: (uri: string) => { ... },
  getFiles: (folder: string, ignores: MCIgnore) => { ... },
};

const Data = new ProjectData(context);

const ProjectFolder = "c:\\project\\";
const manifests = ["c:\\project\\bp\\manifest.json", "c:\\project\\rp\\manifest.json", "c:\\project\\world\\manifest.json"];

const packs = Data.addPack(manifests, ProjectFolder);

//process documents into the pacts
Data.process(...);
//OR
packs[0].process(...)
```

## Contributing

First, read the [contributing guide](./CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```
