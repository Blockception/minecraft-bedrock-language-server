# Blockception Minecraft Bedrock Vanilla Data

<p align="center">
	<a href="https://www.npmjs.com/package/bc-minecraft-bedrock-vanilla-data">
		<img alt="npm" src="https://img.shields.io/npm/v/bc-minecraft-bedrock-vanilla-data">
		<img alt="npm" src="https://img.shields.io/npm/dt/bc-minecraft-bedrock-vanilla-data">
	</a>
</p>

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
