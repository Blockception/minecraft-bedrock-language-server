# Blockception Minecraft Bedrock Vanilla Data

[![Npm Test](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/npm-test.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/npm-test.yml)
[![Npm Package & Publish](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/npm-publish.yml)
[![Creating typescript includes](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/create-includes.yml/badge.svg)](https://github.com/Blockception/BC-Minecraft-Bedrock-Vanilla-Data/actions/workflows/create-includes.yml)  
![npm](https://img.shields.io/npm/v/bc-minecraft-bedrock-vanilla-data)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/bc-minecraft-bedrock-vanilla-data)

A Typescript library that provides vanilla minecraft bedrock data

```ts
const entity = MinecraftData.BehaviorPack.getEntity("minecraft:creeper");

MinecraftData.General.Effect.includes("speed");
MinecraftData.ResourcePack.getAnimation("...");

MinecraftData.vanilla.ResourcePack.animations.foreach(Animation=>...);
MinecraftData.edu.ResourcePack.animations.foreach(Animation=>...);
```

## Contributing

First, read the [contributing guide](./CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```
