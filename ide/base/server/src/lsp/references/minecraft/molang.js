"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideReferences = provideReferences;
const molang_1 = require("../../../minecraft/molang");
const util_1 = require("../../../util");
async function provideReferences(context, text) {
    const { database } = context;
    const index = text.text.indexOf('.');
    if (index < 0)
        return undefined;
    const type = text.text.slice(0, index);
    const value = text.text.slice(index + 1);
    switch (type.toLowerCase()) {
        // case "context":
        // case "c":
        //   break;
        case 'geometry':
            return database.findReference(text.text, context.documents, { defined: true, usage: false }, context.token);
        // case "math":
        //   break;
        // case "query":
        // case "q":
        //   break;
        // case "texture":
        //   break;
        case 'temp':
        case 't':
            return GetTemp(context, value);
        case 'variable':
        case 'v':
            return GetVariables(context, value);
    }
    return undefined;
}
function GetVariables(context, variable) {
    const { database, documents } = context;
    const locations = [];
    const map = (item) => {
        if ((0, molang_1.isDefined)(item.molang, variable))
            locations.push(item);
    };
    database.ProjectData.behaviorPacks.animationControllers.forEach(map);
    database.ProjectData.behaviorPacks.animations.forEach(map);
    database.ProjectData.behaviorPacks.entities.forEach(map);
    database.ProjectData.resourcePacks.animationControllers.forEach(map);
    database.ProjectData.resourcePacks.animations.forEach(map);
    database.ProjectData.resourcePacks.entities.forEach(map);
    database.ProjectData.resourcePacks.renderControllers.forEach(map);
    //Database.ProjectData.ResourcePacks.particles.forEach(map);
    return util_1.References.convertLocation(locations, documents);
}
function GetTemp(context, variable) {
    const { database, documents } = context;
    const locations = [];
    const map = (item) => {
        if ((0, molang_1.isDefined)(item.molang, variable))
            locations.push(item);
    };
    database.ProjectData.behaviorPacks.animationControllers.forEach(map);
    database.ProjectData.behaviorPacks.animations.forEach(map);
    database.ProjectData.behaviorPacks.entities.forEach(map);
    database.ProjectData.resourcePacks.animationControllers.forEach(map);
    database.ProjectData.resourcePacks.animations.forEach(map);
    database.ProjectData.resourcePacks.entities.forEach(map);
    database.ProjectData.resourcePacks.renderControllers.forEach(map);
    //Database.ProjectData.ResourcePacks.particles.forEach(map);
    return util_1.References.convertLocation(locations, documents);
}
//# sourceMappingURL=molang.js.map