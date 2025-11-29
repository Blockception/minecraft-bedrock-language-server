import { IIdentifier } from '../interfaces';

/**
 * Trading data from behavior packs
 */
export interface Trading extends IIdentifier {
  id: string;
}

/**
 * Create a new Trading
 */
export function createTrading(id = ''): Trading {
  return {
    id,
  };
}

/**
 * Convert file path to Trading object
 */
export function convertTrading(filepath: string, receiver: Trading[]): void {
  const index = filepath.indexOf('trading');

  if (index >= 0) {
    const id = filepath.substring(index).replace(/\\/g, '/');
    receiver.push(createTrading(id));
  }
}
