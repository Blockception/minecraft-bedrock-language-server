import { Identifiable, Documentated } from '@blockception/packages-shared';
import { Locatable } from './locatable';
import { Location } from './location';

/** */
export interface BaseObject extends Identifiable, Documentated, Locatable {}

export namespace BaseObject {
  /** */
  export function is(value: any): value is BaseObject {
    if (typeof value === 'object') {
      if (typeof value.id !== 'string') return false;
      if (!Location.is(value.location)) return false;

      return true;
    }

    return false;
  }
}
