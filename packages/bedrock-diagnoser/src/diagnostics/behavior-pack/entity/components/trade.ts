import { DiagnosticsBuilder } from "../../../../types";
import { diagnose_trading_implementation } from "../../trading/diagnose";
import { Context } from "../../../../utility/components";

export function check_trade_table<T>(
  _name: string,
  component: any,
  _context: Context<T>,
  diagnoser: DiagnosticsBuilder
): void {
  if (component === undefined) return;
  if (typeof component.table !== "string") return;
  const table = component.table;

  diagnose_trading_implementation(table, diagnoser);
}
