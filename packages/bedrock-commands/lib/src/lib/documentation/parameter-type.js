"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterTypeDocumentation = void 0;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const parameter_type_1 = require("../types/parameter-type");
exports.ParameterTypeDocumentation = {
    [parameter_type_1.ParameterType.animation]: `## Animation
An animation is a set of key frames or mathematical expressions that can be used to animate a model. or execute commands in behaviour packs`,
    [parameter_type_1.ParameterType.block]: `## Block
A block is a single block in the world. It can be placed, removed, and changed.`,
    [parameter_type_1.ParameterType.blockStates]: `## Block States
Block states are a way to change the appearance of a block. They are used to change the color of a wool block, the direction a door is facing, or the type of a bed.

**Format**
Block states are specified in the following format:
\`\`\`json
[property=value]
\`\`\``,
    [parameter_type_1.ParameterType.boolean]: `## Boolean
A boolean is a value that can be either \`true\` or \`false\`.`,
    [parameter_type_1.ParameterType.causeType]: `## Cause Type
A cause type is a way to specify what kind of damage this entity is taking.
${sumMode(bc_minecraft_bedrock_types_1.Modes.CauseType)}`,
    [parameter_type_1.ParameterType.cameraShakeType]: `## Camera Shake Type
A camera shake type is a way to specify what kind of camera shake this entity is taking.
${sumMode(bc_minecraft_bedrock_types_1.Modes.CameraShake)}`,
    [parameter_type_1.ParameterType.cloneMode]: `## Clone Mode
A clone mode is a way to specify how the clone command should clone the blocks.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Clone)}`,
    [parameter_type_1.ParameterType.command]: `## Commands
A command is a way to execute.`,
    [parameter_type_1.ParameterType.coordinate]: `## Coordinate
A coordinate is a way to specify a location in the world. It can be a relative, absolute, or local coordinate.

**Format**
Coordinates are specified in the following format:
- \`2.5\` - Absolute coordinate
- \`~2.5\` - Relative coordinate
- \`^2.5\` - Local coordinate

### Absolute Coordinate
An absolute coordinate is a coordinate that is specified from the world origin.

### Relative Coordinate
A relative coordinate is a coordinate that is relative to the current position of the entity executing the command. but still moves along the world axis.

### Local Coordinate
A local coordinate is a coordinate that is relative to the current position of the entity executing the command. but moves along the local axis of the entity. (or view point)`,
    [parameter_type_1.ParameterType.difficulty]: `## Difficulty
A value representing the difficulty of the game.`,
    [parameter_type_1.ParameterType.dimension]: `## Dimension
A value representing the dimension of the game.`,
    [parameter_type_1.ParameterType.effect]: `## Effect
A value representing a potion effect.`,
    [parameter_type_1.ParameterType.entity]: `## Entity
The identifier of an entity.`,
    [parameter_type_1.ParameterType.executeSubcommand]: `## Execute Subcommand
The next statement to check or use in the execute command.`,
    [parameter_type_1.ParameterType.event]: `## Event
A value representing an world event.`,
    [parameter_type_1.ParameterType.fillMode]: `## Fill Mode
What kind of fill mode should be used.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Fill)}`,
    [parameter_type_1.ParameterType.function]: `## Function
The path to a function to run.

**Format**
\`\`\`mcfunction
function <path/to/function/file>
function "<path/to/function/file>"
\`\`\``,
    [parameter_type_1.ParameterType.float]: `## Float
A float is a number with a decimal point.`,
    [parameter_type_1.ParameterType.gamemode]: `## Gamemode
A value representing the gamemode of a player.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Gamemode)}`,
    [parameter_type_1.ParameterType.handType]: `## Hand Type
A value representing the different hand locations of a player.
${sumMode(bc_minecraft_bedrock_types_1.Modes.HandType)}`,
    [parameter_type_1.ParameterType.integer]: `## Integer
An integer is a whole number. no decimal point.`,
    [parameter_type_1.ParameterType.integer_range]: `## Integer Range
An integer range is a syntax to specify a range of integers.

**Format**
\`\`\`mcfunction
<min>..<max>
<min>..
..<max>
\`\`\`

With this syntax you can specify a range of integers. The first number is the minimum value, the second number is the maximum value. 
If you only specify one number, then that number is the minimum value and the maximum value is unlimited.`,
    [parameter_type_1.ParameterType.item]: `## Item
The identifier of an item.`,
    [parameter_type_1.ParameterType.jsonItem]: `## Json Item Components
A json item component is a way to specify the components of an item.`,
    [parameter_type_1.ParameterType.jsonRawText]: `## Raw Text
A raw text is a way to specify the text of a text component.`,
    //[ParameterType.keyword]:``,
    [parameter_type_1.ParameterType.lootTable]: `## Loot Table
The identifier of a loot table.`,
    [parameter_type_1.ParameterType.jigsaw]: `## Jigsaw
The path to a jigsaw pool.`,
    [parameter_type_1.ParameterType.locateFeature]: `## Locate Feature
A value representing the different world features.\
${sumMode(bc_minecraft_bedrock_types_1.Modes.LocateFeature)}`,
    [parameter_type_1.ParameterType.message]: `## Message
A message is a just a bunch of text.`,
    [parameter_type_1.ParameterType.maskMode]: `## Mask Mode
A value representing the different mask modes for the clone command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Mask)}`,
    [parameter_type_1.ParameterType.mirror]: `## Mirror Mode
A value representing the different mirror modes for the clone command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Mirror)}`,
    [parameter_type_1.ParameterType.musicRepeatMode]: `## Music Repeat Mode
A value representing the different music repeat modes for the music command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.MusicRepeat)}`,
    [parameter_type_1.ParameterType.objective]: `## Objective
The identifier of an objective.`,
    [parameter_type_1.ParameterType.oldBlockMode]: `## Old Block Mode
A value representing the different old block modes for the clone command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.OldBlock)}`,
    [parameter_type_1.ParameterType.operation]: `## Operation
A mathematical operation.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Operation)}`,
    [parameter_type_1.ParameterType.particle]: `## Particle
The identifier of a particle.`,
    [parameter_type_1.ParameterType.replaceMode]: `## Replace Mode
A value representing the different replace modes for the clone command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Replace)}`,
    [parameter_type_1.ParameterType.rideRules]: `## Ride Rules
A value representing the different ride rules for the ride command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.RideRules)}`,
    [parameter_type_1.ParameterType.ridefillMode]: `## Ride Fill Mode
A value representing the different ride fill modes for the ride command.
${sumMode(bc_minecraft_bedrock_types_1.Modes.RideFill)}`,
    [parameter_type_1.ParameterType.rotation]: `## Rotation
A value representing the rotation of an structure.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Rotation)}`,
    [parameter_type_1.ParameterType.saveMode]: `## Save Mode
A value representing the different save modes.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Save)}`,
    [parameter_type_1.ParameterType.scanMode]: `## Scan Mode
A value representing the different scan modes.
${sumMode(bc_minecraft_bedrock_types_1.Modes.Scan)}`,
    [parameter_type_1.ParameterType.selector]: `## Selector
A selector is a way to specify a group of entities.

Either starts with \`@\` or a string of a fake player.`,
    [parameter_type_1.ParameterType.slotType]: `## Slot Type
A value representing the different slot types.
${sumMode(bc_minecraft_bedrock_types_1.Modes.SlotType)}`,
    [parameter_type_1.ParameterType.slotID]: `## Slot ID
A value that helps to specify a slot.`,
    [parameter_type_1.ParameterType.sound]: `## Sound
The identifier of a sound.`,
    [parameter_type_1.ParameterType.string]: `## String
A string is a text. It needs surrounded by \`"\` or \`'\` if spaces are used.`,
    [parameter_type_1.ParameterType.structure]: `## Structure
The identifier of a structure.`,
    [parameter_type_1.ParameterType.structureAnimationMode]: `## Structure Animation Mode
A value representing the different structure animation modes.
${sumMode(bc_minecraft_bedrock_types_1.Modes.StructureAnimation)}`,
    [parameter_type_1.ParameterType.tag]: `## Tag
The identifier of a tag.`,
    [parameter_type_1.ParameterType.teleportRules]: `## Teleport Rules
A value representing the different teleport rules.
${sumMode(bc_minecraft_bedrock_types_1.Modes.TeleportRules)}`,
    [parameter_type_1.ParameterType.tickingarea]: `## Ticking Area
The identifier of a ticking area.`,
    [parameter_type_1.ParameterType.time]: `## Time
A value representing the time of the game.`,
    [parameter_type_1.ParameterType.timeInTicks]: `## Time in ticks
A value representing the time of the game (20D, 3S, 15T, 4).`,
    //[ParameterType.unknown]:``,
    [parameter_type_1.ParameterType.xp]: `## XP
  XP is a way to track the progress of a player. 
  It is used to unlock new features and abilities in the game. XP is gained by various actions.
  XP can also be used as a progress bar / currency in custom commands.
  
  ### Format
  XP can be specified in two ways:
  - Levels: \`1L\`
  - Points: \`1000\`
  
  Where \`1L\` is 1 level and \`1000\` is 1000 points.`,
};
function sumMode(mode) {
    return mode.modes
        .slice(0, 20)
        .map((m) => ` - \`${m.name}\``)
        .join("\r\n");
}
//# sourceMappingURL=parameter-type.js.map