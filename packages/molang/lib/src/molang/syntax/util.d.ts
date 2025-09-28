import { Token } from './tokens';
/**
 * Gets a slice tokens from ( to ) (or for {}, [])
 * @param tokens
 * @param startIndex
 * @returns
 */
export declare function getMatchingTokenSlice(tokens: Token[], startIndex: number): Token[];
