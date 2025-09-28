"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manifest = exports.ManifestModule = void 0;
const pack_type_1 = require("../../project/pack-type");
const json_1 = require("../json");
/** */
var ManifestModule;
(function (ManifestModule) {
    /** */
    ManifestModule.TypeResource = "resources";
    /** */
    ManifestModule.TypeData = "data";
    /** */
    ManifestModule.TypeWorld = "world_template";
    /** */
    ManifestModule.TypeSkinPack = "skin_pack";
})(ManifestModule || (exports.ManifestModule = ManifestModule = {}));
/** */
var Manifest;
(function (Manifest) {
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.format_version !== "number")
                return false;
            if (typeof value.header !== "object")
                return false;
            return true;
        }
        return false;
    }
    Manifest.is = is;
    /**
     *
     * @param m
     * @returns
     */
    function isWorldManifest(m) {
        const modules = m.modules;
        if (modules === undefined)
            return false;
        for (let index = 0; index < modules.length; index++) {
            const mod = modules[index];
            if (mod.type === ManifestModule.TypeWorld)
                return true;
        }
        return false;
    }
    Manifest.isWorldManifest = isWorldManifest;
    /**
     *
     * @param m
     * @returns
     */
    function isResourceManifest(m) {
        const modules = m.modules;
        if (modules === undefined)
            return false;
        for (let index = 0; index < modules.length; index++) {
            const mod = modules[index];
            if (mod.type === ManifestModule.TypeResource)
                return true;
        }
        return false;
    }
    Manifest.isResourceManifest = isResourceManifest;
    /**
     *
     * @param m
     * @returns
     */
    function isBehaviorManifest(m) {
        const modules = m.modules;
        if (modules === undefined)
            return false;
        for (let index = 0; index < modules.length; index++) {
            const mod = modules[index];
            if (mod.type === ManifestModule.TypeData)
                return true;
        }
        return false;
    }
    Manifest.isBehaviorManifest = isBehaviorManifest;
    /**
     *
     * @param m
     * @returns
     */
    function isSkinpackManifest(m) {
        const modules = m.modules;
        if (modules === undefined)
            return false;
        for (let index = 0; index < modules.length; index++) {
            const mod = modules[index];
            if (mod.type === ManifestModule.TypeSkinPack)
                return true;
        }
        return false;
    }
    Manifest.isSkinpackManifest = isSkinpackManifest;
    /**
     *
     * @param m
     * @returns
     */
    function detectType(m) {
        if (!m.modules)
            return pack_type_1.PackType.unknown;
        for (let I = 0; I < m.modules.length; I++) {
            const mod = m.modules[I];
            switch (mod.type) {
                case ManifestModule.TypeData:
                    return pack_type_1.PackType.behavior_pack;
                case ManifestModule.TypeResource:
                    return pack_type_1.PackType.resource_pack;
                case ManifestModule.TypeWorld:
                    return pack_type_1.PackType.world;
                case ManifestModule.TypeSkinPack:
                    return pack_type_1.PackType.skin_pack;
            }
        }
        return pack_type_1.PackType.unknown;
    }
    Manifest.detectType = detectType;
    /**
     *
     * @param uri
     * @returns
     */
    function getManifest(uri, getDocument) {
        const doc = getDocument(uri);
        if (doc)
            return json_1.Json.To(doc);
        return undefined;
    }
    Manifest.getManifest = getManifest;
    function detectTypeUri(manifestUri, manifest) {
        const type = pack_type_1.PackType.detect(manifestUri);
        switch (type) {
            case pack_type_1.PackType.behavior_pack:
            case pack_type_1.PackType.resource_pack:
            case pack_type_1.PackType.skin_pack:
            case pack_type_1.PackType.world:
                return type;
            case pack_type_1.PackType.unknown:
            default:
                const SubType = Manifest.detectType(manifest);
                return SubType;
        }
        return pack_type_1.PackType.unknown;
    }
    Manifest.detectTypeUri = detectTypeUri;
})(Manifest || (exports.Manifest = Manifest = {}));
//# sourceMappingURL=manifest.js.map