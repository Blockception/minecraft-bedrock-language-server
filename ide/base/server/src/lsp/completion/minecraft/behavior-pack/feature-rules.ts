import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder/json-path';
import { CompletionContext } from '../../context';
import * as BiomeTags from './biome-tags';
import * as jsonc from 'jsonc-parser';

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return featureRuleJsonCompletion.onCompletion(context);
}

function provideBiomeTagsIfHasBiomeTagFilter(context: Context<CompletionContext>): void {
  // Parse the document to get the JSON structure
  const text = context.document.getText();
  const cursor = context.cursor;
  
  // Get the location of the current cursor in the JSON structure
  const location = jsonc.getLocation(text, cursor);
  
  // Navigate up the path to find the filter object that contains the 'value' field
  // The path might be like: ["minecraft:feature_rules", "conditions", "minecraft:biome_filter", "all_of", 0, "value"]
  // We need to go up one level to get the filter object
  if (location.path.length === 0) {
    return;
  }
  
  // Create a path to the parent object (remove the last element which is 'value')
  const parentPath = location.path.slice(0, -1);
  
  // Parse the entire JSON to navigate to the parent object
  const root = jsonc.parseTree(text);
  if (!root) {
    return;
  }
  
  // Navigate to the parent filter object
  let current = root;
  for (const segment of parentPath) {
    const node = jsonc.findNodeAtLocation(current, [segment]);
    if (!node) {
      return;
    }
    current = node;
  }
  
  // Now check if this object has a 'test' property with value 'has_biome_tag'
  const testNode = jsonc.findNodeAtLocation(current, ['test']);
  if (!testNode || testNode.type !== 'string' || testNode.value !== 'has_biome_tag') {
    return;
  }
  
  // If we get here, we're in a has_biome_tag filter, so provide biome tag completions
  BiomeTags.provideCompletion(context);
}

const featureRuleJsonCompletion = new JsonPathCompletion({
  match: (path) => {
    // Match filter value paths in biome_filter
    return path.includes('minecraft:biome_filter') && path.endsWith('/value');
  },
  onCompletion: provideBiomeTagsIfHasBiomeTagFilter,
});
