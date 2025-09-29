import { Internal } from 'bc-minecraft-bedrock-project';
import { DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json';
import { behaviorpack_item_diagnose } from '../item/diagnose';
import { diagnose_molang_syntax_current_document } from '../../molang';

/**Diagnoses the given document as an item catalog
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_item_catalog_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const catalog = Json.LoadReport<Internal.BehaviorPack.ItemCatalog>(diagnoser);
  if (!Internal.BehaviorPack.ItemCatalog.is(catalog)) return;
  diagnose_molang_syntax_current_document(diagnoser, catalog);

  catalog['minecraft:crafting_items_catalog'].categories.forEach((category) => {
    category.groups.forEach((group) => {
      const icon = group.group_identifier?.icon;
      if (typeof icon == 'string') behaviorpack_item_diagnose(icon, diagnoser);

      group.items.forEach((entry) => {
        if (typeof entry == 'string') behaviorpack_item_diagnose(entry, diagnoser);
        else behaviorpack_item_diagnose(entry.name, diagnoser);
      });
    });
  });
}
