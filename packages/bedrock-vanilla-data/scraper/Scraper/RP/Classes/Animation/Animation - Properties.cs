using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class Animation : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("bones")]
    public List<String> Bones { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("particles")]
    public List<String> Particles { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("sounds")]
    public List<String> Sounds { get; set; }
}
