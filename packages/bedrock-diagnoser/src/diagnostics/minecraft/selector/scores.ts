
import { Minecraft } from 'bc-minecraft-bedrock-types';
import { CompactJson } from 'bc-minecraft-bedrock-types/src/minecraft/json';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';
import { general_range_integer_diagnose } from '../../general/range';
import { minecraft_objectives_diagnose } from '../objective';

/**
 * Diagnoses the scores attribute from a selector
 * @param attr The attribute to diagnose
 * @param diagnoser The diagnoser to use
 */
export function selector_scores_diagnose(
  attr: CompactJson.IKeyNode,
  sel: Minecraft.Selector.Selector,
  diagnoser: DiagnosticsBuilder,
): boolean {
  let result = true;
  if (!CompactJson.isObject(attr)) {
    const type = CompactJson.Type[attr.type];

    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      `Expected a object, not a ${type}`,
      DiagnosticSeverity.error,
      'minecraft.selector.scores.type',
    );

    return false;
  }

  attr.value.forEach((item) => {
    result = minecraft_selector_scores_item_diagnose(item, diagnoser) && result;
  });

  return result;
}

/**
 * Diagnoses a single item from a selector scores attribute
 * @param attr The score attribute to diagnose
 * @param diagnoser The diagnoser to use
 */
function minecraft_selector_scores_item_diagnose(attr: CompactJson.IKeyNode, diagnoser: DiagnosticsBuilder): boolean {
  if (!CompactJson.isString(attr)) {
    const type = CompactJson.Type[attr.type];

    diagnoser.add(
      CompactJson.toOffsetWord(attr),
      `Expected a range / integer value, not a ${type}`,
      DiagnosticSeverity.error,
      'minecraft.selector.scores.item.type',
    );
    return false;
  }

  //Check objective references
  const result = minecraft_objectives_diagnose(OffsetWord.create(attr.key, attr.offset), diagnoser);

  //Check range value
  return general_range_integer_diagnose(CompactJson.valueToOffsetWord(attr), diagnoser) && result;
}
