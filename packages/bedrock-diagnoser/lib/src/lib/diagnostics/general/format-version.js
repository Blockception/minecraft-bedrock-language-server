"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_format_version = diagnose_format_version;
exports.diagnoseFormatVersion = diagnoseFormatVersion;
exports.has_minimum_version = has_minimum_version;
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const Lib_1 = require("bc-minecraft-bedrock-vanilla-data/lib/src/Lib");
const types_1 = require("../../types");
var FormatVersionContainer;
(function (FormatVersionContainer) {
    function is(value) {
        if (value && typeof value === "object") {
            if (typeof value.format_version === "string")
                return true;
        }
        return false;
    }
    FormatVersionContainer.is = is;
})(FormatVersionContainer || (FormatVersionContainer = {}));
const latestVersion = minecraft_1.FormatVersion.parse(Lib_1.Versions.latest);
function diagnose_format_version(data, diagnoser) {
    if (FormatVersionContainer.is(data))
        diagnoseFormatVersion(data, diagnoser);
}
function diagnoseFormatVersion(data, diagnoser) {
    var _a;
    const location = `format.version/${(_a = data.format_version) !== null && _a !== void 0 ? _a : ""}`;
    if (typeof data.format_version !== "string") {
        return diagnoser.add("Format version is not a string", location, types_1.DiagnosticSeverity.error, "minecraft.format_version");
    }
    let v;
    try {
        v = minecraft_1.FormatVersion.parse(data.format_version);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        return diagnoser.add("Format version is not a valid number", location, types_1.DiagnosticSeverity.error, "minecraft.format_version");
    }
    // If version is less then latest recommend upgrade
    for (let I = 0; I < 3; I++) {
        if (latestVersion[I] > v[I]) {
            return diagnoser.add(`Format version is out of date, please upgrade to ${Lib_1.Versions.latest}`, location, types_1.DiagnosticSeverity.warning, "minecraft.format_version");
        }
    }
}
function has_minimum_version(version, minimum) {
    return minecraft_1.FormatVersion.isGreaterOrEqualThan(version, minimum);
}
//# sourceMappingURL=format-version.js.map