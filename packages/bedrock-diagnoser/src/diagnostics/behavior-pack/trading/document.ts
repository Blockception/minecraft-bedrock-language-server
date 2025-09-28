import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json/json";
import { minecraft_get_item } from "../../minecraft/items";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { behaviorpack_item_diagnose } from "../item/diagnose";
import { behaviorpack_loot_table_function_diagnose, LootFunction } from "../loot-table/functions";

/**Diagnoses the given document as an trading table
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_trading_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const table = Json.LoadReport<TradeTable>(diagnoser);
  if (typeof table !== "object") return;
  diagnose_molang_syntax_current_document(diagnoser, table);

  //Foreach tier
  table.tiers?.forEach((tier) => {
    //Foreach group in tier
    tier.groups?.forEach((group) => {
      //Foreach trade in group
      group.trades?.forEach((trade) => {
        //Foreach gives in group
        trade.gives?.forEach((item) => diagnose_item(item, diagnoser));
        //Foreach want in group
        trade.wants?.forEach((item) => diagnose_item(item, diagnoser));
      });
    });
  });
}

function diagnose_item(entry: TradeGive, diagnoser: DocumentDiagnosticsBuilder): void {
  //Is item then check if item exists
  if (entry.item) behaviorpack_item_diagnose(minecraft_get_item(entry.item, diagnoser.document), diagnoser);

  entry.functions?.forEach((fn) => behaviorpack_loot_table_function_diagnose(fn, diagnoser));
}

interface TradeTable {
  tiers?: TradeTier[];
}

interface TradeTier {
  total_exp_required?: number;
  groups?: TradeGroup[];
}

interface TradeGroup {
  num_to_select?: number;
  trades?: TradeTrades[];
}

interface TradeTrades {
  trader_exp?: number;
  max_uses?: number;
  reward_exp?: number;
  wants?: TradeWant[];
  gives?: TradeGive[];
}

interface TradeWant {
  item?: string;
  quantity?: number;
}

interface TradeGive {
  item?: string;
  quantity?: number;
  functions?: LootFunction[];
}
