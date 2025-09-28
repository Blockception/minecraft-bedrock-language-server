import { DomainType } from './domain';
import { OperatorType } from './operator';
import { SubjectType } from './subject';
import { TestType } from './testtype';


/**
 * The interface for a filter
 */
export interface Filter {
  /** The type of filter */
  test: TestType;
  /** The subject of the filter*/
  subject?: SubjectType;
  /** The operator of the filter*/
  operator?: OperatorType;
  /** The domain of the filter*/
  domain?: DomainType;
  /** The value of the filter*/
  value?: string | boolean | number;
}

/** The interface for a filter container */
export interface FilterContainerType {
  /** any filters to be true */
  any_of?: FilterItemType;
  /** all filters to be true */
  all_of?: FilterItemType;
  /** any filters to be false */
  none_of?: FilterItemType;
}

export type FilterType = FilterItemType | FilterItemType[];
export type FilterItemType = FilterContainerType | Filter;

/**
 *
 */
export namespace Filter {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Filter {
    if (typeof value === "object") {
      return typeof value.test === "string";
    }

    return false;
  }

  /**
   *
   * @param item
   * @param callback
   * @returns
   */
  export function forEach(item: FilterType, callback: (item: Filter) => void): void {
    if (Array.isArray(item)) {
      item.forEach((i) => forEach(i, callback));
      return;
    }

    if (typeof item !== "object") return;

    if (Filter.is(item)) {
      callback(item);
    }

    item = item as FilterContainerType;
    if (item.any_of) forEach(item.any_of, callback);
    if (item.all_of) forEach(item.all_of, callback);
    if (item.none_of) forEach(item.none_of, callback);
  }
}
