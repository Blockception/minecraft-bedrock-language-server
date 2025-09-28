"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_filter_property = diagnose_filter_property;
const types_1 = require("../../../../types");
const properties_1 = require("../../../behavior-pack/entity/properties");
function diagnose_filter_property(filter, diagnoser) {
    const { domain, value, test } = filter;
    if (!domain)
        return;
    const entities = diagnoser.context.getProjectData().projectData.behaviorPacks.entities;
    let diagnosed = false;
    entities.forEach((entity) => {
        if (entity.properties) {
            const property = entity.properties.find((property) => property.name === domain);
            if (property) {
                if (test.replace("_property", "") != property.type)
                    diagnoser.add("filters/" + property.name, `Property type ${property.type} does not match filter ${filter.test}`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.property.filter_mismatch");
                (0, properties_1.diagnose_entity_property_usage)([property], domain, value, "filter", diagnoser);
                diagnosed = true;
            }
        }
    });
    // If no definition for it is found in any entity
    if (!diagnosed)
        diagnoser.add(`$filters/${domain}`, `Entity property definition for "${domain}" not found`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.property.unknown_property");
}
//# sourceMappingURL=property.js.map