import { DiagnosticsBuilder } from "../../../types";
import { behaviorpack_entityid_diagnose } from "../entity/diagnose";

/**
 *
 */
export interface LootFunction {
  /** */
  function?: string;
}

/**
 *
 * @param value
 * @param diagnoser
 */
export function behaviorpack_loot_table_function_diagnose(value: LootFunction, diagnoser: DiagnosticsBuilder): void {
  switch (value.function) {
    case "set_actor_id":
      const entityid = (<{ id?: string }>value).id;
      if (typeof entityid === "string") behaviorpack_entityid_diagnose(entityid, diagnoser);
      break;
  }
}
