import { IIdentifier } from '../interfaces';
import fs from 'fs';

/**
 * Lang data from resource packs
 */
export interface Lang extends IIdentifier {
  id: string;
  value: string;
}

/**
 * Create a new Lang
 */
export function createLang(): Lang {
  return {
    id: '',
    value: ''
  };
}

/**
 * Parse a lang document from a file
 */
function getDoc(filepath: string): string | null {
  if (!fs.existsSync(filepath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return data;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

/**
 * Convert *.lang file to Lang objects
 */
export function convertLang(filepath: string): Lang[] {
  const receiver: Lang[] = [];
  const doc = getDoc(filepath);
  if (doc === null) return receiver;

  doc.split(/\r?\n/).forEach(line => {

    line = line.trim();

    // Accounting for blank lines, comments, multi-line comments
    if (!line.length || line.startsWith('#') || !line.includes('=')) return;

    // Incase '=' appears more than once in a key but I don't think that will happen
    const equals = line.indexOf('=');

    const id = line.slice(0, equals).trim();
    if (!id.length) return;

    const value = line.slice(equals + 1).trimEnd();

    const lang = createLang();
    lang.id = id;
    lang.value = value;
    receiver.push(lang);
  });

  return receiver;
}