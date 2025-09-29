import { Types } from 'bc-minecraft-bedrock-types';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Errors } from '../..';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { check_definition_value, education_enabled } from '../../definitions';
import { behaviorpack_entityid_diagnose } from '../entity';

interface Item extends Types.OffsetWord {
  data?: number;
}

export function behaviorpack_item_diagnose(value: Item | string, diagnoser: DiagnosticsBuilder): boolean {
  const { namespace, id } = ItemDefinition.parse(typeof value == 'string' ? value : value.text);

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.item, `${namespace}:${id}`, diagnoser)) return true;

  //If it is an spawn egg, treat it as an entity
  if (id.endsWith('_spawn_egg')) {
    const item = id.slice(0, id.length - 10);
    const entity = { offset: typeof value == 'string' ? 0 : value.offset, text: `${namespace}:${item}` };
    return behaviorpack_entityid_diagnose(entity, diagnoser);
  }

  if (hasAny(`${namespace}:${id}`, diagnoser)) {
    if (typeof value == 'string') return true;
    else return checkData(value, diagnoser);
  }

  if (namespace === 'minecraft') {
    if (hasAny(`${namespace}:${id}`, diagnoser)) {
      if (typeof value == 'string') return true;
      else return checkData(value, diagnoser);
    }
  }

  //Nothing then report error
  Errors.missing('behaviors', 'items', `${namespace}:${id}`, diagnoser, value);
  return false;
}

function hasAny(id: string, diagnoser: DiagnosticsBuilder): boolean {
  const data = diagnoser.context.getProjectData().projectData;

  if (check_definition_value(diagnoser.project.definitions.item, id, diagnoser)) return true;
  if (check_definition_value(diagnoser.project.definitions.block, id, diagnoser)) return true;

  //Project has item Or blocks
  if (data.hasItem(id)) return true;
  if (data.hasBlock(id)) return true;

  const edu = education_enabled(diagnoser);

  //Vanilla has item
  if (MinecraftData.BehaviorPack.hasItem(id, edu)) return true;
  if (MinecraftData.BehaviorPack.hasBlock(id, edu)) return true;

  return false;
}

function checkData(value: Item, diagnoser: DiagnosticsBuilder): boolean {
  const edu = education_enabled(diagnoser);

  const item = MinecraftData.BehaviorPack.getItem(value.text, edu);
  if (item && typeof value.data === 'number') {
    if (value.data <= item.max_damage) {
      diagnoser.add(
        value,
        `Item data is for ${value.text} is 0..${item.max_damage}`,
        DiagnosticSeverity.error,
        'behaviorpack.item.data',
      );
    }
  }

  return true;
}

export interface ItemDefinition {
  namespace: string;
  id: string;
  variant: string;
}

export namespace ItemDefinition {
  /**
   * Parses item ids into their subcomponents that follow syntax like:
   * - `<namespace>:<id>:[variant]`
   * - `<id>:[variant]`
   * @param id
   */
  export function parse(id: string): ItemDefinition {
    const parts = id.split(':');

    if (parts.length === 3) {
      return {
        namespace: parts[0],
        id: parts[1],
        variant: parts[2],
      };
    }

    if (parts.length === 1) {
      return {
        namespace: 'minecraft',
        id: parts[0],
        variant: '',
      };
    }

    const [first, second] = parts;
    if (first === 'minecraft') {
      return {
        namespace: first,
        id: second,
        variant: '',
      };
    }

    if (!Number.isNaN(parseInt(second)))
      return {
        namespace: 'minecraft',
        id: first,
        variant: second,
      };

    return {
      namespace: first,
      id: second,
      variant: '',
    };
  }
}
