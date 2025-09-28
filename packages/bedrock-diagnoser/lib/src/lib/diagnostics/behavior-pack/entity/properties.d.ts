import { EntityProperty } from "bc-minecraft-bedrock-project/lib/src/project/behavior-pack/entity";
import { DiagnosticsBuilder } from "../../../types";
export declare function diagnose_entity_properties_definition(property: EntityProperty[], diagnoser: DiagnosticsBuilder, text: string): void;
/**
 * Checks if the property is used correctly
 * @param definitions The definitions to check against
 * @param name The property name to check
 * @param value The value to check
 * @param parent The parent of the property
 * @param diagnoser The diagnoser to report to
 */
export declare function diagnose_entity_property_usage(definitions: EntityProperty[], name: string, value: string | number | boolean, parent: "events" | "filter", diagnoser: DiagnosticsBuilder): void;
