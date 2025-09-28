import { MCProject } from "bc-minecraft-project";
import { PackCollection } from "../../types";
import { WorldPack } from "./world-pack";
import { Manifest } from "../../internal/types";

/** */
export class WorldPackCollection extends PackCollection<WorldPack> {
  constructor() {
    super();
  }

  add(folder: string, context: MCProject | string, manifest: Manifest): WorldPack {
    const out = new WorldPack(folder, context, manifest);
    this.packs.push(out);

    return out;
  }
}
