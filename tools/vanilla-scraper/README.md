# Vanilla Scraper

TypeScript tool to scrape vanilla data from Minecraft Bedrock packs.

This is a TypeScript port of the C# scraper located at `packages/bedrock-vanilla-data/scraper`.

## Usage

```bash
npm run scrape
```

## Description

This tool:
1. Downloads the Bedrock Samples from GitHub
2. Optionally reads from local Minecraft installations (Windows only)
3. Scrapes behavior pack and resource pack data
4. Processes metadata from the samples
5. Outputs TypeScript files with the scraped data

## Output

The scraped data is saved to the `src/Lib` folder in the `bedrock-vanilla-data` package.
