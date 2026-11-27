import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { CancellationToken, WorkDoneProgressReporter } from 'vscode-languageserver';
import { createBuilder } from '../builder/builder';
import { CommandCompletionContext } from '../context';
import { provideCompletion } from './enchant';

function createContext(): CommandCompletionContext {
  const builder = createBuilder(CancellationToken.None, {} as WorkDoneProgressReporter);

  return {
    builder,
    cursor: 0,
    current: { offset: 0, text: '' },
    parameter: {} as any,
    parameterIndex: 0,
    command: {} as any,
    bestMatch: {} as any,
  } as unknown as CommandCompletionContext;
}

describe('Enchant.provideCompletion', () => {
  test('suggests every vanilla enchantment name', () => {
    const context = createContext();

    provideCompletion(context);

    const labels = context.builder.getItems().map((item) => item.label);
    expect(labels).toEqual(MinecraftData.General.Enchantments);
  });
});
