import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

export type Depended = string | RegExp;
export type DependedMap = Record<string, Depended[]>;

/**
 *
 */
export interface Context<T> {
  /** The object / item that defined or carries the components */
  source: Readonly<T>;
  /** The components used by the source collected from multiple sources */
  components: string[];
}

/**Checks if components dependencies are present, a component might need others to be present
 * @param entity The entity to check
 * @param entity The needed context
 * @param diagnoser The diagnoser to report to*/
export function components_dependencies<T>(
  owner: string,
  context: Context<T>,
  diagnoser: DiagnosticsBuilder,
  component_dependents_all: DependedMap,
  component_dependents_any: DependedMap,
): void {
  const components = context.components;

  //Loop through all the components that depend on all other components
  for (const [component, deps] of Object.entries(component_dependents_all)) {
    checkAll(owner, diagnoser, components, component, ...deps);
  }

  //Loop through all the components that depend on any other components
  for (const [component, deps] of Object.entries(component_dependents_any)) {
    checkAny(owner, diagnoser, components, component, ...deps);
  }
}

/**The component needs all of the specified needs
 * @param diagnoser
 * @param dependent The component group that is depended on other groups
 * @param needs
 * @param components The list of used components
 * @returns
 */
export function checkAll(
  owner: string,
  diagnoser: DiagnosticsBuilder,
  components: string[],
  dependent: string,
  ...needs: Depended[]
): void {
  //Check if the entity has the component
  if (!components.includes(dependent)) return;

  for (let I = 0; I < needs.length; I++) {
    const need = needs[I];

    //If any fails then report
    if (!isMatch(need, components)) {
      diagnoser.add(
        dependent,
        `Component: '${dependent}' requires a '${need}' component to be present`,
        DiagnosticSeverity.error,
        `behaviorpack.${owner}.component.missing`,
      );
    }
  }
}

/**The component needs one of the specified needs
 * @param diagnoser
 * @param dependent The component group that is depended on other groups
 * @param needs
 * @param components The list of used components
 * @returns
 */
export function checkAny(
  owner: string,
  diagnoser: DiagnosticsBuilder,
  components: string[],
  dependent: string,
  ...needs: Depended[]
): void {
  //Check if the entity has the component
  if (!components.includes(dependent)) return;

  for (let I = 0; I < needs.length; I++) {
    const need = needs[I];

    //Has the component, then exit
    if (isMatch(need, components)) return;
  }

  diagnoser.add(
    dependent,
    `Component: '${dependent}' requires one of the following components: '${JSON.stringify(
      needs.map((n) => n.toString()).join(','),
    )}'`,
    DiagnosticSeverity.error,
    `behaviorpack.${owner}.component.missing`,
  );
}

function isMatch(needs: Depended, components: string[]): boolean {
  if (typeof needs === 'string') return components.includes(needs);

  return components.findIndex((c) => needs.test(c)) !== -1;
}
