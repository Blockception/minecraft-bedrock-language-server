using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class AnimationController : IIdentifier {
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
