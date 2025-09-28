using System;
using System.Collections.Generic;

namespace Scraper.BP;

public partial class Container {
    public List<Block> Blocks { get; set; }
    public List<Biome> Biomes { get; set; }
    public List<String> Features { get; set; }
    public List<Entity> Entities { get; set; }
    public List<Item> Items { get; set; }
    public List<LootTable> LootTables { get; set; }
    public List<Trading> Trading { get; set; }
}
