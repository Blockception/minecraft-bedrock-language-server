import { Internal } from "bc-minecraft-bedrock-project";
import { EntityProperty } from "bc-minecraft-bedrock-project/src/project/behavior-pack/entity";
import { ComponentContainer, ComponentGroups } from "bc-minecraft-bedrock-types/src/minecraft/components";
import { DiagnosticSeverity, DiagnosticsBuilder, DocumentDiagnosticsBuilder } from "../../../types";
import { commandsCheck } from "../mcfunction";
import { behaviorpack_entity_components_filters } from "./components/filters";
import { diagnose_entity_property_usage } from "./properties";

type EntityEvent = Internal.BehaviorPack.EntityEvent;

export function behaviorpack_entity_check_events(
  events: Record<string, EntityEvent> | EntityEvent[],
  diagnoser: DocumentDiagnosticsBuilder,
  properties: EntityProperty[],
  component_groups?: ComponentGroups
) {
  if (Array.isArray(events)) {
    events.forEach((event) => behaviorpack_entity_check_event(event, "", diagnoser, properties, component_groups));
  } else {
    const eventIds = Object.keys(events);

    Object.entries(events).forEach(([key, event]) =>
      behaviorpack_entity_check_event(event, key, diagnoser, properties, component_groups, eventIds)
    );
  }
}

/**
 *
 * @param event
 * @param diagnoser
 * @param component_groups
 */
export function behaviorpack_entity_check_event(
  event: EntityEvent & { filters?: any },
  event_id: string,
  diagnoser: DocumentDiagnosticsBuilder,
  properties: EntityProperty[],
  component_groups?: ComponentGroups,
  eventIds?: string[]
): void {
  has_groups(
    diagnoser,
    event_id,
    typeof event.add?.component_groups == "string" ? [event.add?.component_groups] : event.add?.component_groups,
    component_groups
  );
  has_groups(
    diagnoser,
    event_id,
    typeof event.remove?.component_groups == "string"
      ? [event.remove?.component_groups]
      : event.remove?.component_groups,
    component_groups
  );

  event.randomize?.forEach((item) => {
    behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
  });

  if (event.randomize?.length == 1)
    diagnoser.add(
      `events/${event_id}/randomize`,
      "'randomize' only has one entry and can therefore be removed.",
      DiagnosticSeverity.info,
      "behaviorpack.entity.event.randomize.length"
    );

  event.sequence?.forEach((item) => {
    behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
  });

  if (event.sequence?.length == 1) {
    diagnoser.add(
      `events/${event_id}/sequence`,
      "'sequence' only has one entry and can therefore be removed.",
      DiagnosticSeverity.info,
      "behaviorpack.entity.event.sequence.length"
    );
  }

  (event as any).first_valid?.forEach((item: Internal.BehaviorPack.EntityEvent) => {
    behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
  });

  if ((event as any).first_valid?.length == 1)
    diagnoser.add(
      event_id,
      "'first_valid' only has one entry and can therefore be removed.",
      DiagnosticSeverity.info,
      "behaviorpack.entity.event.first_valid.length"
    );

  behaviorpack_entity_components_filters(event, diagnoser);

  if (event.set_property) {
    for (const [key, value] of Object.entries(event.set_property)) {
      diagnose_entity_property_usage(properties, key, value, "events", diagnoser);
    }
  }

  if ((event as any)["run_command"]) {
    diagnoser.add(
      `events/${event_id}`,
      `Event is using the deprecated run_command property, use queue_command instead`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.event.run_command"
    );
  }

  if ((event as any)["set_home_position"] && !diagnoser.document.getText().includes("minecraft:home")) {
    diagnoser.add(
      `events/${event_id}`,
      `To use set_home_position, \`minecraft:home\` is required.`,
      DiagnosticSeverity.error,
      "behaviorpack.entity.event.set_home_position"
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (event.trigger && !eventIds?.includes(typeof event.trigger == "string" ? event.trigger : event.trigger.event))
    diagnoser.add(
      `events/${event_id}/trigger`,
      `Event "${event.trigger}" being triggered not found`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.event.trigger"
    );

  if (event.queue_command) {
    const c = event.queue_command.command;
    const command = typeof c === "string" ? [c] : c;

    command.forEach((cmd) => {
      if (cmd.startsWith("/")) {
        diagnoser.add(
          `events/${event_id}/cmd`,
          `Commands in queue_command should not start with a /, remove it`,
          DiagnosticSeverity.warning,
          "behaviorpack.entity.event.queue_command"
        );

        cmd = cmd.slice(1);
      }

      commandsCheck(cmd, diagnoser);
    });
  }
}

function has_groups(
  diagnoser: DiagnosticsBuilder,
  id: string,
  groups?: string[],
  component_groups?: ComponentGroups
): void {
  if (groups === undefined) return;
  component_groups = component_groups ?? {};

  for (let I = 0; I < groups.length; I++) {
    const group = groups[I];
    if (group in component_groups) continue;

    diagnoser.add(
      `events/${id}/${group}`,
      `Event is calling component group: ${group}, but the component group was not found`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.component_group.missing"
    );
  }
}
