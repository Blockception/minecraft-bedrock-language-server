/**
 * The base interface for all components
 */
export type Component = any;
/**
 * The base interface for all component groups
 */
export type ComponentContainer = Record<string, Component>;
/**
 * The base interface for all container that contain component groups
 */
export type ComponentGroups = Record<string, ComponentContainer>;

export interface ComponentBehavior {
  component_groups?: ComponentGroups;
  components?: ComponentContainer;
}

