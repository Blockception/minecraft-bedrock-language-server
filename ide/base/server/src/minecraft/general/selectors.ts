import { Minecraft } from 'bc-minecraft-bedrock-types';

export function getAttribute(attr: string, selector: string): string[] {
  const sel = Minecraft.Selector.Selector.parse(selector);
  if (sel === undefined) return [];

  const types = sel.get(attr).map((attr) => {
    return attr.isString() ? (attr.value as string) : '';
  });

  return types;
}
