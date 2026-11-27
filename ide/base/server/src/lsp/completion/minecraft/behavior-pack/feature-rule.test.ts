import { CancellationToken, CompletionItem, WorkDoneProgressReporter } from 'vscode-languageserver';
import { createBuilder } from '../../builder/builder';
import { Context } from '../../../context/context';
import { CompletionContext } from '../../context';
import { provideJsonCompletion } from './feature-rule';

function createContext(text: string, cursor: number, biomeTags: string[] = []): Context<CompletionContext> {
  const builder = createBuilder(CancellationToken.None, {} as WorkDoneProgressReporter);

  return {
    builder,
    cursor,
    logger: { debug: () => {} },
    document: { getText: () => text, uri: 'feature_rules/test.json' },
    database: {
      ProjectData: {
        behaviorPacks: {
          biomes: {
            forEach: (callback: (biome: { id: string; tags: string[] }) => void) => {
              callback({ id: 'test:biome', tags: biomeTags });
            },
          },
        },
      },
    },
  } as unknown as Context<CompletionContext>;
}

function labels(items: CompletionItem[]): string[] {
  return items.map((item) => item.label);
}

describe('FeatureRule.provideJsonCompletion', () => {
  test('provides biome tag completions while editing the value of a has_biome_tag filter', () => {
    const json = `{
      "minecraft:feature_rules": {
        "conditions": {
          "minecraft:biome_filter": [
            {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "ov"
            }
          ]
        }
      }
    }`;
    const cursor = json.indexOf('"ov"') + 2;
    const context = createContext(json, cursor, ['overworld', 'forest']);

    provideJsonCompletion(context);

    const result = labels(context.builder.getItems());
    expect(result).toContain('overworld');
    expect(result).toContain('forest');
  });

  test('does not provide biome tag completions for other filter tests', () => {
    const json = `{
      "minecraft:feature_rules": {
        "conditions": {
          "minecraft:biome_filter": [
            {
              "test": "has_tag",
              "operator": "==",
              "value": "ov"
            }
          ]
        }
      }
    }`;
    const cursor = json.indexOf('"ov"') + 2;
    const context = createContext(json, cursor, ['overworld']);

    provideJsonCompletion(context);

    expect(context.builder.getItems()).toEqual([]);
  });

  test('does not provide biome tag completions outside of the biome_filter value', () => {
    const json = `{
      "minecraft:feature_rules": {
        "conditions": {
          "minecraft:biome_filter": [
            {
              "test": "has_biome_tag",
              "operator": "=",
              "value": "overworld"
            }
          ]
        }
      }
    }`;
    const cursor = json.indexOf('"="') + 2;
    const context = createContext(json, cursor, ['overworld']);

    provideJsonCompletion(context);

    expect(context.builder.getItems()).toEqual([]);
  });
});
