namespace Scraper.BP;
///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertJson<Block> Block = BP.Block.Convert;

    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertJson<Biome> Biome = BP.Biome.Convert;

    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertJson<Entity> Entity = BP.Entity.Convert;

    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertJson<Item> Item = BP.Item.Convert;

    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertFile<LootTable> LootTable = BP.LootTable.Convert;

    /// <summary>
    /// 
    /// </summary>
    public static readonly ConvertFile<Trading> Trading = BP.Trading.Convert;
}
