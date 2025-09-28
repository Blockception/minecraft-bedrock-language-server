import { DiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
import { behaviorpack_loot_table_diagnose } from "../../loot-table/diagnose";

export function check_loot_table<T>(
  _name: string,
  component: any,
  _context: Context<T>,
  diagnoser: DiagnosticsBuilder
): void {
  if (component === undefined) return;
  if (typeof component.table !== "string") return;
  const table = component.table;

  behaviorpack_loot_table_diagnose(table, diagnoser);
}
