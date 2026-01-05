import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../../../constants';
import { IsEducationEnabled } from '../../../../../project/attributes';
import { Context } from '../../../../context/context';
import { JsonPathCompletion } from '../../../builder/json-path';
import { CompletionContext } from '../../../context';
import { createDefinitionDocGenerator } from '../../utils';

import * as Sounds from '../../resource-pack/sounds';
import * as AnimationControllers from '../animation-controllers';
import * as Animations from '../animations';
import * as Blocks from '../blocks';
import * as Families from '../families';
import * as Item from '../items';
import * as LootTables from '../loot-tables';
import * as Trading from '../trading';
import * as EntityComponentGroups from './component-groups';
import * as EntityEvents from './event';

export function provideCompletion(context: Context<CompletionContext>): void {
  const generateDoc = createDefinitionDocGenerator('The defined entity', 'The entity definition');
  const builder = context.builder.withDefaults({ kind: Kinds.Completion.Entity });
  const data = context.document.configuration();

  // Add entities from .mcdefinitions
  builder.generate(data.definitions.entity?.defined, generateDoc);

  builder.generate(context.database.ProjectData.behaviorPacks.entities, generateDoc);
  builder.generate(MinecraftData.vanilla.BehaviorPack.entities, generateDoc);

  //Education data
  if (IsEducationEnabled(context.document)) {
    builder.generate(MinecraftData.edu.BehaviorPack.entities, generateDoc);
  }
}

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return entityJsonCompletion.onCompletion(context);
}

const entityJsonCompletion = new JsonPathCompletion(
  {
    match: /throw_sound|hit_sound|spawn_sound$/,
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: 'minecraft:ambient_sound_interval/event_name',
    onCompletion: Sounds.provideCompletion,
  },
  {
    match: 'event',
    onCompletion: EntityEvents.provideCompletion,
  },
  {
    match: 'block/name',
    onCompletion: Blocks.provideCompletion,
  },
  {
    match: 'minecraft:loot/table',
    onCompletion: LootTables.provideCompletion,
  },
  {
    match: 'minecraft:trade_table/table',
    onCompletion: Trading.provideCompletion,
  },
  {
    match: /item|items|feed_items|spawn_item$/,
    onCompletion: Item.provideCompletion,
  },
  {
    match: 'family',
    onCompletion: Families.provideCompletion,
  },
  {
    match: (path) => path.includes('minecraft:entity/description/animations/'),
    onCompletion: (c) => {
      Animations.provideCompletion(c);
      AnimationControllers.provideCompletion(c);
    },
  },
  {
    match: /\/component_groups\/(\d+)$/,
    onCompletion: EntityComponentGroups.provideCompletion,
  },
  {
    match: /breeds_with\/(mate_type|baby_type)$/,
    onCompletion: provideCompletion,
  },
);
