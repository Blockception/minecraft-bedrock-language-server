import { MCProject } from "bc-minecraft-project";
import { PackCollection } from "../../types";
import { WorldPack } from "./world-pack";
import { Manifest } from "../../internal/types";
/** */
export declare class WorldPackCollection extends PackCollection<WorldPack> {
    constructor();
    add(folder: string, context: MCProject | string, manifest: Manifest): WorldPack;
}
