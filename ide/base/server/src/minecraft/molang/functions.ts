import { CommandData } from 'bc-minecraft-bedrock-command';
import {
  ExpressionNode,
  FunctionCallNode,
  MolangSet,
  ResourceReferenceNode,
  ResourceScope,
  VariableNode,
  VariableScope,
} from 'bc-minecraft-molang';
import { Character } from '../../util';

const MolangRegexp =
  /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->)\b/im;
// const MolangCommandRegexp = /^\/[a-z]+ /;

/**
 *
 * @param text
 * @returns
 */
export function IsMolang(text: string): boolean {
  if (text.startsWith('@s')) return true;

  //Get first word
  let index = text.indexOf(' ');
  if (index < 0) index = text.length;
  let word = text.substring(0, index);

  if (word.startsWith('/')) {
    word = word.substring(1, word.length);

    //command test
    if (CommandData.Vanilla[word] !== undefined) {
      return true;
    }
    if (CommandData.Edu[word] !== undefined) {
      return true;
    }
  }

  //general test
  return MolangRegexp.test(text);
}

/**
 *
 * @param text The text to retrieve the word from
 * @param cursor The cursor offset in the text
 * @returns
 */
export function getPreviousWord(text: string, cursor: number): string {
  let endIndex = cursor;

  if (text.charAt(endIndex - 1) === '.') endIndex = cursor - 1;

  let Index;
  for (Index = endIndex - 1; Index > -1; Index--) {
    const c = text.charAt(Index);

    if (Character.IsLetter(c) || Character.IsNumber(c) || c === '_') continue;

    break;
  }

  return text.substring(Index + 1, endIndex);
}

export function isDefined(set: MolangSet | undefined, id: string) {
  if (set === undefined) return false;

  for (const item of set.assigned) {
    const identifier = ExpressionNode.getIdentifier(item);

    if (identifier === id) return true;
  }

  return false;
}

/**
 * @deprecated Use ExpressionNode.getIdentifier
 */
export function getIdentifier(
  item: Pick<ResourceReferenceNode | VariableNode | FunctionCallNode, 'scope' | 'names'>,
  prefixed: boolean = true,
): string {
  return ExpressionNode.getIdentifier(item, prefixed);
}

export function getScopeDefined(set: MolangSet, ...scope: Array<VariableScope | ResourceScope>) {
  const result: Array<ResourceReferenceNode | VariableNode> = [];

  set.assigned.forEach((v) => {
    if (scope.includes(v.scope)) result.push(v);
  });

  return result;
}
