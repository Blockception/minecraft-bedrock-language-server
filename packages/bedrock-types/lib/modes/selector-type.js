"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorTypeMode = exports.InternalSelectorTypeMode = void 0;
/**The namespace that delivers hard references*/
var InternalSelectorTypeMode;
(function (InternalSelectorTypeMode) {
    /** */
    InternalSelectorTypeMode.AllPlayers = { name: "@a", documentation: "Targets all players" };
    /** */
    InternalSelectorTypeMode.AllEntities = { name: "@e", documentation: "Targets all entities" };
    /** */
    InternalSelectorTypeMode.Random = { name: "@r", documentation: "Targets random players, or if specified, random types" };
    /** */
    InternalSelectorTypeMode.Nearest = { name: "@p", documentation: "Targets the nearest player" };
    /** */
    InternalSelectorTypeMode.NearestEntity = { name: "@n", documentation: "Targets the single closest entity" };
    /** */
    InternalSelectorTypeMode.Self = { name: "@s", documentation: "Targets the executing entity" };
    /** */
    InternalSelectorTypeMode.Initiator = { name: "@initiator", documentation: "Target the initiating entity" };
    /** */
    InternalSelectorTypeMode.Agents = { name: "@c", documentation: "Targets the executing players agent", eduOnly: true };
    /** */
    InternalSelectorTypeMode.AllAgents = { name: "@v", documentation: "Targets all agents", eduOnly: true };
})(InternalSelectorTypeMode || (exports.InternalSelectorTypeMode = InternalSelectorTypeMode = {}));
/** */
exports.SelectorTypeMode = {
    name: "Selector Type",
    modes: [
        InternalSelectorTypeMode.Agents,
        InternalSelectorTypeMode.AllAgents,
        InternalSelectorTypeMode.AllEntities,
        InternalSelectorTypeMode.AllPlayers,
        InternalSelectorTypeMode.Initiator,
        InternalSelectorTypeMode.NearestEntity,
        InternalSelectorTypeMode.Nearest,
        InternalSelectorTypeMode.Random,
        InternalSelectorTypeMode.Self,
    ],
};
//# sourceMappingURL=selector-type.js.map