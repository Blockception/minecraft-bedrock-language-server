import * as jsonc from 'jsonc-parser';

import { TextDocument } from '../../lsp/documents';

export interface Path {
  path: string;
  property: string;
  isProperty: boolean;
}

export function getJsonPath(cursor: number, text: string | TextDocument): Path {
  if (typeof text !== 'string') {
    text = text.getText();
  }
  const pos = jsonc.getLocation(text, cursor);

  return {
    property: (pos.path[pos.path.length - 1] ?? '').toString(),
    path: pos.path.join('/'),
    isProperty: !pos.isAtPropertyKey,
  };
}

/**
 * Finds the value of a sibling property of the json object that contains the cursor.
 * Useful for completions/diagnostics that depend on another key of the same object,
 * for example reading the `test` of a filter to know what kind of `value` is expected.
 * @param cursor The cursor offset
 * @param text The json text or document to search in
 * @param property The sibling property name to look for
 * @returns The string value of the sibling property, or undefined if not found
 */
export function getSiblingPropertyValue(
  cursor: number,
  text: string | TextDocument,
  property: string,
): string | undefined {
  if (typeof text !== 'string') {
    text = text.getText();
  }

  const tree = jsonc.parseTree(text);
  if (!tree) return undefined;

  // includeRightBound so a cursor right after the last typed character of a
  // still-open string value (no closing quote yet) resolves to that string node.
  let node = jsonc.findNodeAtOffset(tree, cursor, true);

  while (node && node.type !== 'object') {
    node = node.parent;
  }

  if (!node) return undefined;

  const sibling = jsonc.findNodeAtLocation(node, [property]);
  if (!sibling || sibling.type !== 'string') return undefined;

  return jsonc.getNodeValue(sibling);
}
