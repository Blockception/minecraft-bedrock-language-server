import { getFolders, outputFolder, baseFolder } from './static/utility';
import { githubLinks } from './static/vanilla';
import { Output } from './classes/output';
import { getVersions } from './classes/format-versions';
import * as BPScraper from './bp/scraper';
import * as RPScraper from './rp/scraper';
import * as MetadataScraper from './metadata/scraper';

async function main(): Promise<void> {
  const context = await getFolders();

  const startTime = performance.now();

  // Load the base set
  const out = Output.load(baseFolder);

  // Scrape data sets
  // MetadataScraper.scrape(context.metadataFolder, out.vanilla.behaviorPack, out.general);

  // BPScraper.scrape(context.eduBP, out.edu.behaviorPack);
  // BPScraper.scrape(context.vanillaBP, out.vanilla.behaviorPack);

  RPScraper.scrape(context.eduRP, out.edu.resourcePack);
  RPScraper.scrape(context.vanillaRP, out.vanilla.resourcePack);

  // Process collected data into general data for quick lookup of things like entities families and events
  out.general.scrapeFromOutput(out);

  // TODO prune education from vanilla
  out.clean();
  out.prune();

  // Save
  out.save(outputFolder);

  githubLinks(context.githubFolder, outputFolder);
  getVersions(context, outputFolder);

  const endTime = performance.now();

  console.log(`ms: ${Math.round(endTime - startTime)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
