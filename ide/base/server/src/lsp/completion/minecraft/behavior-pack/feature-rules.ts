import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder/json-path';
import { CompletionContext } from '../../context';
import * as BiomeTags from './biome-tags';

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return featureRuleJsonCompletion.onCompletion(context);
}

function provideBiomeTagsIfHasBiomeTagFilter(context: Context<CompletionContext>): void {
  // Check if the document contains "has_biome_tag" near this value field
  const text = context.document.getText();
  const cursor = context.cursor;
  
  // Look backwards from cursor to find the opening brace of the current filter object
  let braceCount = 0;
  let startPos = cursor;
  for (let i = cursor; i >= 0; i--) {
    const char = text[i];
    if (char === '}') braceCount++;
    if (char === '{') {
      if (braceCount === 0) {
        startPos = i;
        break;
      }
      braceCount--;
    }
  }
  
  // Look forward to find the closing brace
  braceCount = 0;
  let endPos = cursor;
  for (let i = cursor; i < text.length; i++) {
    const char = text[i];
    if (char === '{') braceCount++;
    if (char === '}') {
      if (braceCount === 0) {
        endPos = i;
        break;
      }
      braceCount--;
    }
  }
  
  // Extract the filter object text
  const filterText = text.substring(startPos, endPos + 1);
  
  // Check if this filter has test: "has_biome_tag"
  if (/["']test["']\s*:\s*["']has_biome_tag["']/.test(filterText)) {
    BiomeTags.provideCompletion(context);
  }
}

const featureRuleJsonCompletion = new JsonPathCompletion({
  match: (path) => {
    // Match filter value paths in biome_filter
    return path.includes('minecraft:biome_filter') && path.endsWith('/value');
  },
  onCompletion: provideBiomeTagsIfHasBiomeTagFilter,
});
