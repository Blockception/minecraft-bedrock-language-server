using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.Metadata;

public partial class VanillaModule<T> {
    [JsonPropertyName("name")]
    public String Name { get; set; }

    [JsonPropertyName("module_type")]
    public String ModuleType { get; set; }

    [JsonPropertyName("minecraft_version")]
    public String MinecraftVersion { get; set; }

    [JsonPropertyName("vanilla_data_type")]
    public String DataType { get; set; }

    [JsonPropertyName("data_items")]
    public List<T> DataItems { get; set; }
}
