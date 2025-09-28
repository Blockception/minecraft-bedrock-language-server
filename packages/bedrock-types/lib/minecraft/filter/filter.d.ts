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
export declare namespace Filter {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Filter;
    /**
     *
     * @param item
     * @param callback
     * @returns
     */
    function forEach(item: FilterType, callback: (item: Filter) => void): void;
}
