import { Command, ParameterType } from 'bc-minecraft-bedrock-command';
import { Defined, DefinitionItem } from 'bc-minecraft-bedrock-project';

import { Errors } from '../..';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { check_definition_value, education_enabled } from '../../definitions';

/**
 * Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id The entity to check
 * @param diagnoser The diagnoser
 * @returns True if the entity exists
 */
export function behaviorpack_entityid_diagnose(id: OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean {
  let strId = typeof id === 'string' ? id : id.text;
  let event = '';
  if (strId.includes('<')) {
    event = strId.replace(strId.split('<')[0], '').slice(1, -1);
    strId = strId.split('<')[0];
  }

  //No namespace?
  if (!strId.includes(':')) strId = 'minecraft:' + strId;

  //Defined in McProject
  if (check_definition_value(diagnoser.project.definitions.entity, strId, diagnoser)) {
    return true;
  }

  const entityItem = diagnoser.context.getProjectData().behaviors.entities.get(strId, diagnoser.project);
  if (entityItem === undefined) {
    Errors.missing('behaviors', 'entities', strId, diagnoser, id);
    return false;
  }
  if (DefinitionItem.is(entityItem)) {
    return true;
  }
  const entity = entityItem.item;

  //Project has entity
  if (event) {
    behaviorpack_entity_event_diagnose(event, `${strId}<${event}>`, entity.events, diagnoser);
  }

  return true;
}

/**Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export function behaviorpack_entity_spawnegg_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  const id = value.text.replace('_spawn_egg', '');

  behaviorpack_entityid_diagnose({ offset: value.offset, text: id }, diagnoser);
}

export function behaviorpack_entity_event_diagnose(
  id: string,
  path: string,
  events: Defined | string[] | undefined,
  diagnoser: DiagnosticsBuilder,
) {
  if (!events) return;

  if (Defined.is(events)) {
    if (events.defined.has(id)) return;
  } else if (events.includes(id)) {
    return;
  }

  diagnoser.add(path, `Entity has no event "${id}"`, DiagnosticSeverity.warning, 'behaviorpack.entity.event.missing');
}

/**Checks if the event is defined on the correct entities
 * @param data
 * @param builder
 * @param Com
 */
export function command_entity_event_diagnose(
  data: OffsetWord,
  diagnoser: DiagnosticsBuilder,
  Com: Command,
): void {
  const edu = education_enabled(diagnoser);
  const matches = Com.getBestMatch(edu);

  if (matches.length !== 1) return;

  const entityid_index = matches[0].parameters.findIndex((p) => p.type === ParameterType.entity);
  let entityid: string | undefined = undefined;

  if (entityid_index >= 0) {
    entityid = Com.parameters[entityid_index]?.text;
  } else {
    //TODO selector parsing?
  }

  if (entityid) {
    //Get entity
    const entity = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(entityid);

    //Entity found
    if (entity) {
      //Events not found
      if (!entity.events.defined.has(data.text)) {
        diagnoser.add(
          data.offset,
          `Entity: ${entityid} has no event declared: ${data.text}`,
          DiagnosticSeverity.error,
          'behaviorpack.entity.event.missing',
        );
      }
    }
  }
}
