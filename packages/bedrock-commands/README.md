# BC-Minecraft-Bedrock-Commands

[![Npm Package & Publish](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/npm-publish.yml)
[![Npm Test](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/npm-test.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/npm-test.yml)
[![tagged-release](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/tagged-release.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Command/actions/workflows/tagged-release.yml)
![npm](https://img.shields.io/npm/v/bc-minecraft-bedrock-command)

A typescript package library that handles commands for minecraft bedrock

```ts
const text = "execute @a ~ ~ ~ scoreboard players set @e[type=minecraft:sheep,r=3] range 1";
const command = Command.parse(text);
```


## Contributing

First, read the [contributing guide](./CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```