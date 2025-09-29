import { Data } from './data';

/**Molang data for feature rules*/
export namespace FeaturesRules {
  /**The list of usable variables for this specific type*/
  export const Variables: Data[] = [
    { id: 'originx' },
    { id: 'originy' },
    { id: 'originz' },
    { id: 'worldx' },
    { id: 'worldy' },
    { id: 'worldz' },
  ];
  /**The list of specific contexts usable for this specific type*/
  export const Contexts: Data[] = [];
  /**The list of usable temp variables for this specific type*/
  export const Temps: Data[] = [];
}
