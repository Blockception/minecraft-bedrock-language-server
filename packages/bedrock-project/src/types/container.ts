import { MCProject } from "bc-minecraft-project";

/** */
export interface Container {
  /**The nessacary Minecraft project data*/
  readonly context: MCProject;
}

/** */
export namespace Container {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Container {
    if (value && MCProject.is(value.context)) return true;

    return false;
  }
}
