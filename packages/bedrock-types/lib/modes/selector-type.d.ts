import { ModeCollection } from "./mode-collection";
/**The namespace that delivers hard references*/
export declare namespace InternalSelectorTypeMode {
    /** */
    const AllPlayers: {
        name: string;
        documentation: string;
    };
    /** */
    const AllEntities: {
        name: string;
        documentation: string;
    };
    /** */
    const Random: {
        name: string;
        documentation: string;
    };
    /** */
    const Nearest: {
        name: string;
        documentation: string;
    };
    /** */
    const NearestEntity: {
        name: string;
        documentation: string;
    };
    /** */
    const Self: {
        name: string;
        documentation: string;
    };
    /** */
    const Initiator: {
        name: string;
        documentation: string;
    };
    /** */
    const Agents: {
        name: string;
        documentation: string;
        eduOnly: boolean;
    };
    /** */
    const AllAgents: {
        name: string;
        documentation: string;
        eduOnly: boolean;
    };
}
/** */
export declare const SelectorTypeMode: ModeCollection;
