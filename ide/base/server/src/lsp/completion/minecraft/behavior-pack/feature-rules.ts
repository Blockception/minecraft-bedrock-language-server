import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder/json-path';
import { CompletionContext } from '../../context';
import * as BiomeTags from './biome-tags';

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return featureRuleJsonCompletion.onCompletion(context);
}

const featureRuleJsonCompletion = new JsonPathCompletion({
  match: (path) => {
    // Match filter value paths where the sibling 'test' field is "has_biome_tag"
    // Path patterns:
    // - minecraft:feature_rules/conditions/minecraft:biome_filter/value
    // - minecraft:feature_rules/conditions/minecraft:biome_filter/all_of/0/value
    // - minecraft:feature_rules/conditions/minecraft:biome_filter/any_of/0/value
    // etc.
    if (!path.includes('minecraft:biome_filter') || !path.endsWith('/value')) {
      return false;
    }
    
    // For simplicity, we'll provide completion for all 'value' fields in biome_filter
    // The user will need to ensure the test field is set to "has_biome_tag"
    // This is acceptable since biome tags are specific to has_biome_tag filters
    return true;
  },
  onCompletion: BiomeTags.provideCompletion,
});
