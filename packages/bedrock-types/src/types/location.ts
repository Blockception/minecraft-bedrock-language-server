import { DocumentLocation } from './document-location';

/**An object that describe a location in a document*/
export interface Location {
  /**The uri of the document*/
  uri: string;

  /**The position of the in the document*/
  position: DocumentLocation;
}

/** */
export namespace Location {
  /**
   * Type guard to check if a value is a valid Location object.
   * @param value The value to check
   * @returns True if the value has uri (string) and position properties, false otherwise
   */
  export function is(value: any): value is Location {
    if (typeof value === 'object') {
      if (typeof value.uri === 'string' && typeof value.position !== 'undefined') return true;
    }

    return false;
  }

  /**
   * Creates a new Location object with the specified URI and position.
   * @param uri The document URI
   * @param position The position within the document (defaults to 0)
   * @returns A new Location object
   */
  export function create(uri: string, position: DocumentLocation = 0): Location {
    return { uri: uri, position: position };
  }

  /**
   * Creates an empty Location object with an empty URI.
   * @returns A new Location object with an empty URI and position 0
   */
  export function empty() {
    return create('');
  }
}
