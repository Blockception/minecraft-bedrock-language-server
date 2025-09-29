import { FileType } from 'bc-minecraft-bedrock-project/src/project/behavior-pack';
import { DocumentDiagnosticsBuilder } from '../../types/diagnostics-builder';

import * as AnimationController from './animation-controllers/document';
import * as Animation from './animation/document';
import * as Biome from './biome/document';
import * as Block from './block/document';
import * as Entity from './entity/document';
import * as FeatureRule from './feature-rule/document';
import * as Feature from './feature/document';
import * as Tick from './functions/tick/document';
import * as Item from './item/document';
import * as ItemCatalog from './item-catalog/document';
import * as LootTable from './loot-table/document';
import * as Manifest from './manifest/document';
import * as Mcfunction from './mcfunction/document';
import * as Recipe from './recipe/document';
import * as Script from './script/document';
import * as SpawnRule from './spawn-rule/document';
import * as Structure from './structure/document';
import * as Trading from './trading/document';

export namespace BehaviorPack {
  /**
   * Processes and diagnoses the given textdocument
   * @param doc The document to process / diagnose
   * @param diagnoser The diagnoser to report to
   * @returns `true` or `false` whenever or not it was successful*/
  export function diagnose_document(diagnoser: DocumentDiagnosticsBuilder): boolean {
    //retrieve filter doc type
    const uri = diagnoser.document.uri;
    const type = FileType.detect(uri);

    switch (type) {
      case FileType.animation:
        Animation.diagnose_animation_document(diagnoser);
        break;

      case FileType.animation_controller:
        AnimationController.diagnose_animation_controller_document(diagnoser);
        break;

      case FileType.block:
        Block.diagnose_block_document(diagnoser);
        break;

      case FileType.entity:
        Entity.diagnose_entity_document(diagnoser);
        break;

      case FileType.function:
        if (uri.endsWith('tick.json')) {
          Tick.diagnose_tick_document(diagnoser);
        } else {
          Mcfunction.diagnose_mcfunction_document(diagnoser);
        }
        break;

      case FileType.item:
        Item.diagnose_item_document(diagnoser);
        break;

      case FileType.loot_table:
        LootTable.diagnose_loot_table_document(diagnoser);
        break;

      case FileType.manifest:
        Manifest.diagnose_manifest(diagnoser);
        break;

      case FileType.script:
        Script.diagnose_script_document(diagnoser);
        break;

      case FileType.spawn_rule:
        SpawnRule.diagnose_spawn_rule_document(diagnoser);
        break;

      case FileType.structure:
        Structure.diagnose_structure_document(diagnoser);
        break;

      case FileType.trading:
        Trading.diagnose_trading_document(diagnoser);
        break;

      case FileType.feature:
        Feature.diagnose_feature_document(diagnoser);
        break;

      case FileType.feature_rule:
        FeatureRule.diagnose_feature_rules_document(diagnoser);
        break;

      case FileType.item_catalog:
        ItemCatalog.diagnose_item_catalog_document(diagnoser);
        break;

      case FileType.recipe:
        Recipe.diagnose_recipe_document(diagnoser);
        break;

      case FileType.biome:
        Biome.diagnose_biome_document(diagnoser);
        break;

      default:
      case FileType.unknown:
        return false;
    }

    return true;
  }
}
