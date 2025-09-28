/**
 * Finds the first index of a character in a string that is a comma or the end of the string
 * @param text
 * @returns
 */
export function findCommaOrEnd(text: string): number {
  let index = 0;
  let depth = 0;
  let instr = false;

  while (index < text.length) {
    const c = text.charAt(index);

    if (instr) {
      if (c === '"' && text.charAt(index - 1) !== "\\") {
        instr = false;
      }
    } else if (c === '"') {
      instr = true;
    } else {
      switch (c) {
        case "[":
        case "{":
        case "(":
          depth++;
          break;
        case "]":
        case "}":
        case ")":
          depth--;
          break;
        case ",":
          if (depth === 0) {
            return index;
          }
      }
    }

    index++;
  }

  return text.length;
}

export function trimBraces(text: string): string {
  switch (text.charAt(0)) {
    case "[":
    case "{":
    case "(":
      text = text.slice(1);
  }

  switch (text.charAt(text.length - 1)) {
    case "]":
    case "}":
    case ")":
      text = text.slice(0, text.length - 1);
  }

  return text;
}

/**
 * Parses the items of an array or object
 * @param text
 * @param offset
 * @returns
 */
export function trimWithOffset(text: string, offset: number): [string, number] {
  const n = text.trimStart();
  offset += text.length - n.length;

  text = n.trimEnd();
  return [text, offset];
}
