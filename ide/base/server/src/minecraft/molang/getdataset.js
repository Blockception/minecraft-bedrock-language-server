"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataSet = GetDataSet;
exports.GetRPDataSet = GetRPDataSet;
exports.GetBPDataSet = GetBPDataSet;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
/** */
function GetDataSet(uri, packType = undefined) {
    let out = undefined;
    if (packType === undefined || packType === bc_minecraft_bedrock_project_1.PackType.resource_pack) {
        if ((out = GetRPDataSet(uri)))
            return out;
    }
    if (packType === undefined || packType === bc_minecraft_bedrock_project_1.PackType.behavior_pack) {
        if ((out = GetBPDataSet(uri)))
            return out;
    }
    return out;
}
function GetRPDataSet(uri) {
    const RpType = bc_minecraft_bedrock_project_1.ResourcePack.FileType.detect(uri);
    switch (RpType) {
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation:
            return bc_minecraft_molang_1.MolangData.Animations;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.animation_controller:
            return bc_minecraft_molang_1.MolangData.AnimationsControllers;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.attachable:
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.item:
            return bc_minecraft_molang_1.MolangData.Items;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.block:
            return bc_minecraft_molang_1.MolangData.Blocks;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.entity:
            return bc_minecraft_molang_1.MolangData.Entities;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.render_controller:
            return bc_minecraft_molang_1.MolangData.RenderControllers;
        case bc_minecraft_bedrock_project_1.ResourcePack.FileType.particle:
            return bc_minecraft_molang_1.MolangData.Particles;
    }
    return undefined;
}
function GetBPDataSet(uri) {
    const BpType = bc_minecraft_bedrock_project_1.BehaviorPack.FileType.detect(uri);
    switch (BpType) {
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.block:
            return bc_minecraft_molang_1.MolangData.Blocks;
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.animation:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.animation_controller:
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.entity:
            return bc_minecraft_molang_1.MolangData.Entities;
        case bc_minecraft_bedrock_project_1.BehaviorPack.FileType.item:
            return bc_minecraft_molang_1.MolangData.Items;
            //TODO Detect type for featureRules
            return bc_minecraft_molang_1.MolangData.FeaturesRules;
    }
    return undefined;
}
//# sourceMappingURL=getdataset.js.map