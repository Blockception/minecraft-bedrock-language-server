using System;

namespace Scraper.Metadata;

public partial class VanillaModule<T> {
    public VanillaModule() {
        this.Name = String.Empty;
        this.ModuleType = String.Empty;
        this.MinecraftVersion = String.Empty;
        this.DataType = String.Empty;
        this.DataItems = [];
    }
}
