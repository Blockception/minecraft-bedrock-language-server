import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Kinds } from '../../../constants';
import { CommandCompletionContext } from '../context';

export function provideCompletion(context: CommandCompletionContext): void {
  const builder = context.builder;

  MinecraftData.General.Enchantments.forEach((enchantment) => {
    builder.add({
      label: enchantment,
      documentation: `The vanilla minecraft enchantment: '${enchantment}'`,
      kind: Kinds.Completion.Enchant,
    });
  });
}
