using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class Biome : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("tags")]
    public List<String> Tags { get; set; }
}
