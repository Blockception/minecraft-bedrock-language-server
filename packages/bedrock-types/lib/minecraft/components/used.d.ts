import { ComponentBehavior } from "./interfaces";
/**
 * Returns all the used components in the given data
 * @param data The data to get the used components from
 * @returns All the used components
 */
export declare function getUsedComponents(data: ComponentBehavior): string[];
/**
 * Returns all the used events in the given data
 * @param data The data to get the used events from
 * @returns All the used events
 */
export declare function getUsedGroups(data: ComponentBehavior): string[];
/**
 * Returns true or false if the given entity has the given component group
 * @param data The entity to check
 * @param group The group to check for
 * @returns true or false if the given entity has the given component group
 */
export declare function hasGroup(data: ComponentBehavior, group: string): boolean;
