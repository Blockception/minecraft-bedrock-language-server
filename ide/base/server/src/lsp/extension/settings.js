"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
/**
 *
 */
var Settings;
(function (Settings) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (!value) {
            return false;
        }
        const temp = value;
        if (temp.Education && temp.Diagnostics && temp.Plugin) {
            if (typeof temp.Education.Enable !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Enable !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Lang !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Json !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Mcfunctions !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Objectives !== 'boolean')
                return false;
            if (typeof temp.Diagnostics.Tags !== 'boolean')
                return false;
            if (typeof temp.Plugin.CodeLens !== 'boolean')
                return false;
            if (typeof temp.Completion.JSON !== 'boolean')
                return false;
            if (typeof temp.Completion.Lang.Comments !== 'boolean')
                return false;
            if (typeof temp.Completion.Lang.Dynamic !== 'boolean')
                return false;
            return true;
        }
        return false;
    }
    Settings.is = is;
    /**
     *
     * @param value
     * @returns
     */
    function clone(value) {
        return Object.assign({}, value);
    }
    Settings.clone = clone;
    /**
     *
     * @returns
     */
    function createDefaultSettings() {
        const Out = {
            Education: {
                Enable: true,
            },
            Diagnostics: {
                Enable: true,
                Lang: true,
                Json: true,
                Mcfunctions: true,
                Objectives: true,
                Tags: true,
            },
            Plugin: {
                CodeLens: true,
            },
            Completion: {
                JSON: true,
                Lang: {
                    Comments: true,
                    Dynamic: true,
                },
            },
        };
        return Out;
    }
    Settings.createDefaultSettings = createDefaultSettings;
})(Settings || (exports.Settings = Settings = {}));
//# sourceMappingURL=settings.js.map