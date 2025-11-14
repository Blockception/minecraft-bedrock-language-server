import * as path from 'path';
import * as fs from 'fs';
import { getFolders } from './context.js';
import { findFolder } from './utils.js';
import { scrapeMetadata } from './metadata-scraper.js';
import { scrapeBehaviorPack } from './bp-scraper.js';
import { scrapeResourcePack } from './rp-scraper.js';
import { createOutput, cleanOutput, saveOutput } from './output.js';
import { generateGithubLinks } from './github-links.js';
import { getFormatVersions } from './format-versions.js';

async function main() {
  const startTime = Date.now();

  // Setup folders
  const currentDir = process.cwd();
  const workFolder = path.join(currentDir, 'work');
  
  // Find the source folder by traversing up
  const sourceFolder = findFolder(workFolder, 'src');
  const outputFolder = path.join(sourceFolder, 'lib');

  // Create directories
  fs.mkdirSync(workFolder, { recursive: true });
  fs.mkdirSync(outputFolder, { recursive: true });

  console.log('Getting folders...');
  const context = await getFolders(workFolder);

  console.log('Creating output structure...');
  const output = createOutput();

  // Scrape metadata
  console.log('Scraping metadata...');
  scrapeMetadata(context.metadataFolder, output.vanilla.behaviorPack, output.general);

  // Scrape behavior packs
  console.log('Scraping behavior packs...');
  scrapeBehaviorPack(context.eduBP, output.edu.behaviorPack);
  scrapeBehaviorPack(context.vanillaBP, output.vanilla.behaviorPack);

  // Scrape resource packs
  console.log('Scraping resource packs...');
  scrapeResourcePack(context.eduRP, output.edu.resourcePack);
  scrapeResourcePack(context.vanillaRP, output.vanilla.resourcePack);

  // TODO: Process general data (entities families, events, etc.)
  // This would be implemented similar to Out.General.Scrape(Out) in C#

  // Clean and prune data
  console.log('Cleaning data...');
  cleanOutput(output);

  // Save output
  console.log('Saving output...');
  saveOutput(output, outputFolder);

  // Generate GitHub links
  console.log('Generating GitHub links...');
  generateGithubLinks(context, outputFolder);

  // Get format versions
  console.log('Getting format versions...');
  getFormatVersions(context, outputFolder);

  const endTime = Date.now();
  const elapsed = endTime - startTime;

  console.log(`\nCompleted in ${elapsed}ms`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
