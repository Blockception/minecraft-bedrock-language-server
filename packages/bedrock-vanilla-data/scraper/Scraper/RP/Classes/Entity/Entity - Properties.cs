using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class Entity : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("animations")]
    public List<String> Animations { get; set; }
}
