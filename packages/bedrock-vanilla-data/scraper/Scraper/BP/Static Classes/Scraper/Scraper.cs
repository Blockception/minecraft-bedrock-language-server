using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.BP;
///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Sources"></param>
    /// <param name="Destination"></param>
    public static void Scrape(List<String> Sources, Container container) {
        foreach (String Source in Sources) {
            Scrape(Source, container);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Source"></param>
    /// <param name="container"></param>
    public static void Scrape(String Source, Container container) {
        Console.WriteLine("Scraping BP: " + Source);

        Scraper.Block.FromFolder(container.Blocks, Path.Join(Source, "blocks"));
        Scraper.Biome.FromFolder(container.Biomes, Path.Join(Source, "biomes"));
        Scraper.Entity.FromFolder(container.Entities, Path.Join(Source, "entities"));
        Scraper.Item.FromFolder(container.Items, Path.Join(Source, "items"));
        Scraper.LootTable.FromFolder(container.LootTables, Path.Join(Source, "loot_tables"));
        Scraper.Trading.FromFolder(container.Trading, Path.Join(Source, "trading"));
    }
}
