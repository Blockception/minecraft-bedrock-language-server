"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const constants_1 = require("../../../../constants");
const general_1 = require("../../general");
const attribute_values_1 = require("./attribute-values");
const attributes_1 = require("./attributes");
const Float = __importStar(require("../../general/float"));
const Integer = __importStar(require("../../general/integer"));
function propertyDoc(name, type, def, entityId) {
    return `property: ${name} of type ${type}.<br/>defaults: ${def}.<br/>defined by ${entityId}.`;
}
function provideCompletion(context, selector, pos) {
    const builder = context.builder;
    if ((0, attribute_values_1.IsEditingValue)(selector, pos)) {
        const propertyName = (0, attributes_1.GetCurrentAttribute)(selector, pos);
        // Special case: `property=<property_id>` checks if the entity has a property at all.
        // The value should be a property identifier.
        if (propertyName === 'property') {
            context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
                entity.properties.forEach((property) => {
                    const msg = propertyDoc(property.name, property.type, property.default, entity.id);
                    builder.add({ label: property.name, documentation: msg, kind: constants_1.Kinds.Completion.Property });
                });
            });
            return;
        }
        context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
            entity.properties.forEach((property) => {
                if (property.name !== propertyName)
                    return;
                const ncontext = {
                    ...context,
                    builder: builder.withEvents((item) => {
                        const msg = propertyDoc(property.name, property.type, property.default, entity.id);
                        if (typeof item.documentation === 'string' || item.documentation === undefined) {
                            item.documentation = {
                                kind: 'markdown',
                                value: `${item.documentation}\n${msg}`.trim(),
                            };
                        }
                        else {
                            item.documentation.value = `${item.documentation.value}\n${msg}`.trim();
                        }
                    }),
                };
                switch (property.type) {
                    case 'bool':
                        general_1.Boolean.provideCompletion(ncontext);
                        break;
                    case 'int':
                        Integer.provideCreateCompletion(ncontext.builder, property.range[0], property.range[1]);
                        break;
                    case 'float':
                        Float.provideCreateCompletion(ncontext.builder, property.range[0], property.range[1]);
                        break;
                    case 'enum':
                        property.values.forEach((item) => ncontext.builder.add({ label: item, kind: constants_1.Kinds.Completion.Property }));
                        break;
                }
            });
        });
    }
    else {
        // Editing a key — suggest the special `property` key and all entity property names.
        builder.add({
            label: 'property',
            documentation: 'Checks if the entity has the specified property (equivalent to q.has_property)',
            kind: constants_1.Kinds.Completion.Property,
        });
        context.database.ProjectData.behaviorPacks.entities.forEach((entity) => {
            entity.properties.forEach((property) => {
                const msg = propertyDoc(property.name, property.type, property.default, entity.id);
                builder.add({ label: property.name, documentation: msg, kind: constants_1.Kinds.Completion.Property });
            });
        });
    }
}
//# sourceMappingURL=has-property.js.map