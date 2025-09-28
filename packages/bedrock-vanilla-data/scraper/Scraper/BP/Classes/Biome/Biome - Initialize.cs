using System;

namespace Scraper.BP;
/// <summary>The class that represent the biome data in behaviourpacks</summary>
public partial class Biome {
    /// <summary>Creates a new instance of <see cref="Biome"/></summary>
    public Biome() {
        this.ID = String.Empty;
        this.Tags = [];
    }
}
