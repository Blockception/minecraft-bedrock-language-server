import { ComponentBehavior } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { DocumentDiagnosticsBuilder } from "../../types";
import { Context } from "./components";
export type ComponentCheck<T> = (name: string, component: any, context: Context<T>, diagnoser: DocumentDiagnosticsBuilder) => void;
export declare function component_error<T>(message: string, code: string | number): ComponentCheck<T>;
export declare function component_warning<T>(message: string, code: string | number): ComponentCheck<T>;
export declare function components_check<T>(data: ComponentBehavior | undefined, context: Context<T>, diagnoser: DocumentDiagnosticsBuilder, component_test: Record<string, ComponentCheck<T>>): void;
