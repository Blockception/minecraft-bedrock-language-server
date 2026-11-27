import { CancellationToken, CompletionItem, WorkDoneProgressReporter } from 'vscode-languageserver';
import { createBuilder } from '../../builder/builder';
import { CommandCompletionContext } from '../../context';
import { provideCompletion } from './rawtext';

const argumentOffset = 10;

function createContext(text: string, relativeCursor: number): CommandCompletionContext {
  const builder = createBuilder(CancellationToken.None, {} as WorkDoneProgressReporter);

  return {
    builder,
    cursor: argumentOffset + relativeCursor,
    current: { offset: argumentOffset, text },
    parameter: {} as any,
    parameterIndex: 0,
    command: {} as any,
    bestMatch: {} as any,
  } as unknown as CommandCompletionContext;
}

function labels(items: CompletionItem[]): string[] {
  return [...items].sort((a, b) => (a.sortText ?? '').localeCompare(b.sortText ?? '')).map((item) => item.label);
}

describe('RawText.provideCompletion', () => {
  test('puts the rawtext wrapper first for an empty argument', () => {
    const context = createContext('', 0);

    provideCompletion(context as any);

    expect(labels(context.builder.getItems())[0]).toBe('Json Raw Text');
  });

  test('puts components first and drops the rawtext wrapper inside the rawtext array', () => {
    const text = '{ "rawtext": [ ';
    const context = createContext(text, text.length);

    provideCompletion(context as any);

    const order = labels(context.builder.getItems());
    expect(order).toEqual([
      'Text component',
      'Score component',
      'Translation component',
      'Selector component',
      'Translation component, with',
      'Translation component, with complex',
    ]);
  });

  test('still prefers components while inside the outer object, before the array is closed', () => {
    const text = '{ "rawtext": [ { "text": "hi" } ] ';
    const context = createContext(text, text.length);

    provideCompletion(context as any);

    expect(labels(context.builder.getItems())[0]).toBe('Text component');
  });

  test('puts the rawtext wrapper first once every bracket is closed again', () => {
    const text = '{ "rawtext": [ { "text": "hi" } ] }';
    const context = createContext(text, text.length);

    provideCompletion(context as any);

    expect(labels(context.builder.getItems())[0]).toBe('Json Raw Text');
  });
});
