import { getSiblingPropertyValue } from '../../../../minecraft/json/path';
import { Context } from '../../../context/context';
import { JsonPathCompletion } from '../../builder/json-path';
import { CompletionContext } from '../../context';

import * as BiomeTags from './biome-tags';

export function provideJsonCompletion(context: Context<CompletionContext>) {
  return featureRuleJsonCompletion.onCompletion(context);
}

const featureRuleJsonCompletion = new JsonPathCompletion({
  match: /minecraft:biome_filter\/\d+\/value$/,
  onCompletion: (context) => {
    const test = getSiblingPropertyValue(context.cursor, context.document, 'test');
    if (test !== 'has_biome_tag') return;

    BiomeTags.provideCompletion(context);
  },
});
