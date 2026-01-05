# MCDefinitions

This file specifies anything that is included in the project, but cannot be found in the project files itself, or not easly. At the same time the user can also blacklist definition
through this same project.

**Example**

```ini
## I am a comment

## Tags used in the map
tag=initialized
tag=calculating
tag=enemy
tag=monster

## Tags to be excluded
tag=!Monster

## Objectives used in the map
objective=var
objective=coin
objective=foo

## Objectives excluded
objective=!Var
objective=!Coin

## Families
family=npc

## Families excluded
family=!Npc

## Entity names
name=Steve

## Entity names excluded
name=!steve

## Custom entities (for behavior/resource pack)
entity=my_namespace:custom_mob
entity=my_namespace:custom_npc

## Custom blocks
block=my_namespace:custom_block

## Custom items
item=my_namespace:custom_item

## Custom animations
animation=animation.custom.walk
animation=animation.custom.attack

## Custom animation controllers
animation_controller=controller.animation.custom_mob

## Custom loot tables
loot_table=loot_tables/custom_chest

## Custom sounds
sound=custom.sound.ambient

## Custom particles
particle=my_namespace:custom_particle

## Custom textures
texture=textures/custom/texture

## Custom models
model=geometry.custom_model

## Custom fogs
fog=my_namespace:custom_fog

## Custom materials
material=custom_material
```

## Properties

This plugin looks and processes the following definitions

| name                  | description                                         |
| --------------------- | --------------------------------------------------- |
| tag                   | Entity tags for selector and command completion    |
| objective             | Scoreboard objectives for command completion       |
| name                  | Entity names for selector completion               |
| family                | Entity families for selector and component completion |
| entity                | Entity IDs for behavior/resource pack completion   |
| block                 | Block IDs for behavior pack completion             |
| item                  | Item IDs for behavior pack completion              |
| animation             | Animation IDs for behavior/resource pack completion |
| animation_controller  | Animation controller IDs for behavior/resource pack completion |
| loot_table            | Loot table paths for behavior pack completion      |
| sound                 | Sound event names for resource pack completion     |
| particle              | Particle IDs for resource pack completion          |
| texture               | Texture paths for resource pack completion         |
| model                 | Geometry model IDs for resource pack completion    |
| fog                   | Fog IDs for resource pack completion               |
| material              | Material names for resource pack completion        |
