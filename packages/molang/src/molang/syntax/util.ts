import { Token, TokenType } from './tokens';

/**
 * Gets a slice tokens from ( to ) (or for {}, [])
 * @param tokens
 * @param startIndex
 * @returns
 */
export function getMatchingTokenSlice(tokens: Token[], startIndex: number): Token[] {
  if (startIndex >= tokens.length) {
    throw new Error('Start index is out of bounds');
  }

  const startToken = tokens[startIndex];
  let targetType: TokenType;
  let counterType: TokenType;

  // Determine what we're looking for based on the starting token
  switch (startToken.type) {
    case TokenType.OpenBrace:
      targetType = TokenType.CloseBrace;
      counterType = TokenType.OpenBrace;
      break;
    case TokenType.OpenParen:
      targetType = TokenType.CloseParen;
      counterType = TokenType.OpenParen;
      break;
    case TokenType.OpenBracket:
      targetType = TokenType.CloseBracket;
      counterType = TokenType.OpenBracket;
      break;
    default:
      throw new Error(`Token at index ${startIndex} is not an opening bracket, brace, or parenthesis`);
  }

  let level = 1; // We start with level 1 since we found the opening token
  let endIndex = -1;

  // Search for the matching closing token
  for (let i = startIndex + 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === counterType) {
      level++;
    } else if (token.type === targetType) {
      level--;
      if (level === 0) {
        endIndex = i;
        break;
      }
    }
  }

  // Validate that we found the matching closing token
  if (endIndex === -1) {
    const tokenName =
      startToken.type === TokenType.OpenBrace ? '{' : startToken.type === TokenType.OpenParen ? '(' : '[';
    const closingName = targetType === TokenType.CloseBrace ? '}' : targetType === TokenType.CloseParen ? ')' : ']';
    throw new Error(`Couldn't find the matching closing ${closingName} for ${tokenName} at index ${startIndex}`);
  }

  // Return the slice including both opening and closing tokens
  return tokens.slice(startIndex, endIndex + 1);
}
