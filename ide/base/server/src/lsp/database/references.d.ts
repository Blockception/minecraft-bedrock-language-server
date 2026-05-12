import { DocumentLocation, Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { BehaviorPack, Defined, ResourcePack, Using } from 'bc-minecraft-bedrock-project';
import { GeneralInfo } from 'bc-minecraft-bedrock-project/src/project/general/types';
import { MolangSet } from 'bc-minecraft-molang';
import { CancellationToken, Location } from 'vscode-languageserver';
import { IDocumentManager } from '../documents/manager';
type Base = Identifiable & Locatable;
type Carriers = Base & Partial<Items>;
type Items = BehaviorPack.Animation.Animation & BehaviorPack.AnimationController.AnimationController & BehaviorPack.Block.Block & BehaviorPack.Entity.Entity & BehaviorPack.Item.Item & BehaviorPack.LootTable.LootTable & BehaviorPack.McFunction.Function & BehaviorPack.Structure.Structure & BehaviorPack.Trading.Trading & ResourcePack.Animation.Animation & ResourcePack.AnimationController.AnimationController & ResourcePack.Attachable.Attachable & ResourcePack.Entity.Entity & ResourcePack.Fog.Fog & ResourcePack.Material.Material & ResourcePack.Model.Model & ResourcePack.Particle.Particle & ResourcePack.RenderController.RenderController & ResourcePack.Sound.Sound & ResourcePack.Texture.Texture & GeneralInfo;
export interface Options {
    defined: boolean;
    usage: boolean;
}
export declare class ReferenceBuilder {
    locations: (Base | Location | undefined)[];
    documents: IDocumentManager;
    options: Options;
    token: CancellationToken | undefined;
    constructor(documents: IDocumentManager, options: Options, token?: CancellationToken);
    findReference<T extends Carriers>(item: T, id: string): void;
    inDefinedOrUsage(holder: Base, id: string, items: Partial<Defined | Using> | undefined): void;
    inSet(holder: Base, id: string, items: Set<string> | undefined): void;
    inNamed(holder: Base, id: string, items: {
        name: string;
    }[] | undefined): void;
    inMolang(holder: Base, id: string, molang: MolangSet | undefined): void;
    private checkMolang;
    add(holder: Base, item: string): void;
    addItem(holder: Base, item: DocumentLocation, length: number): void;
}
export {};
//# sourceMappingURL=references.d.ts.map