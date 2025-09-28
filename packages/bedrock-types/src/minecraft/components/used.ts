import { ComponentBehavior } from "./interfaces";

/**
 * Returns all the used components in the given data
 * @param data The data to get the used components from
 * @returns All the used components
 */
export function getUsedComponents(data: ComponentBehavior): string[] {
  const out: string[] = [];

  if (data?.components) {
    Object.getOwnPropertyNames(data.components).forEach((c) => {
      if (!out.includes(c)) out.push(c);
    });
  }

  const groups = data?.component_groups;

  if (groups) {
    Object.entries(groups).forEach(([, group]) => {
      Object.getOwnPropertyNames(group).forEach((c) => {
        if (!out.includes(c)) out.push(c);
      });
    });
  }

  return out;
}

/**
 * Returns all the used events in the given data
 * @param data The data to get the used events from
 * @returns All the used events
 */
export function getUsedGroups(data: ComponentBehavior): string[] {
  const groups = data?.component_groups;

  if (groups) {
    return Object.getOwnPropertyNames(groups);
  }

  return [];
}

/**
 * Returns true or false if the given entity has the given component group
 * @param data The entity to check
 * @param group The group to check for
 * @returns true or false if the given entity has the given component group
 */
export function hasGroup(data: ComponentBehavior, group: string): boolean {
  if (data?.component_groups) {
    if (data?.component_groups[group]) {
      return true;
    }
  }

  return false;
}
