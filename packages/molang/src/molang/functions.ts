/* eslint-disable no-fallthrough */
/** The type of molang */
export enum MolangType {
  /** A command */
  command,
  /** An event */
  event,
  /** regular molang */
  molang,
  /** unknown */
  unknown,
}

const eventRegex = /^@s ([\w:_-]+)/im;
const commandRegex = /^\/[a-z]+/im;
const molangRegexp =
  /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->|this)\b/im;

/**
 * Checks if the string is a molang type
 * @param data The string to check
 * @returns The type of molang
 */
export function isMolangType(data: string): MolangType {
  if (commandRegex.test(data)) return MolangType.command;
  if (eventRegex.test(data)) return MolangType.event;
  if (molangRegexp.test(data)) return MolangType.molang;

  return MolangType.unknown;
}

export function isMolang(data: string) {
  return molangRegexp.test(data) && data !== 'this';
}

/**
 * Already assumes that the given data is of type MolangType.event
 * @param data The text to parse
 */
export function getEvent(data: string): string {
  return data.slice(3).trim();
}

/**
 * Checks if the given data is a valid molang expression
 * @param molang The molang expression to check
 * @returns True if the given molang expression is valid
 */
export function isValidMolang(molang: string): boolean {
  let instr = false;
  let level = 0;

  for (let i = 0; i < molang.length; i++) {
    switch (molang[i]) {
      case "'":
        instr = !instr;
        break;

      case '[':
      case '{':
      case '(':
        if (!instr) level++;
        break;

      case ']':
      case ')':
      case '}':
        if (!instr) level--;
        break;
    }
  }

  return level === 0 && instr === false;
}

/**
 * Finds the specific molang expression in the given text
 * @param molang The text to parse
 * @param startIndex The index to start searching from
 * @param find The molang expression to find
 * @returns The index of the molang expression
 */
export function find(molang: string, startIndex: number, find: string): number {
  let instr = false;
  let level = 0;
  const length = find.length;
  const max = molang.length - length;

  for (let I = startIndex; I < max; I++) {
    if (level === 0 && instr === false) {
      if (molang.slice(I, I + length) === find) {
        return I;
      }
    }

    switch (molang[I]) {
      case "'":
        instr = !instr;

      case '[':
      case '{':
      case '(':
        if (!instr) level++;
        break;

      case ']':
      case ')':
      case '}':
        if (!instr) level--;
        break;
    }
  }

  return -1;
}
