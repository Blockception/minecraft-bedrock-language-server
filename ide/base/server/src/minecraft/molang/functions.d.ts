import { FunctionCallNode, MolangSet, ResourceReferenceNode, ResourceScope, VariableNode, VariableScope } from 'bc-minecraft-molang';
/**
 *
 * @param text
 * @returns
 */
export declare function IsMolang(text: string): boolean;
/**
 *
 * @param text The text to retrieve the word from
 * @param cursor The cursor offset in the text
 * @returns
 */
export declare function getPreviousWord(text: string, cursor: number): string;
export declare function isDefined(set: MolangSet | undefined, id: string): boolean;
/**
 * @deprecated Use ExpressionNode.getIdentifier
 */
export declare function getIdentifier(item: Pick<ResourceReferenceNode | VariableNode | FunctionCallNode, 'scope' | 'names'>, prefixed?: boolean): string;
export declare function getScopeDefined(set: MolangSet, ...scope: Array<VariableScope | ResourceScope>): any[];
//# sourceMappingURL=functions.d.ts.map