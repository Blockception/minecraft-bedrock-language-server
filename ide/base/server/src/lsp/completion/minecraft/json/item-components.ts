import { CompletionItemKind } from 'vscode-languageserver';
import { CommandCompletionContext } from '../../context';
import { Context } from '../../../context/context';
import {
  CanDestroyComponent,
  CanPlaceOnComponent,
  Example,
  KeepOnDeathComponent,
  LockInInventoryComponent,
  LockInSlotComponent,
} from '../../../../minecraft/json/item-components/constants';

export function provideCompletion(context: Context<CommandCompletionContext>): void {
  const builder = context.builder.withDefaults({ kind: CompletionItemKind.Snippet });

  //When no opening brace has been typed yet, the components need to be wrapped in a json object or bedrock rejects them
  const hasOpeningBrace = context.current?.text.trimStart().startsWith('{') ?? false;
  const wrap = (snippet: string): string => (hasOpeningBrace ? snippet : `{ ${snippet} }`);

  builder.add({
    label: 'Json Item Components Example',
    documentation: Example,
    insertText: Example,
  });
  builder.add({
    label: 'Can destroy component',
    documentation: wrap(CanDestroyComponent),
    insertText: wrap(CanDestroyComponent),
  });
  builder.add({
    label: 'Can place on component',
    documentation: wrap(CanPlaceOnComponent),
    insertText: wrap(CanPlaceOnComponent),
  });
  builder.add({
    label: 'Lock in inventory component',
    documentation: wrap(LockInInventoryComponent),
    insertText: wrap(LockInInventoryComponent),
  });
  builder.add({
    label: 'Keep on death component',
    documentation: wrap(KeepOnDeathComponent),
    insertText: wrap(KeepOnDeathComponent),
  });
  builder.add({
    label: 'Lock in slot component',
    documentation: wrap(LockInSlotComponent),
    insertText: wrap(LockInSlotComponent),
  });
}
