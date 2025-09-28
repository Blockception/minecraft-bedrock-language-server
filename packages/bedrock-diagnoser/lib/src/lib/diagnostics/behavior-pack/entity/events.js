"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_entity_check_events = behaviorpack_entity_check_events;
exports.behaviorpack_entity_check_event = behaviorpack_entity_check_event;
const types_1 = require("../../../types");
const mcfunction_1 = require("../mcfunction");
const filters_1 = require("./components/filters");
const properties_1 = require("./properties");
function behaviorpack_entity_check_events(events, diagnoser, properties, component_groups) {
    if (Array.isArray(events)) {
        events.forEach((event) => behaviorpack_entity_check_event(event, "", diagnoser, properties, component_groups));
    }
    else {
        const eventIds = Object.keys(events);
        Object.entries(events).forEach(([key, event]) => behaviorpack_entity_check_event(event, key, diagnoser, properties, component_groups, eventIds));
    }
}
/**
 *
 * @param event
 * @param diagnoser
 * @param component_groups
 */
function behaviorpack_entity_check_event(event, event_id, diagnoser, properties, component_groups, eventIds) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    has_groups(diagnoser, event_id, typeof ((_a = event.add) === null || _a === void 0 ? void 0 : _a.component_groups) == "string" ? [(_b = event.add) === null || _b === void 0 ? void 0 : _b.component_groups] : (_c = event.add) === null || _c === void 0 ? void 0 : _c.component_groups, component_groups);
    has_groups(diagnoser, event_id, typeof ((_d = event.remove) === null || _d === void 0 ? void 0 : _d.component_groups) == "string"
        ? [(_e = event.remove) === null || _e === void 0 ? void 0 : _e.component_groups]
        : (_f = event.remove) === null || _f === void 0 ? void 0 : _f.component_groups, component_groups);
    (_g = event.randomize) === null || _g === void 0 ? void 0 : _g.forEach((item) => {
        behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
    });
    if (((_h = event.randomize) === null || _h === void 0 ? void 0 : _h.length) == 1)
        diagnoser.add(`events/${event_id}/randomize`, "'randomize' only has one entry and can therefore be removed.", types_1.DiagnosticSeverity.info, "behaviorpack.entity.event.randomize.length");
    (_j = event.sequence) === null || _j === void 0 ? void 0 : _j.forEach((item) => {
        behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
    });
    if (((_k = event.sequence) === null || _k === void 0 ? void 0 : _k.length) == 1) {
        diagnoser.add(`events/${event_id}/sequence`, "'sequence' only has one entry and can therefore be removed.", types_1.DiagnosticSeverity.info, "behaviorpack.entity.event.sequence.length");
    }
    (_l = event.first_valid) === null || _l === void 0 ? void 0 : _l.forEach((item) => {
        behaviorpack_entity_check_event(item, event_id, diagnoser, properties, component_groups, eventIds);
    });
    if (((_m = event.first_valid) === null || _m === void 0 ? void 0 : _m.length) == 1)
        diagnoser.add(event_id, "'first_valid' only has one entry and can therefore be removed.", types_1.DiagnosticSeverity.info, "behaviorpack.entity.event.first_valid.length");
    (0, filters_1.behaviorpack_entity_components_filters)(event, diagnoser);
    if (event.set_property) {
        for (const [key, value] of Object.entries(event.set_property)) {
            (0, properties_1.diagnose_entity_property_usage)(properties, key, value, "events", diagnoser);
        }
    }
    if (event["run_command"]) {
        diagnoser.add(`events/${event_id}`, `Event is using the deprecated run_command property, use queue_command instead`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.event.run_command");
    }
    if (event["set_home_position"] && !diagnoser.document.getText().includes("minecraft:home")) {
        diagnoser.add(`events/${event_id}`, `To use set_home_position, \`minecraft:home\` is required.`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.event.set_home_position");
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (event.trigger && !(eventIds === null || eventIds === void 0 ? void 0 : eventIds.includes(typeof event.trigger == "string" ? event.trigger : event.trigger.event)))
        diagnoser.add(`events/${event_id}/trigger`, `Event "${event.trigger}" being triggered not found`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.event.trigger");
    if (event.queue_command) {
        const c = event.queue_command.command;
        const command = typeof c === "string" ? [c] : c;
        command.forEach((cmd) => {
            if (cmd.startsWith("/")) {
                diagnoser.add(`events/${event_id}/cmd`, `Commands in queue_command should not start with a /, remove it`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.event.queue_command");
                cmd = cmd.slice(1);
            }
            (0, mcfunction_1.commandsCheck)(cmd, diagnoser);
        });
    }
}
function has_groups(diagnoser, id, groups, component_groups) {
    if (groups === undefined)
        return;
    component_groups = component_groups !== null && component_groups !== void 0 ? component_groups : {};
    for (let I = 0; I < groups.length; I++) {
        const group = groups[I];
        if (group in component_groups)
            continue;
        diagnoser.add(`events/${id}/${group}`, `Event is calling component group: ${group}, but the component group was not found`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.component_group.missing");
    }
}
//# sourceMappingURL=events.js.map