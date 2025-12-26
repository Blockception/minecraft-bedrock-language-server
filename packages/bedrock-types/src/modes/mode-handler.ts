import { Mode, ModeCollection } from './mode-collection';

/**
 * Handler class that provides convenient methods for working with mode collections.
 * Implements ModeCollection interface and wraps common mode collection operations.
 */
export class ModeHandler implements ModeCollection {
  /**The collection of different modes*/
  public modes: Mode[];
  /**The name of the collection*/
  public name: string;

  constructor(collection: ModeCollection) {
    this.modes = collection.modes;
    this.name = collection.name;
  }

  /**
   * Checks if a given value exists as a mode name in this collection.
   * @param value The mode name to look for
   * @returns True if the value exists as a mode name, false otherwise
   */
  isValue(value: string): boolean {
    return ModeCollection.isValue(this, value);
  }

  /**
   * Retrieves a mode from this collection by name or index.
   * @param index The mode name (string) or array index (number) to retrieve
   * @returns The Mode object if found, undefined otherwise
   */
  get(index: string | number): Mode | undefined {
    return ModeCollection.get(this, index);
  }

  /**
   * Iterates over all modes in the collection, calling the callback function for each mode.
   * @param callbackfn Function to execute for each mode
   * @param thisArg Optional value to use as 'this' when executing callback
   */
  foreach(callbackfn: (value: Mode, index: number, array: Mode[]) => void, thisArg?: any): void {
    return this.modes.forEach(callbackfn, thisArg);
  }
}
