"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const util_1 = require("../../util");
const context_1 = require("../diagnostics/context");
const references_1 = require("./references");
const workspace_data_1 = require("./workspace-data");
class Database {
    name = 'database';
    logger;
    ProjectData;
    WorkspaceData;
    context;
    constructor(logger, documents) {
        this.logger = logger.withPrefix('[database]');
        this.context = new context_1.InternalContext(this.logger, documents, () => this.ProjectData);
        this.WorkspaceData = new workspace_data_1.WorkspaceData();
        this.ProjectData = new bc_minecraft_bedrock_project_1.ProjectData(this.context);
    }
    /**
     *
     */
    clear() {
        this.logger.info('clearing database');
        this.WorkspaceData.clear();
        this.ProjectData = new bc_minecraft_bedrock_project_1.ProjectData(this.context);
    }
    getPacks() {
        return [
            ...this.ProjectData.behaviorPacks.packs,
            ...this.ProjectData.resourcePacks.packs,
            ...this.ProjectData.worlds.packs,
        ];
    }
    /**
     *
     * @param id
     * @param callbackfn
     */
    async findReference(id, documents, options, token, workDoneProgress) {
        const builder = new references_1.ReferenceBuilder(documents, { defined: true, usage: false, ...(options || {}) }, token);
        await this.forEach((item) => builder.findReference(item, id), token, workDoneProgress);
        return util_1.References.convertLocation(builder.locations, documents);
    }
    /**
     *
     * @param id
     * @param callbackfn
     */
    async findReferences(id, types = undefined, token, workDoneProgress) {
        if (types)
            return this.internalTypeSearch(id, types, token, workDoneProgress);
        return this.internalSearchAll(id, token, workDoneProgress);
    }
    async internalSearchAll(id, token, workDoneProgress) {
        const result = [];
        await this.forEach((item) => {
            if (item.id === id)
                result.push(item);
        }, token, workDoneProgress);
        return result;
    }
    internalTypeSearch(id, types, token, workDoneProgress) {
        const out = [];
        const addIfIDMatch = (item) => {
            if (item.id === id)
                out.push(item);
        };
        for (let i = 0; i < types.length; i++) {
            const item = types[i];
            if (token?.isCancellationRequested)
                break;
            workDoneProgress?.report(i / types.length, `checking type: ${bc_minecraft_bedrock_command_1.ParameterType[item]}`);
            switch (item) {
                case bc_minecraft_bedrock_command_1.ParameterType.animation:
                    this.ProjectData.resourcePacks.entities.forEach((entity) => {
                        entity.animations.defined.forEach((anim) => {
                            if (anim === id)
                                out.push(entity);
                        });
                    });
                    this.ProjectData.resourcePacks.animations.forEach(addIfIDMatch);
                    this.ProjectData.resourcePacks.animationControllers.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.block:
                    this.ProjectData.behaviorPacks.blocks.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.entity:
                    this.ProjectData.behaviorPacks.entities.forEach(addIfIDMatch);
                    this.ProjectData.resourcePacks.entities.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.event:
                    this.ProjectData.behaviorPacks.entities.forEach((entity) => {
                        entity.events.defined.forEach((event) => {
                            if (event === id)
                                out.push(entity);
                        });
                    });
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.function:
                    this.ProjectData.behaviorPacks.functions.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.item:
                    this.ProjectData.behaviorPacks.items.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.objective:
                    this.ProjectData.general.objectives.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.particle:
                    this.ProjectData.resourcePacks.particles.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.sound:
                    this.ProjectData.resourcePacks.sounds.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.structure:
                    this.ProjectData.behaviorPacks.structures.forEach(addIfIDMatch);
                    this.ProjectData.general.structures.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.tag:
                    this.ProjectData.general.tags.forEach(addIfIDMatch);
                    break;
                case bc_minecraft_bedrock_command_1.ParameterType.tickingarea:
                    this.ProjectData.general.tickingAreas.forEach(addIfIDMatch);
                    break;
            }
        }
        return out;
    }
    forEach(callbackfn, token, workDoneProgress) {
        const packs = [
            [this.ProjectData.general],
            this.ProjectData.behaviorPacks.packs,
            this.ProjectData.resourcePacks.packs,
            this.ProjectData.worlds.packs,
        ];
        return util_1.Processor.forEach(packs, (pack_col) => util_1.Processor.forEach(pack_col, (pack) => pack.forEach(callbackfn), token), token, workDoneProgress);
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map