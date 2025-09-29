# BC-Minecraft-Bedrock-Commands

<p align="center">
	<a href="https://www.npmjs.com/package/bc-minecraft-bedrock-command">
		<img alt="npm" src="https://img.shields.io/npm/v/bc-minecraft-bedrock-command">
		<img alt="npm" src="https://img.shields.io/npm/dt/bc-minecraft-bedrock-command">
	</a>
</p>

A typescript package library that handles commands for minecraft bedrock

```ts
const text = 'execute @a ~ ~ ~ scoreboard players set @e[type=minecraft:sheep,r=3] range 1';
const command = Command.parse(text);
```

## Contributing

First, read the [contributing guide](./CONTRIBUTING.md). fork the project, clone it and run the following commands:

**Installation**

```cmd
  npm ci
  npm update
```
