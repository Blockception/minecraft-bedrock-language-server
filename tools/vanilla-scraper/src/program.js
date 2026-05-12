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
const utility_1 = require("./static/utility");
const vanilla_1 = require("./static/vanilla");
const output_1 = require("./classes/output");
const format_versions_1 = require("./classes/format-versions");
const BPScraper = __importStar(require("./bp/scraper"));
const RPScraper = __importStar(require("./rp/scraper"));
const MetadataScraper = __importStar(require("./metadata/scraper"));
async function main() {
    const context = await (0, utility_1.getFolders)();
    const startTime = performance.now();
    // Load the base set
    const out = output_1.Output.load(utility_1.baseFolder);
    // Scrape data sets
    MetadataScraper.scrape(context.metadataFolder, out.vanilla.behaviorPack, out.general);
    BPScraper.scrape(context.eduBP, out.edu.behaviorPack);
    BPScraper.scrape(context.vanillaBP, out.vanilla.behaviorPack);
    RPScraper.scrape(context.eduRP, out.edu.resourcePack);
    RPScraper.scrape(context.vanillaRP, out.vanilla.resourcePack);
    // Process collected data into general data for quick lookup of things like entities families and events
    out.general.scrapeFromOutput(out);
    // TODO prune education from vanilla
    out.clean();
    out.prune();
    // Save
    out.save(utility_1.outputFolder);
    (0, vanilla_1.githubLinks)(context.githubFolder, utility_1.outputFolder);
    (0, format_versions_1.getVersions)(context, utility_1.outputFolder);
    const endTime = performance.now();
    console.log(`ms: ${Math.round(endTime - startTime)}`);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=program.js.map