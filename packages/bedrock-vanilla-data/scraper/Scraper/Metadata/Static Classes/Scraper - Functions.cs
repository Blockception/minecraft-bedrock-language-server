using System;

namespace Scraper.Metadata;

///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    public static readonly ConvertFile<BP.Block> Blocks = VanillaModule<Block>.Convert(Block.Convert);
    public static readonly ConvertFile<BP.Entity> Entities = VanillaModule<NamedObject>.Convert(NamedObject.ConvertEntity);
    public static readonly ConvertFile<String> Biomes = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> CameraPresets = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> CooldownCategory = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> Dimensions = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> Effects = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<BP.Item> Items = VanillaModule<Item>.Convert(Item.Convert);
    public static readonly ConvertFile<String> Enchantments = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> Features = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> PotionEffects = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> PotionModifiers = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
    public static readonly ConvertFile<String> PotionTypes = VanillaModule<NamedObject>.Convert(NamedObject.Convert);
}
