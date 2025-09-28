import { ComponentBehavior, ComponentContainer } from "bc-minecraft-bedrock-types/minecraft/components";
import { DocumentDiagnosticsBuilder, DiagnosticSeverity } from "../../types";
import { Context } from "./components";

export type ComponentCheck<T> = (
  name: string,
  component: any,
  context: Context<T>,
  diagnoser: DocumentDiagnosticsBuilder
) => void;

export function component_error<T>(message: string, code: string | number): ComponentCheck<T> {
  return (name, _component, _context, diagnoser) => {
    diagnoser.add(name, message, DiagnosticSeverity.error, code);
  };
}

export function component_warning<T>(message: string, code: string | number): ComponentCheck<T> {
  return (name, _component, _context, diagnoser) => {
    diagnoser.add(name, message, DiagnosticSeverity.warning, code);
  };
}

export function components_check<T>(
  data: ComponentBehavior | undefined,
  context: Context<T>,
  diagnoser: DocumentDiagnosticsBuilder,
  component_test: Record<string, ComponentCheck<T>>
): void {
  if (data === undefined) return;

  comp_container_check(data.components, context, diagnoser, component_test);
  comp_container_check(data, context, diagnoser, component_test);

  if (data.component_groups) {
    Object.entries(data.component_groups)?.forEach(([, group]) => {
      comp_container_check(group, context, diagnoser, component_test);
    });
  }
}

function comp_container_check<T>(
  container: ComponentContainer | undefined,
  context: Context<T>,
  diagnoser: DocumentDiagnosticsBuilder,
  component_test: Record<string, ComponentCheck<T>>
): void {
  if (container === undefined) return;

  Object.keys(container)?.forEach((key) => {
    const callbackfn = component_test[key];

    if (callbackfn) {
      try {
        callbackfn(key, container[key], context, diagnoser);
      } catch (err: any) {
        diagnoser.add(
          key,
          `the diagnoser encountered an error checking the '${key}' component: ${JSON.stringify(
            { message: err.message, stack: err.stack, ...err },
            undefined,
            2
          )}`,
          DiagnosticSeverity.error,
          "diagnostics.components.internal.error"
        );
      }
    }
  });
}
