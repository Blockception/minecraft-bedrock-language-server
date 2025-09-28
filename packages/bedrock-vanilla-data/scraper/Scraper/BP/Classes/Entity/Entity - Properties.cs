using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class Entity : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("events")]
    public List<String> Events { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("families")]
    public List<String> Families { get; set; }
}
