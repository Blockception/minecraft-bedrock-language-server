using System;
using System.Text.Json.Serialization;

namespace Scraper.Metadata;
public partial class BlockProperty {
    [JsonPropertyName("name")]
    public String Name { get; set; }
}
