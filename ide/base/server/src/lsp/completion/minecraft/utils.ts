import { Identifiable } from '@blockception/packages-shared';

/**
 * Creates a documentation generator function for completion items that handles both
 * string definitions (from .mcdefinitions) and Identifiable objects (from project data).
 *
 * @param definedPrefix - Prefix for defined items from .mcdefinitions (e.g., "The defined block")
 * @param projectPrefix - Prefix for project items (e.g., "The block definition")
 * @returns A function that generates appropriate documentation based on item type
 *
 * @example
 * ```ts
 * const generateDoc = createDefinitionDocGenerator('The defined block', 'The block definition');
 * // For string: "The defined block: my_block"
 * // For Identifiable: "The block definition: namespace:my_block"
 * ```
 */
export function createDefinitionDocGenerator(
  definedPrefix: string,
  projectPrefix: string,
): (item: Identifiable | string) => string {
  return (item: Identifiable | string) => {
    if (typeof item === 'string') return `${definedPrefix}: ${item}`;
    return `${projectPrefix}: ${item.id}`;
  };
}
