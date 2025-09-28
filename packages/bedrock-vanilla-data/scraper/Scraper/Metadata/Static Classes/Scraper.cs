using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.Metadata;

///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Sources"></param>
    /// <param name="Receiver"></param>
    public static void Scrape(List<String> Sources, BP.Container bpcontainer, General general) {
        foreach (String Source in Sources) {
            Scrape(Source, bpcontainer, general);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Source"></param>
    /// <param name="container"></param>
    public static void Scrape(String Source, BP.Container bpcontainer, General general) {
        Console.WriteLine("Scraping Metadata: " + Source);
        String vanillaModules = Path.Join(Source, "vanilladata_modules");

        Scraper.Biomes.FromFile(general.Biomes, Path.Join(vanillaModules, "mojang-biomes.json"));
        Scraper.Blocks.FromFile(bpcontainer.Blocks, Path.Join(vanillaModules, "mojang-blocks.json"));
        Scraper.CameraPresets.FromFile(general.CameraPresets, Path.Join(vanillaModules, "mojang-camera-presets.json"));
        Scraper.CooldownCategory.FromFile(general.CooldownCategory, Path.Join(vanillaModules, "mojang-cooldown-category.json"));
        Scraper.Dimensions.FromFile(general.Dimensions, Path.Join(vanillaModules, "mojang-dimensions.json"));
        Scraper.Effects.FromFile(general.Effects, Path.Join(vanillaModules, "mojang-effects.json"));
        Scraper.Enchantments.FromFile(general.Enchantments, Path.Join(vanillaModules, "mojang-enchantments.json"));
        Scraper.Entities.FromFile(bpcontainer.Entities, Path.Join(vanillaModules, "mojang-entities.json"));
        Scraper.Features.FromFile(bpcontainer.Features, Path.Join(vanillaModules, "mojang-features.json"));
        Scraper.Items.FromFile(bpcontainer.Items, Path.Join(vanillaModules, "mojang-items.json"));
        Scraper.PotionEffects.FromFile(general.PotionEffects, Path.Join(vanillaModules, "mojang-potion-effects.json"));
        Scraper.PotionModifiers.FromFile(general.PotionModifiers, Path.Join(vanillaModules, "mojang-potion-modifiers.json"));
        Scraper.PotionTypes.FromFile(general.PotionTypes, Path.Join(vanillaModules, "mojang-potion-types.json"));
    }
}
