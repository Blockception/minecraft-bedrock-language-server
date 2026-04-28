import { BaseObject } from 'bc-minecraft-bedrock-types';

/** Represents a UI element from a Minecraft Bedrock resource pack UI file, identified by its namespace-qualified name. */
export interface UIElement extends BaseObject {
  /** Variables defined on this element (keys starting with $) */
  variables: Set<string>;
  /** Binding names referenced by this element (values of binding_name in the bindings array) */
  bindings: Set<string>;
  /** The parent element ID (namespace.element) if this element uses @ inheritance */
  extends?: string;
}
