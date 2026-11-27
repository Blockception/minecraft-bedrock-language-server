import { CompletionItem, CompletionItemKind } from 'vscode-languageserver';
import {
  cRawTextComponent,
  cRawTextExample,
  cScoreComponent,
  cSelectorComponent,
  cTextComponent,
  cTranslationComponent,
  cTranslationWith,
  cTranslationWithComplex,
} from '../../../../minecraft/json/raw-text/constants';
import { Context } from '../../../context/context';
import { CommandCompletionContext, CompletionContext } from '../../context';

/**The candidates, in the order they should be suggested when nothing more specific is known about the cursor position */
const defaultOrder: CompletionItem[] = [
  { label: 'Json Raw Text', documentation: cRawTextComponent, insertText: cRawTextComponent },
  { label: 'Json Raw Text example', documentation: cRawTextExample, insertText: cRawTextExample },
  { label: 'Text component', documentation: cTextComponent, insertText: cTextComponent },
  { label: 'Score component', documentation: cScoreComponent, insertText: cScoreComponent },
  { label: 'Translation component', documentation: cTranslationComponent, insertText: cTranslationComponent },
  { label: 'Selector component', documentation: cSelectorComponent, insertText: cSelectorComponent },
  { label: 'Translation component, with', documentation: cTranslationWith, insertText: cTranslationWith },
  {
    label: 'Translation component, with complex',
    documentation: cTranslationWithComplex,
    insertText: cTranslationWithComplex,
  },
];

/**The candidates, in the order they should be suggested when the cursor is nested inside a `rawtext` array or a
 * component object, where the `{ "rawtext": [ ] }` wrapper itself cannot be used */
const nestedOrder: CompletionItem[] = [
  { label: 'Text component', documentation: cTextComponent, insertText: cTextComponent },
  { label: 'Score component', documentation: cScoreComponent, insertText: cScoreComponent },
  { label: 'Translation component', documentation: cTranslationComponent, insertText: cTranslationComponent },
  { label: 'Selector component', documentation: cSelectorComponent, insertText: cSelectorComponent },
  { label: 'Translation component, with', documentation: cTranslationWith, insertText: cTranslationWith },
  {
    label: 'Translation component, with complex',
    documentation: cTranslationWithComplex,
    insertText: cTranslationWithComplex,
  },
];

export function provideCompletion(context: Context<CompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Snippet });
  const items = isNested(context) ? nestedOrder : defaultOrder;

  items.forEach((item, index) => {
    builder.add({ ...item, sortText: String(index).padStart(2, '0') });
  });
}

/**
 * Determines if the cursor is currently positioned inside any unclosed `{` or `[`, rather than at the very start of
 * the argument (where the `{ "rawtext": [ ] }` wrapper is the only valid candidate)
 * @param context The completion context
 * @returns True if the cursor is nested inside an object or array
 */
function isNested(context: Context<CompletionContext>): boolean {
  if (!CommandCompletionContext.is(context)) return false;

  const parameter = context.current;
  if (!parameter) return false;

  const relative = context.cursor - parameter.offset;
  if (relative < 0 || relative > parameter.text.length) return false;

  return hasUnclosedBracket(parameter.text.substring(0, relative));
}

/**
 * Walks the given text and checks whether it contains an unclosed `{` or `[`
 * @param text The text to walk, up to the cursor
 * @returns True if there is at least one unclosed bracket
 */
function hasUnclosedBracket(text: string): boolean {
  let inString = false;
  let depth = 0;

  for (let index = 0; index < text.length; index++) {
    const c = text.charAt(index);

    if (inString) {
      if (c === '"' && text.charAt(index - 1) !== '\\') inString = false;
      continue;
    }

    switch (c) {
      case '"':
        inString = true;
        break;
      case '{':
      case '[':
        depth++;
        break;
      case '}':
      case ']':
        depth--;
        break;
      default:
        break;
    }
  }

  return depth > 0;
}
