using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.RP;
///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Sources"></param>
    /// <param name="Receiver"></param>
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
        Console.WriteLine("Scraping RP: " + Source);

        Scraper.AnimationControllers.FromFolder(container.AnimationControllers, Path.Join(Source, "animation_controllers"));
        Scraper.Animations.FromFolder(container.Animations, Path.Join(Source, "animations"));
        Scraper.Entities.FromFolder(container.Entities, Path.Join(Source, "entity"));
        Scraper.Fogs.FromFolder(container.Fogs, Path.Join(Source, "fogs"));
        Scraper.Models.FromFolder(container.Models, Path.Join(Source, "models"));
        Scraper.Particles.FromFolder(container.Particles, Path.Join(Source, "particles"));
        Scraper.RenderControllers.FromFolder(container.RenderControllers, Path.Join(Source, "render_controllers"));

        Scraper.Materials(Source, container.Materials);
        Scraper.Sounds(Source, container.Sounds, container.SoundFiles);
        Scraper.Textures(Source, container.Textures);

        Scraper.TextureItems(Path.Join(Source, "textures", "item_texture.json"), container.TextureItems);
        Scraper.TextureTerrain(Path.Join(Source, "textures", "terrain_texture.json"), container.TextureTerrain);
    }
}
