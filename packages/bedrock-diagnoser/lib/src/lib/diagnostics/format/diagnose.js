"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format_diagnose_path = format_diagnose_path;
const types_1 = require("../../types");
/**Max relative length form pack / worldtemplate */
const LengthFromRoot = 80;
const SegmentLength = 59;
const PackNameLength = 10;
function format_diagnose_path(pack, uri, diagnoser) {
    const root = pack.folder;
    const index = uri.indexOf(root);
    let length = root.length;
    const c = uri.charAt(index + length);
    if (c === "/" || c === "\\")
        length++;
    const relpath = uri.slice(index + length);
    if (relpath.startsWith("volumes/"))
        diagnoser.add(0, `Volume files have been removed`, types_1.DiagnosticSeverity.error, "behaviorpack.volumes.deprecated");
    if (relpath.length > LengthFromRoot) {
        diagnoser.add(0, `Path is too long: '${relpath}', should be maximum of: ${LengthFromRoot} but is: ${relpath.length} characters long`, types_1.DiagnosticSeverity.error, "minecraft.format.path.length");
    }
    //Check each segment of the path
    relpath.split(/[\\/]/gim).forEach((seg) => {
        if (seg.length > SegmentLength) {
            diagnoser.add(0, `Segment of path is too long: '${seg}' in ${relpath}, should be maximum of: ${SegmentLength} but is: ${seg.length} characters long`, types_1.DiagnosticSeverity.error, "minecraft.format.path.length");
        }
    });
    //TODO folder name check
}
//# sourceMappingURL=diagnose.js.map